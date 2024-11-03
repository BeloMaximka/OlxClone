import { Router } from "@oak/oak/router";
import { register } from "./controllers/register.ts";
import { deactivate } from "./controllers/deactivate.ts";
import { getAll } from "./controllers/get-all.ts";

const usersRouter = new Router();

usersRouter.post("/", register);
usersRouter.get("/", getAll);
usersRouter.delete("/:id", deactivate);

export { usersRouter };
