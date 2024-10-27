import type { Context } from "@oak/oak/context";
import type { Next } from "@oak/oak/middleware";
import jwt from "jsonwebtoken";
import { environmentVariables } from "../../../config/environment-variables.ts";
import type { UserPayload } from "../models/user-payload.ts";

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

  try {
    const decodedUser = jwt.verify(
      accessToken,
      environmentVariables.jwt.accessSecret
    ) as UserPayload;
    ctx.state["user"] = decodedUser;
    next();
  } catch {
    ctx.assert(false, 403, "Invalid access token");
  }
}
