import { DPE, E } from "@duplojs/utils";

const myStringDataParser = DPE.string().min(12);

const dataParser = DPE.object({
    prop1: myStringDataParser,
    prop2: DPE.number().max(20),
})

const result = dataParser.parse(null); // null renverra un résultat invalide.

if(E.isRight(result)) {
    result;
    // ^?
}
