import { C, DP } from "@duplojs/utils";
import { ResponseContract, useRouteBuilder } from "@duplojs/http";

const UserEmail = C.createNewType("UserEmail", C.String, C.Email);
type UserEmail = C.GetNewType<typeof UserEmail>;

const OnlyLetter = C.createConstraint(
    "only-letter",
    C.String,
    DP.checkerRegex(/^[A-Za-zÀ-ÖØ-öø-ÿ]]*$/)
)
type OnlyLetter = C.GetConstraint<typeof OnlyLetter>;

const UserName = C.createNewType("UserName", C.String, [
    C.StringMin(5), 
    C.StringMax(35),
    OnlyLetter
]);
type UserName = C.GetNewType<typeof UserName>;

const UserAge = C.createNewType("UserAge", C.Number, C.NumberMin(13));
type UserAge = C.GetNewType<typeof UserAge>;

declare function userEmailIsAvailable(userEmail: UserEmail): Promise<
    | (UserEmail & C.Evidence<"available">)
    | (UserEmail & C.Evidence<"already-use">)
>;

declare function createUser(params: {
    email: C.GetEvidenceResult<typeof userEmailIsAvailable, "available">;
    name: UserName,
    age: UserAge,
}): Promise<void>;

useRouteBuilder("POST", "/users")
    .extract({
        body: {
            email: UserEmail.toExtractParser(),
            name: UserName.toExtractParser(),
            age: UserAge.toExtractParser(),
        }
    })
    .handler(
        [ResponseContract.conflict("user.email.alreadyUse"), ResponseContract.created("user.created")],
        async({ email, ...rest }, { response }) => {
            const emailIsAvailable = await userEmailIsAvailable(email);
            if(C.hasEvidence(emailIsAvailable, "already-use")) {
                return response("user.email.alreadyUse")
            }
            await createUser({ email: emailIsAvailable, ...rest });
            return response("user.created")
        } 
    );