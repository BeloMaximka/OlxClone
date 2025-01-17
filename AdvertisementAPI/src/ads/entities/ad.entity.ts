import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('advertisements')
  export class Ad {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    categoryId: number;
  
    @Column()
    authorId: number;
  
    @Column({ length: 128 })
    slug: string;
  
    @Column({ length: 128 })
    title: string;
  
    @Column('text')
    description: string;
  
    @Column('decimal', { precision: 10, scale: 0 })
    price: number;
  
    @Column('simple-array')
    images: string[];
  
    @Column({ default: false })
    isSold: boolean;
  
    @CreateDateColumn()
    publishDate: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  