import { Category } from 'src/categories/entities/category.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  
  @Entity('sections')
  export class Section {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 32 })
    slug: string;
  
    @Column({ length: 128 })
    name: string;

    @Column({ length: 1024 })
    imageUrl: string;

    @OneToMany(() => Category, (category) => category.section)
    categories: Category[];
  }
  