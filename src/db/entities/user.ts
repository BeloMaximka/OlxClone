import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  timestamps: false,
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isEmailConfirmed!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive!: boolean;

  @Column({
    type: DataType.STRING(1024),
    allowNull: true,
  })
  avatarUrl!: string;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  registrationDate!: Date;

  @Column({
    type: DataType.STRING,
  })
  password!: string;
}
