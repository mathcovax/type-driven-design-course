import { C, DP } from "@duplojs/utils";

const UserEmail = C.createNewType("UserEmail", C.String, C.Email);
type UserEmail = C.GetNewType<typeof UserEmail>;

const Content = C.createConstraintsSet(
    C.String,
    [
        C.StringMin(10),
        C.StringMax(150),
    ],
);
// ---cut---
declare function sendEmail(
    params: {
        email: C.Email, 
        content:  C.StringMin<10> & C.StringMax<150>
    }
): Promise<void>

sendEmail({
    email: UserEmail.createOrThrow("duplojs@gmail.com"),
    content: Content.createOrThrow("this is a super message"),
});

const result = C.concat(C.String.createOrThrow("test-"), UserEmail.createOrThrow("duplojs@gmail.com"));