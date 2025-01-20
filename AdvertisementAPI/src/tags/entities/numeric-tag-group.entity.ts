import { Category } from 'src/categories/entities/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { NumericTag } from './numeric-tag.entity';
import { NumericTagValue } from './numeric-tag-value.entity';

@Entity('numerictaggroups')
export class NumericTagGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.numericTagGroups)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => NumericTag, (numericTag) => numericTag.numericTagGroupId)
  numericTags: NumericTag[];

  @OneToMany(() => NumericTagValue, (numericTagValue) => numericTagValue.numericTagGroupId)
  numericTagValues: NumericTagValue[];
}
