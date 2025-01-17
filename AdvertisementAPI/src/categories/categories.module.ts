import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { JwtService } from '@nestjs/jwt';
import { SectionsService } from 'src/sections/sections.service';
import { Section } from 'src/sections/entities/section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Section])],
  controllers: [CategoriesController],
  providers: [CategoriesService, SectionsService, JwtService],
})
export class CategoriesModule {}
