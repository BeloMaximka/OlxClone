import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Put,
  UseInterceptors,
  UploadedFiles,
  ParseIntPipe,
  Headers,
  Inject,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { OwnershipGuard } from '../common/guards/ownership.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import {
  FilesInterceptor,
} from '@nestjs/platform-express';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { AdImagesService } from './ad-images.service';
import { extname } from 'path';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Ad } from './entities/ad.entity';
import { Cache } from 'cache-manager';

const uploadDirectory = './uploads';
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

let maxImagesPerAd: number;
let maxAdImageSizeBytes: number;

@Controller('ads')
export class AdsController {
  constructor(
    private readonly adsService: AdsService,
    private readonly adImagesService: AdImagesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    configService: ConfigService,
  ) {
    maxImagesPerAd = configService.get<number>('MAX_IMAGES_PER_AD', 0);
    maxAdImageSizeBytes = configService.get<number>(
      'MAX_AD_IMAGE_SIZE_BYTES',
      0,
    );
  }

  @Post()
  @Roles('user', 'admin')
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createAdDto: CreateAdDto, @Request() req: any) {
    const userId = req.user.sub; // Extracted from JWT payload
    return this.adsService.create({
      ...createAdDto,
      authorId: userId,
    });
  }

  @Post(':id/images')
  @Roles('user', 'admin')
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(
    FilesInterceptor('images', maxImagesPerAd, {
      dest: uploadDirectory,
      limits: {
        fileSize: maxAdImageSizeBytes,
      },
    }),
  )
  uploadImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const result = this.adImagesService.add(
      id,
      files.map((image) => `${image.filename}${extname(image.originalname)}`),
    );
    this.cacheManager.del(`ads_${id}`);
    return result;
    
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Headers() headers) {
    let ad = await this.cacheManager.get<Ad>(`ads_${id}`);
    if(ad) {
      return ad;
    }

    ad = await this.adsService.findOne(+id);
    ad.images.forEach(
      (image) =>
        (image.imageUri = `http://${headers.host}/api/images/${image.imageUri}`),
    );
    this.cacheManager.set(`ads_${id}`, ad);
    return ad;
  }

  @Put(':id')
  @Roles('user', 'admin')
  @UseGuards(RolesGuard, OwnershipGuard)
  update(
    @Param('id') id: string,
    @Body() updateAdDto: UpdateAdDto,
    @Request() req: any,
  ) {
    return this.adsService.update(+id, updateAdDto);
  }

  @Delete(':id')
  @Roles('user', 'admin')
  @UseGuards(RolesGuard, OwnershipGuard)
  remove(@Param('id') id: string) {
    return this.adsService.remove(+id);
  }
}
