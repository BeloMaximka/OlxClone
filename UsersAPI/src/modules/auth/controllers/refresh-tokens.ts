import type { Context } from "@oak/oak/context";
import { validateRefreshToken } from "../functions/validate-refresh-token.ts";
import { getUserFromAccessToken } from "../functions/get-user-from-access-token.ts";
import { sendTokens } from "../functions/send-tokens.ts";

export async function refreshTokens(ctx: Context) {
    await validateRefreshToken(ctx);
    const user = getUserFromAccessToken(ctx);
    sendTokens(ctx, user);
}