import { Context } from "@oak/oak/context";
import { validatePassword } from "../../shared/validation/functions/validate-password.ts";
import jwt from "jsonwebtoken";
import { environmentVariables } from "../../../config/environment-variables.ts";
import { ResetPasswordPayload } from "../models/reset-password-payload.ts";
import { OperationTypes } from "../enums/operation-types.ts";
import { User } from "../../../db/entities/user.ts";
import * as bcrypt from "bcrypt";

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export async function resetPassword(ctx: Context) {
  const { token, newPassword } =
    (await ctx.request.body.json()) as ResetPasswordRequest;
  ctx.assert(token, 400, "Token is required");
  validatePassword(ctx, newPassword);
  const payload = getResetPasswordPayload(ctx, token);

  const user = await User.findOne({
    where: { email: payload.email },
    attributes: ["id", "password", "passwordUpdatedAt"],
  });

  const isTokenNotExpired = !user?.passwordUpdatedAt || user?.passwordUpdatedAt < payload.timestamp;
  ctx.assert(isTokenNotExpired, 403, "Token is expired.")

  ctx.assert(user, 404, `User with email '${payload.email}' not found.`);
  ctx.assert(
    await bcrypt.compare(newPassword, user.password),
    400,
    "New password must not match the old one."
  );

  await user.update({ password: await bcrypt.hash(newPassword), passwordUpdatedAt: new Date() });
  ctx.response.status = 200;
}

function getResetPasswordPayload(ctx: Context, token: string) {
  try {
    const payload = jwt.verify(
      token,
      environmentVariables.jwt.operationSecret
    ) as ResetPasswordPayload;
    ctx.assert(
      payload.operation === OperationTypes.ResetPassword,
      403,
      "Invalid operation type"
    );
    ctx.assert(payload.email, 403, "Invalid email");
    return payload;
  } catch {
    ctx.assert(false, 403, "Invalid operation token");
  }
}
