import type { Context } from "@oak/oak/context";
import type { Next } from "@oak/oak/middleware";
import { environmentVariables } from "../../../config/environment-variables.ts";
import type { User } from "../models/user.ts";
// @ts-types="https://unpkg.com/@types/jsonwebtoken/index.d.ts"
import jwt from "jsonwebtoken";

export function retrieveUserFromAccessToken(ctx: Context, next: Next) {
  const authHeader = ctx.request.headers.get("authorization");
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (!accessToken) {
    ctx.response.status = 403;
    ctx.response.body = {
      error: "Authorization header is required",
    };
    return;
  }

  const decodedUser = jwt.verify(
    accessToken,
    environmentVariables.jwt.accessSecret
  ) as User;

  ctx.state["user"] = decodedUser;
  next();
}
