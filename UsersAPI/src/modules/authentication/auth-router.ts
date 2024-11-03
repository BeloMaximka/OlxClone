import { Router } from "@oak/oak/router";
import { login } from "./controllers/login.ts";
import { refreshTokens } from "./controllers/refresh-tokens.ts";

const authRouter = new Router();

authRouter.post("/", login);
authRouter.post("/token", refreshTokens);

export { authRouter };
