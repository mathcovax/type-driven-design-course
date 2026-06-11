import { C, E, pipe } from "@duplojs/utils";

declare function division(dividend: C.Number, divisor: C.NotZero): C.Number;

const result = pipe(
    {
        dividend: C.Number.create(15),
        divisor: C.NotZero.create(2)
    },
    E.group,
    E.whenIsRight(
        ({dividend, divisor}) => division(dividend, divisor)
    )
)

result;
// ^?