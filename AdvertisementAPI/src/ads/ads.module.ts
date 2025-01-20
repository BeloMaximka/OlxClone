import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { Ad } from './entities/ad.entity';
import { ConfigUtil } from 'src/common/utils/config.util';
import { JwtService } from '@nestjs/jwt';
import { AdImage } from './entities/ad-image.entity';
import { AdImagesService } from './ad-images.service';
import { ImagesService } from 'src/images/images.service';
import { Tag } from 'src/tags/entities/tag.entity';
import { NumericTag } from 'src/tags/entities/numeric-tag.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TypeOrmModule.forFeature([Ad, AdImage, Tag, NumericTag]), CacheModule.register()],
  controllers: [AdsController],
  providers: [
    AdsService,
    AdImagesService,
    ImagesService,
    ConfigUtil,
    JwtService,
  ],
})
export class AdsModule {}
