import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdImage } from './entities/ad-image.entity';
import { ConfigService } from '@nestjs/config';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class AdImagesService {
  private readonly maxImageCount: number;

  constructor(
    @InjectRepository(AdImage)
    private readonly adImagesRepository: Repository<AdImage>,
    private readonly imagesService: ImagesService,
    configService: ConfigService,
  ) {
    this.maxImageCount = configService.getOrThrow('MAX_IMAGES_PER_AD');
  }

  async add(adId: number, imageNames: string[]): Promise<AdImage[]> {
    const imageCount = await this.adImagesRepository.countBy({ adId });
    if (imageCount + imageNames.length > this.maxImageCount) {
      this.imagesService.delete(imageNames);
      throw new BadRequestException(
        `The ad has ${imageCount} images out of maximum of ${this.maxImageCount}. Adding ${imageNames.length} is now allowed`,
      );
    }

    const images: AdImage[] = [];
    imageNames.forEach((image) =>
      images.push(
        this.adImagesRepository.create({
          imageUri: image,
          adId,
        }),
      ),
    );

    return await this.adImagesRepository.save(images);
  }
}
