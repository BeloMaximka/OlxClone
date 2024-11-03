import { Router } from "@oak/oak/router";
import { getAll } from "./controllers/get-all.ts";

const rolesRouter = new Router();

rolesRouter.get("/", getAll);

export { rolesRouter };
