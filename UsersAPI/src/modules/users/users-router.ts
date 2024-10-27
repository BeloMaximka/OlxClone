import { Router } from "@oak/oak/router";
import { registerUser } from "./middlewares/register-user.ts";

const usersRouter = new Router();

usersRouter.post("/", registerUser);

export { usersRouter };
