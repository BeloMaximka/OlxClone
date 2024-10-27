import { Router } from "@oak/oak/router";
import { retrieveUserFromAccessToken } from "./middlewares/retrieve-user-from-access-token.ts";
import { sendTokens } from "./middlewares/send-tokens.ts";
import { validateCredsAndRetrieveUsers } from "./middlewares/validate-creds-and-retrieve-user.ts";
import { validateRefreshToken } from "./middlewares/validate-refresh-token.ts";

const authRouter = new Router();

authRouter.post("/", validateCredsAndRetrieveUsers, sendTokens);
authRouter.post(
  "/token",
  validateRefreshToken,
  retrieveUserFromAccessToken,
  sendTokens
);

export { authRouter };
