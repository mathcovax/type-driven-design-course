import { C } from "@duplojs/utils";

const Content = C.createConstraintsSet(
    C.String,
    [
        C.StringMin(10),
        C.StringMax(150),
    ],
);

const content = Content.createOrThrow("this is super content");
//    ^?