import type { Context } from "@oak/oak/context";
import { environmentVariables } from "../../../config/environment-variables.ts";
import type { User } from "../models/user.ts";
// @ts-types="https://unpkg.com/@types/jsonwebtoken/index.d.ts"
import jwt from "jsonwebtoken";

export function sendTokens(ctx: Context) {
  const user = ctx.state["user"] as User;
  const oneMonthExpiration = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;
  const refreshToken = jwt.sign(
    { email: user.email, exp: oneMonthExpiration },
    environmentVariables.jwt.refreshSecret
  );

  const oneHourExpiration = Math.floor(Date.now() / 1000) + 60 * 60;
  const accessToken = jwt.sign(
    { email: user.email, exp: oneHourExpiration },
    environmentVariables.jwt.accessSecret
  );

  ctx.cookies.set("refresh_token", refreshToken, {
    secure: true,
    sameSite: true,
    httpOnly: true,
    maxAge: oneMonthExpiration * 1000,
    path: "/api/auth/token",
  });

  ctx.response.body = { token: accessToken };
}
