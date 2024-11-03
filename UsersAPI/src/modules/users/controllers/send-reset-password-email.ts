import { Context } from "@oak/oak/context";
import { environmentVariables } from "../../../config/environment-variables.ts";
import { User } from "../../../db/entities/user.ts";
import { OperationTypes } from "../enums/operation-types.ts";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../shared/email/functions/sendEmail.ts";
import { ResetPasswordPayload } from "../models/reset-password-payload.ts";

export async function sendResetPasswordEmail(ctx: Context) {
  const { email } = (await ctx.request.body.json()) as { email: string };
  ctx.assert(email, 400, "Email is required");

  const userExists = await User.findOne({
    where: { email },
    attributes: ["id"],
  });

  if (userExists) {
    const token = createResetPasswordToken(email);
    await sendEmail(
      email,
      "Password reset",
      `<a href="https://${environmentVariables.hostname}/reset-password/${token}">Reset your password</a>`
    );
  }

  ctx.response.status = 200;
}

function createResetPasswordToken(email: string) {
  const oneHourExpiration = Math.floor(Date.now() / 1000) + 60 * 60;
  return jwt.sign(
    {
      operation: OperationTypes.ResetPassword,
      email,
      timestamp: new Date(),
      exp: oneHourExpiration,
    } as ResetPasswordPayload,
    environmentVariables.jwt.operationSecret
  );
}
