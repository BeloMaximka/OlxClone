import type { Context } from "@oak/oak/context";
import * as bcrypt from "bcrypt";
import { Role } from "../../../db/entities/role.ts";
import { User } from "../../../db/entities/user.ts";
import { UserPayload } from "../../shared/authentication/models/user-payload.ts";
import type { AuthRequest } from "../models/auth-request.ts";

export async function validateCredsAndGetUser(ctx: Context, req: AuthRequest) {
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
