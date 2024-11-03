import type { Context } from "@oak/oak/context";
import { sendTokens } from "../functions/send-tokens.ts";
import jwt from "jsonwebtoken";
import { environmentVariables } from "../../../config/environment-variables.ts";
import { getUserFromAccessToken } from "../../shared/authentication/functions/get-user-from-access-token.ts";

export async function refreshTokens(ctx: Context) {
  await validateRefreshToken(ctx);
  const user = getUserFromAccessToken(ctx);
  sendTokens(ctx, user);
}

async function validateRefreshToken(ctx: Context) {
  const refreshToken = await ctx.cookies.get("refresh_token");
  ctx.assert(refreshToken, 401, "Refresh token is required");

  try {
    jwt.verify(refreshToken, environmentVariables.jwt.refreshSecret);
  } catch {
    ctx.assert(false, 403, "Invalid refresh token");
  }
}
