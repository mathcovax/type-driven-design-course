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
        content: C.StringMax<150>
    }
): Promise<void>

const content = C.StringMax(100).createOrThrow("ThisIsSuperMessage");

sendMessage({
    phoneNumber: PhoneNumber.createOrThrow("+33612345678"),
    content: C.castConstraint(content, C.StringMax(150)),
});