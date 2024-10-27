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
  if (!body.email || !body.password) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "Email and password are required",
    };
    return;
  }
  const user = await User.findOne({
    where: {
      email: body.email,
    },
    include: [Role],
  });

  if (!user) {
    ctx.response.status = 401;
    return;
  }

  console.log(user.roles.map((role) => role.name));

  if (!bcrypt.compare(body.password, user.password)) {
    ctx.response.status = 401;
    return;
  }

  ctx.state["user"] = new UserPayload(user);
  next();
}
