import { DP, DPE, E } from "@duplojs/utils";

const myDataParserWithCheckerMin = DPE.string().min(5); // Méthode disponible dans la version extended.

const userNameDataParser = DP.string()
    .addChecker(
        DP.checkerStringMin(5),
    );

const errorResult = userNameDataParser.parse("miko");
const successResult = userNameDataParser.parse("mathcovax");
