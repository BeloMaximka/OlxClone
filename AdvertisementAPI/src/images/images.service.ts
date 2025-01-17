import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createReadStream, existsSync, mkdirSync } from 'fs';
import { access } from 'fs/promises';
import { extname, join } from 'path';
import { ImageFile } from './dto/image-file.dto';

@Injectable()
export class ImagesService {
  readonly #fileDirectory = 'uploadedFilesDir';

  constructor() {
    const filesDirectory = join(process.cwd(), this.#fileDirectory);
    if (!existsSync(filesDirectory)) {
      mkdirSync(this.#fileDirectory);
    }
  }

  async get(fileName: string): Promise<ImageFile> {
    const filePath = join(process.cwd(), this.#fileDirectory, fileName);
    try {
      await access(filePath);
    } catch {
      throw new NotFoundException(`File with name ${fileName} not found.`);
    }

    return {
      contentType: this.#getImageType(fileName),
      content: createReadStream(filePath),
    };
  }

  #getImageType(fileName: string) {
    switch (extname(fileName)) {
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.png':
        return 'image/png';
      case '.gif':
        return 'image/gif';
      default:
        throw new BadRequestException(
          `Requested file '${fileName}' has unsupported extension.`,
        );
    }
  }
}
