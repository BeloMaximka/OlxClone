import type { Context } from "@oak/oak/context";
import type { UserPayload } from "../../authentication/models/user-payload.ts";
import { getUserFromAccessToken } from "../../authentication/functions/get-user-from-access-token.ts";
import type { Roles } from "../enums/roles.ts";

export function validateRoleFromPayload(ctx: Context, user: UserPayload, role: Roles) {
    const isRoleExists = user.roles.find(userRole => userRole === role)
    ctx.assert(isRoleExists, 403, `Insufficent role: '${role}' role is required`);
}

export function validateRole(ctx: Context, role: Roles) {
    validateRoleFromPayload(ctx, getUserFromAccessToken(ctx), role);
}