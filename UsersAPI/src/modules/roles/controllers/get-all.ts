import type { Context } from "@oak/oak/context";
import { validateRole } from "../../shared/authorization/functions/validate-role.ts";
import { Roles } from "../../shared/authorization/enums/roles.ts";
import { Role } from "../../../db/entities/role.ts";

export async function getAll(ctx: Context) {
    validateRole(ctx, Roles.Admin);
    const roles = await Role.findAll();
    ctx.response.body = roles;
}