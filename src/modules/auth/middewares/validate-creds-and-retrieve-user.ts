import type { Context } from "@oak/oak/context";
import type { Next } from "@oak/oak/middleware";
import * as bcrypt from "bcrypt";

interface AuthRequest {
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

export async function validateCredsAndRetrieveUsers(ctx: Context, next: Next) {
  const body = (await ctx.request.body.json()) as AuthRequest;
  if (!body.email || !body.password) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "Email and password are required",
    };
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

  ctx.state["user"] = user;
  next();
}
