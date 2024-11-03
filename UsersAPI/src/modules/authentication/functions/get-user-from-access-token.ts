import type { Context } from "@oak/oak/context";
import jwt from "jsonwebtoken";
import { environmentVariables } from "../../../config/environment-variables.ts";
import type { UserPayload } from "../models/user-payload.ts";

export function getUserFromAccessToken(ctx: Context) {
  const authHeader = ctx.request.headers.get("authorization");
  const accessToken = authHeader && authHeader.split(" ")[1];
  ctx.assert(accessToken, 403, "Authorization header is required");

  try {
    const decodedUser = jwt.verify(
      accessToken,
      environmentVariables.jwt.accessSecret
    ) as UserPayload;
    return decodedUser;
  } catch {
    ctx.assert(false, 403, "Invalid access token");
  }
}
