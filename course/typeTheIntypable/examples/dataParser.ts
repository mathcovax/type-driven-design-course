import { DPE, E } from "@duplojs/utils";

DPE.string().min(12);

const dataParser = DPE.object({
    prop1: DPE.string().regex(/^@/),
    prop2: DPE.number().max(20),
})

const result = dataParser.parse(null);

if(E.isRight(result)) {
    result;
    // ^?
}