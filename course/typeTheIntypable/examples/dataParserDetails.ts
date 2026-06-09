import { DPE, S } from "@duplojs/utils";

const dataParser = DPE.object({
    prop1: DPE.string(),
    prop2: DPE.number().transform(S.to),
});

type Input = DPE.Input<typeof dataParser>;
//   ^?





type Output = DPE.Output<typeof dataParser>;
//   ^?