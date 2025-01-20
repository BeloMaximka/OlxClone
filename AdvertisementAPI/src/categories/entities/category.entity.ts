import { Section } from 'src/sections/entities/section.entity';
import { NumericTagGroup } from 'src/tags/entities/numeric-tag-group.entity';
import { TagGroup } from 'src/tags/entities/tag-group.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sectionId: number;

  @Column({ length: 32 })
  slug: string;

  @Column({ length: 128 })
  name: string;

  @ManyToOne(() => Section, (section) => section.categories)
  @JoinColumn({ name: 'sectionId' })
  section: Section;

  @OneToMany(() => TagGroup, (tagGroup) => tagGroup.category)
  tagGroups: TagGroup[];

  @OneToMany(() => NumericTagGroup, (numericTagGroup) => numericTagGroup.category)
  numericTagGroups: NumericTagGroup[];
}
