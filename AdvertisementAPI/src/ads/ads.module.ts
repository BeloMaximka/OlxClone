import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { Ad } from './entities/ad.entity';
import { ConfigUtil } from 'src/common/utils/config.util';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Ad])],
  controllers: [AdsController],
  providers: [AdsService, ConfigUtil, JwtService],
})
export class AdsModule {}
