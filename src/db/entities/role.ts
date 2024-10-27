import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  timestamps: false,
})
export class Role extends Model {
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare displayName: string;
}
