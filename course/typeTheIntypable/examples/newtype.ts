import { C, DPE } from "@duplojs/utils";

const UserEmail = C.createNewType("UserEmail", C.String, C.Email);
type UserEmail = C.GetNewType<typeof UserEmail>;

const UserName = C.createNewType("UserName", C.String, [C.StringMin(5), C.StringMax(35)]);
type UserName = C.GetNewType<typeof UserName>;

const Subscription = C.createNewType(
    "Subscription",
    DPE.object({
        from: DPE.date(),
        to: DPE.date(),
    })
);
type Subscription = C.GetNewType<typeof Subscription>