import { C, DP } from "@duplojs/utils";

const Content = C.createConstraintsSet(
    C.String,
    [
        C.StringMin(10),
        C.StringMax(150),
    ],
);

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
        content: C.StringMin<10> & C.StringMax<150>
    }
): Promise<void>

sendMessage({
    phoneNumber: PhoneNumber.createOrThrow("+33612345678"),
    content: Content.createOrThrow("this is super message"),
})