import { Router } from "@oak/oak/router";
import { register } from "./controllers/register.ts";

const usersRouter = new Router();

usersRouter.post("/", register);

export { usersRouter };
