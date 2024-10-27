import { Sequelize } from "sequelize-typescript";
import { environmentVariables } from "../../config/environment-variables.ts";
import { Role } from "../entities/role.ts";
import { UserRole } from "../entities/user-role.ts";
import { User } from "../entities/user.ts";

const env = environmentVariables.mysql;

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: env.hostname,
  username: env.username,
  password: env.password,
  database: env.database,
  models: [User, Role, UserRole],
});
