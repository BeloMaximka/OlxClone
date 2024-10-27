import { Router } from "@oak/oak/router";
import { retrieveUserFromAccessToken } from "./middewares/retrieve-user-form-access-token.ts";
import { sendTokens } from "./middewares/send-tokens.ts";
import { validateCredsAndRetrieveUsers } from "./middewares/validate-creds-and-retrieve-user.ts";
import { validateRefreshToken } from "./middewares/validate-refresh-token.ts";

const authRouter = new Router();

authRouter.post("/", validateCredsAndRetrieveUsers, sendTokens);
authRouter.post(
  "/token",
  validateRefreshToken,
  retrieveUserFromAccessToken,
  sendTokens
);

export { authRouter };
