import { DPE, S } from "@duplojs/utils";

const dataParser = DPE.object({
    prop1: DPE.string(),
    prop2: DPE.number().transform(S.to),
});

type Input = DPE.Input<typeof dataParser>; // Correspond à la valeur d'entrée attendue.
//   ^?





type Output = DPE.Output<typeof dataParser>; // Correspond à la valeur de sortie après traitement.
//   ^?