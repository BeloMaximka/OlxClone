import { Ad } from 'src/ads/entities/ad.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { NumericTagGroup } from './numeric-tag-group.entity';

@Entity('numerictags')
export class NumericTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numericTagGroupId: number;

  @Column()
  advertisementId: number;

  @Column({ length: 256 })
  value: string;

  @ManyToOne(() => NumericTagGroup, (numericTagGroup) => numericTagGroup.numericTags)
  @JoinColumn({ name: 'numericTagGroupId' })
  numericTagGroup: NumericTagGroup;

  @ManyToOne(() => Ad, (ad) => ad.tags)
  @JoinColumn({ name: 'advertisementId' })
  ad: Ad;
}
