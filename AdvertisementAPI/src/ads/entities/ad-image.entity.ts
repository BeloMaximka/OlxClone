import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Ad } from './ad.entity';

@Entity('adimages')
export class AdImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adId: number;

  @Column({ length: 128 })
  imageUri: string;

  @ManyToOne(() => Ad, (ad) => ad.images)
  @JoinColumn({ name: 'adId' })
  ad: Ad;
}
