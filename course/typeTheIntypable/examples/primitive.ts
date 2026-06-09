import { C } from "@duplojs/utils";

const maybeAge = C.Number.create(12);
const Age = C.Number.createOrThrow(12);

// @noErrors
Age.
//  ^|