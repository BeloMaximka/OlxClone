import { Router } from "@oak/oak/router";
import { register } from "./controllers/register.ts";
import { deactivate } from "./controllers/deactivate.ts";
import { getAll } from "./controllers/get-all.ts";
import { sendResetPasswordEmail } from "./controllers/send-reset-password-email.ts";
import { resetPassword } from "./controllers/reset-password.ts";

const usersRouter = new Router();

usersRouter.post("/password/email", sendResetPasswordEmail);
usersRouter.post("/password", resetPassword);

usersRouter.post("/", register);
usersRouter.get("/", getAll);
usersRouter.delete("/:id", deactivate);

export { usersRouter };
