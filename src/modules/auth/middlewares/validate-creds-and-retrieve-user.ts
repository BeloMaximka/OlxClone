import type { Context } from "@oak/oak/context";
import type { Next } from "@oak/oak/middleware";
import * as bcrypt from "bcrypt";
import { Role } from "../../../db/entities/role.ts";
import { User } from "../../../db/entities/user.ts";
import { UserPayload } from "../models/user-payload.ts";

interface AuthRequest {
  email: string;
  password: string;
}

export async function validateCredsAndRetrieveUsers(ctx: Context, next: Next) {
  const body = (await ctx.request.body.json()) as AuthRequest;
  ctx.assert(body.email, 400, "Email is required");
  ctx.assert(body.password, 400, "Password is required");

  const user = await User.findOne({
    where: {
      email: body.email,
    },
    include: [Role],
  });

  ctx.assert(user, 401);
  ctx.assert(await bcrypt.compare(body.password, user.password), 401);

  ctx.state["user"] = new UserPayload(user);
  next();
}
