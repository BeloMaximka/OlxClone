import type { Context } from "@oak/oak/context";
import type { Next } from "@oak/oak/middleware";
import jwt from "jsonwebtoken";
import { environmentVariables } from "../../../config/environment-variables.ts";

export async function validateRefreshToken(ctx: Context, next: Next) {
  const refreshToken = await ctx.cookies.get("refresh_token");
  if (!refreshToken) {
    ctx.response.status = 401;
    ctx.response.body = {
      error: "Refresh token is required",
    };
    return;
  }

  try {
    jwt.verify(refreshToken, environmentVariables.jwt.refreshSecret);
    next();
  } catch {
    ctx.assert(false, 403, "Invalid refresh token");
  }
}
