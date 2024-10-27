import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Role } from "./role.ts";
import { User } from "./user.ts";

@Table({
  timestamps: false,
})
export class UserRole extends Model {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  declare userId: number;

  @ForeignKey(() => Role)
  @Column(DataType.INTEGER)
  declare roleId: number;
}
