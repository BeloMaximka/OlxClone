import type { Context } from "@oak/oak/context";
import { User } from "../../../db/entities/user.ts";
import { validateRole } from "../../shared/authorization/functions/validate-role.ts";
import { Roles } from "../../shared/authorization/enums/roles.ts";
import { UserResponse } from "../models/user-response.ts";

export async function getAll(ctx: Context) {
    validateRole(ctx, Roles.Admin);
    const users = await User.findAll();
    ctx.response.body = users.map(user => new UserResponse(user));
}