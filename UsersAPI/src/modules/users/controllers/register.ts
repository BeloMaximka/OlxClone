import type { Context } from "@oak/oak/context";
import * as bcrypt from "bcrypt";
import { sequelize } from "../../../db/configuration/sequelize.ts";
import { Role } from "../../../db/entities/role.ts";
import { UserRole } from "../../../db/entities/user-role.ts";
import { User } from "../../../db/entities/user.ts";
import { validatePassword } from "../../shared/validation/functions/validate-password.ts";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export async function register(ctx: Context) {
  const body = (await ctx.request.body.json()) as RegisterRequest;
  ctx.assert(body.name, 400, "Name is required");
  ctx.assert(body.email, 400, "Email is required");
  validatePassword(ctx, body.password);

  const userExists = await User.findOne({
    where: { email: body.email },
    attributes: ["id"],
  });
  ctx.assert(
    !userExists,
    400,
    `User with email '${body.email}' already exists.`
  );

  const transaction = await sequelize.transaction();
  try {
    const newUser = {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password),
    };
    const user = await User.create(newUser, { transaction });

    const [role] = await Role.findOrCreate({
      where: { name: "user" },
      defaults: { displayName: "User" },
    });
    
    await UserRole.create(
      { userId: user.id, roleId: role.id },
      { transaction }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

  ctx.response.status = 201;
}
