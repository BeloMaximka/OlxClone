import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':fileName')
  async get(
    @Param('fileName') fileName: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const file = await this.imagesService.get(fileName);
    return new StreamableFile(file.content, {
      type: file.contentType,
    });
  }
}
