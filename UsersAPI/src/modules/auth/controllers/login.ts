import type { Context } from "@oak/oak/context";
import type { AuthRequest } from "../models/auth-request.ts";
import { validateCredsAndGetUser } from "../functions/validate-creds-and-get-user.ts";
import { sendTokens } from "../functions/send-tokens.ts";

export async function login(ctx: Context) {
  const body = (await ctx.request.body.json()) as AuthRequest;
  ctx.assert(body.email, 400, "Email is required");
  ctx.assert(body.password, 400, "Password is required");

  const user = await validateCredsAndGetUser(ctx, body);
  sendTokens(ctx, user);
}
