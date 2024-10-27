import { Router } from "@oak/oak/router";
import { authRouter } from "./modules/auth/auth-router.ts";

const rootRouter = new Router();
rootRouter.use(["/api/auth"], authRouter.routes());

export { rootRouter };
