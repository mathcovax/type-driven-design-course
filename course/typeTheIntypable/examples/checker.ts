import { DP, DPE, E } from "@duplojs/utils";

DPE.string().min(5);

const userNameDataParser = DP.string()
    .addChecker(
        DP.checkerStringMin(5),
    );

const errorResult = userNameDataParser.parse("miko");
const successResult = userNameDataParser.parse("mathcovax");