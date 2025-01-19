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

@Module({
  imports: [TypeOrmModule.forFeature([Ad, AdImage])],
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
