import { C, DP } from "@duplojs/utils";

const PhoneNumber = C.createConstraint(
    "phone-number",
    C.String,
    DP.checkerRegex(/^\+33[1-9]\d{8}$/)
);
type PhoneNumber = C.GetConstraint<typeof PhoneNumber>;

const phoneNumber = PhoneNumber.createOrThrow("+33612345678");
//    ^?