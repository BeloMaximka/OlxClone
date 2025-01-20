import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { NumericTagGroup } from './numeric-tag-group.entity';

@Entity('tagvalues')
export class NumericTagValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numericTagGroupId: number;

  @Column({ length: 256 })
  value: string;

  @ManyToOne(() => NumericTagGroup, (numericTagGroup) => numericTagGroup.numericTagValues)
  @JoinColumn({ name: 'numericTagGroupId' })
  numericTagGroup: NumericTagGroup;
}
