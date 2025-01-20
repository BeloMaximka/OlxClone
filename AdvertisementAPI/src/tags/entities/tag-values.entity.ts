import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TagGroup } from './tag-group.entity';

@Entity('tagvalues')
export class TagValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tagGroupId: number;

  @Column({ length: 256 })
  value: string;

  @ManyToOne(() => TagGroup, (tagGroup) => tagGroup.tagValues)
  @JoinColumn({ name: 'tagGroupId' })
  tagGroup: TagGroup;
}
