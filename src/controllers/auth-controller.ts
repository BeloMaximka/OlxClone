import type { Context } from "@oak/oak/context";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}
const jwtAccessSecret = Deno.env.get("JWT_ACCESS_SECRET");
const jwtRefreshSecret = Deno.env.get("JWT_REFRESH_SECRET");
if (!jwtAccessSecret || !jwtRefreshSecret) {
  throw Error("Missing JWT_ACCESS_SECRET or JWT_REFRESH_ECRET env variable");
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
    ctx.response.body = body;

    const oneMonthExpiration =
      Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;
    const refreshToken = jwt.sign(
      { email: user.email, exp: oneMonthExpiration },
      jwtRefreshSecret
    );

    const oneHourExpiration = Math.floor(Date.now() / 1000) + 60 * 60;
    const accessToken = jwt.sign(
      { email: user.email, exp: oneHourExpiration },
      jwtAccessSecret
    );

    ctx.cookies.set("refresh_token", refreshToken, {
      secure: true,
      sameSite: true,
      httpOnly: true,
      maxAge: oneMonthExpiration * 1000,
      path: "/api/user/refresh-token",
    });

    ctx.response.body = { token: accessToken };
  }
}
