import type { Context } from "@oak/oak/context";
import { sendTokens } from "../functions/send-tokens.ts";
import * as bcrypt from "bcrypt";
import { Role } from "../../../db/entities/role.ts";
import { User } from "../../../db/entities/user.ts";
import { UserPayload } from "../../shared/authentication/models/user-payload.ts";
import type { AuthRequest } from "../models/auth-request.ts";

export async function login(ctx: Context) {
  const body = (await ctx.request.body.json()) as AuthRequest;
  ctx.assert(body.email, 400, "Email is required");
  ctx.assert(body.password, 400, "Password is required");

  const user = await validateCredsAndGetUser(ctx, body);
  sendTokens(ctx, user);
}

async function validateCredsAndGetUser(ctx: Context, req: AuthRequest) {
  const user = await User.findOne({
    where: {
      email: req.email,
    },
    include: [Role],
  });

  ctx.assert(user, 401);
  ctx.assert(await bcrypt.compare(req.password, user.password), 401);

  return new UserPayload(user);
}
