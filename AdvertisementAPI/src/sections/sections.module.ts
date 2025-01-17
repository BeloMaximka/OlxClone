import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';
import { Section } from './entities/section.entity';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section, Category])],
  controllers: [SectionsController],
  providers: [SectionsService, JwtService],
})
export class SectionsModule {}
