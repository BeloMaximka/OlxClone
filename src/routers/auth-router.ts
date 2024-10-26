import { Router } from "@oak/oak/router";
import { AuthController } from "../controllers/auth-controller.ts";

const authRouter = new Router();

authRouter.post("/", AuthController.authenticate);
authRouter.post("/token", AuthController.getNewTokens);

export { authRouter };
