import { Router } from "@oak/oak/router";
import { authRouter } from "./modules/authentication/auth-router.ts";
import { usersRouter } from "./modules/users/users-router.ts";
import { rolesRouter } from "./modules/roles/roles.routers.ts";

const rootRouter = new Router();
rootRouter.use(["/api/auth"], authRouter.routes());
rootRouter.use(["/api/users"], usersRouter.routes());
rootRouter.use(["/api/roles"], rolesRouter.routes());

export { rootRouter };
