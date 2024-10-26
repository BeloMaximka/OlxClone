import type { Context } from "@oak/oak/context";
import * as bcrypt from "bcrypt";
// @ts-types="https://unpkg.com/@types/jsonwebtoken/index.d.ts"
import jwt from "jsonwebtoken";
import { environmentVariables } from "../config/environment-variables.ts";

interface AuthRequest {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  password: string;
}

const users = [
  {
    id: 1,
    email: "vasya@gmail.com",
    password: "$2b$10$9EbkD9UElCDWPZ11PRLviuIUyQHBoo9GzAF4H8LqGSiu48zS/7PPi", // 1Password!
  },
];

export class AuthController {
  static async authenticate(ctx: Context) {
    const body = (await ctx.request.body.json()) as AuthRequest;
    if (!body.email || !body.password) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Email and password are required" };
      return;
    }

    const user = users.find((user) => user.email === body.email);
    if (!user) {
      ctx.response.status = 401;
      return;
    }

    if (!bcrypt.compare(body.password, user.password)) {
      ctx.response.status = 401;
      return;
    }

    AuthController.sendRefreshAndAccessTokens(ctx, user);
  }

  static async getNewTokens(ctx: Context) {
    const authHeader = ctx.request.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      ctx.response.status = 403;
      ctx.response.body = { error: "Authorization header required" };
      return;
    }

    const decoded = jwt.verify(
      token,
      environmentVariables.jwt.accessSecret
    ) as User;
    const refreshToken = await ctx.cookies.get("refresh_token");
    if (!refreshToken) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Refresh token is required" };
      return;
    }
    jwt.verify(refreshToken, environmentVariables.jwt.refreshSecret);

    AuthController.sendRefreshAndAccessTokens(ctx, decoded);
  }

  private static sendRefreshAndAccessTokens(ctx: Context, user: User) {
    const oneMonthExpiration =
      Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;
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
}
