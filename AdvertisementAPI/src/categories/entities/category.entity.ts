import { Section } from 'src/sections/entities/section.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
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
  }
  