import type { Context } from "@oak/oak/context";
import type { Next } from "@oak/oak/middleware";
// @ts-types="https://unpkg.com/@types/jsonwebtoken/index.d.ts"
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
  jwt.verify(refreshToken, environmentVariables.jwt.refreshSecret);
  next();
}
