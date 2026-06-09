import { C, DP } from "@duplojs/utils";

const PhoneNumber = C.createConstraint(
    "phone-number",
    C.String,
    DP.checkerRegex(/^\+33[1-9]\d{8}$/)
);
type PhoneNumber = C.GetConstraint<typeof PhoneNumber>;
// ---cut---
declare function sendMessage(
    params: {
        phoneNumber: PhoneNumber, 
        content: string
    }
): Promise<void>

sendMessage({
    phoneNumber: PhoneNumber.createOrThrow("+33612345678"),
    content: "this is super message",
})