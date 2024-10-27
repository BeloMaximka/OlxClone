import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Role } from "./role.ts";
import { UserRole } from "./user-role.ts";

@Table({
  timestamps: false,
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare isEmailConfirmed: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare isActive: boolean;

  @Column({
    type: DataType.STRING(1024),
    allowNull: true,
  })
  declare avatarUrl: string;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  declare registrationDate: Date;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @BelongsToMany(() => Role, () => UserRole)
  declare roles: Role[];
}
