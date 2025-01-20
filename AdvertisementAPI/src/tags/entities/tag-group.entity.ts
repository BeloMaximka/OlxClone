import { Category } from 'src/categories/entities/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Tag } from './tag.entity';
import { TagValue } from './tag-values.entity';

@Entity('taggroups')
export class TagGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.tagGroups)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => Tag, (tag) => tag.tagGroup)
  tags: Tag[];

  @OneToMany(() => TagValue, (tagValue) => tagValue.tagGroup)
  tagValues: TagValue[];
}
