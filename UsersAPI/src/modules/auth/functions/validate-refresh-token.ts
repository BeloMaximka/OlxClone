import type { Context } from "@oak/oak/context";
import jwt from "jsonwebtoken";
import { environmentVariables } from "../../../config/environment-variables.ts";

export async function validateRefreshToken(ctx: Context) {
  const refreshToken = await ctx.cookies.get("refresh_token");
  ctx.assert(refreshToken, 401, "Refresh token is required");

  try {
    jwt.verify(refreshToken, environmentVariables.jwt.refreshSecret);
  } catch {
    ctx.assert(false, 403, "Invalid refresh token");
  }
}
