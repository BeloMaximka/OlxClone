import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { JwtService } from '@nestjs/jwt';
import { SectionsService } from 'src/sections/sections.service';
import { Section } from 'src/sections/entities/section.entity';
import { AdsService } from 'src/ads/ads.service';
import { Ad } from 'src/ads/entities/ad.entity';
import { TagGroup } from 'src/tags/entities/tag-group.entity';
import { NumericTagGroup } from 'src/tags/entities/numeric-tag-group.entity';
import { TagValue } from 'src/tags/entities/tag-values.entity';
import { NumericTagValue } from 'src/tags/entities/numeric-tag-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Section, Ad, TagGroup, NumericTagGroup, TagValue, NumericTagValue])],
  controllers: [CategoriesController],
  providers: [CategoriesService, SectionsService, AdsService, JwtService],
})
export class CategoriesModule {}
