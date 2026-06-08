import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { defineMarkdownTransformer, defineTransformersSetup } from '@slidev/types'

function resolveIncludePath(currentFile: string, filePath: string) {
	if (filePath.startsWith("@/")) {
		return resolve(process.cwd(), filePath.slice(2));
	}

	return resolve(dirname(currentFile), filePath);
}

function selectLines(content: string, fromRaw?: string, toRaw?: string) {
	const lines = content.split(/\r?\n/);

	const fromLine = fromRaw ? Number(fromRaw) : 1;
	const toLine = toRaw ? Number(toRaw) : lines.length;

	return lines.slice(fromLine - 1, toLine).join("\n");
}

export default defineTransformersSetup(() => ({
	pre: [
		defineMarkdownTransformer((ctx) => {
            ctx.s.replace(
                /<!--\s*@include:\s*(.+?)(?:\{(\d*)\s*(?:-|,)\s*(\d*)\})?\s*-->/g,
                (_fullMatch, filePath: string, fromRaw?: string, toRaw?: string) => {
                    const resolvedPath = resolveIncludePath(ctx.slide.source.filepath, filePath.trim());
                    const fileContent = readFileSync(resolvedPath, "utf8");
                    const selectedContent = selectLines(fileContent, fromRaw, toRaw);

                    return selectedContent;
                },
            );
        }),
	],
}));