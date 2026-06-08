const firstname: string = "Mathieu";
const age: number = 23;
const quantity: bigint = 100n;
const isTeacher: boolean = true;
const uniqueId: symbol = Symbol("id");
const empty: undefined = undefined;
const nil: null = null;
const anything: any = "n'importe quelle valeur";
const unknownValue: unknown = "valeur a verifier avant utilisation";
const noValue: void = undefined;
function fail(message: string): never {
	throw new Error(message);
}
const user: object = {
	firstname: "Mathieu",
	age: 23,
};
const notes: number[] = [12, 15, 18];
const tags: Array<string> = ["type", "typescript"];
const position: [number, number] = [10, 20];
const greet: (name: string) => string = (name) => `Bonjour ${name}`;
const status: "draft" | "published" = "draft";
const identifier: string | number = "user-1";
const person: { firstname: string } & { age: number } = {
	firstname: "Mathieu",
	age: 23,
};
type User = {
	firstname: string;
	age: number;
};
interface Product {
	name: string;
	price: number;
}
enum Direction {
	Up,
	Down,
	Left,
	Right,
}
