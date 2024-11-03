import { Router } from "@oak/oak/router";
import { authRouter } from "./modules/authentication/auth-router.ts";
import { usersRouter } from "./modules/users/users-router.ts";

const rootRouter = new Router();
rootRouter.use(["/api/auth"], authRouter.routes());
rootRouter.use(["/api/users"], usersRouter.routes());

export { rootRouter };
