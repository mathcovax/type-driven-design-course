import { C, DP } from "@duplojs/utils";

const result = C.subtract(
    C.Positive.createOrThrow(12),
    C.Number.createOrThrow(10), 
);

result;
// ^?