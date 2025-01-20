import { Ad } from 'src/ads/entities/ad.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TagGroup } from './tag-group.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tagGroupId: number;

  @Column()
  advertisementId: number;

  @Column({ length: 256 })
  value: string;

  @ManyToOne(() => TagGroup, (tagGroup) => tagGroup.tags)
  @JoinColumn({ name: 'tagGroupId' })
  tagGroup: TagGroup;

  @ManyToOne(() => Ad, (ad) => ad.tags)
  @JoinColumn({ name: 'advertisementId' })
  ad: Ad;
}
