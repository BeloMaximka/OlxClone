import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigUtil {
  constructor(private readonly configService: ConfigService) {}

  getMaxImagesPerAd(): number {
    return this.configService.get<number>('MAX_IMAGES_PER_AD', 10);
  }
}
