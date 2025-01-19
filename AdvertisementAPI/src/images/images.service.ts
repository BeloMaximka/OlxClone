import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createReadStream, existsSync, mkdirSync } from 'fs';
import { access, rm } from 'fs/promises';
import { basename, extname, join } from 'path';
import { ImageFile } from './dto/image-file.dto';

@Injectable()
export class ImagesService {
  readonly #fileDirectory = 'uploads';

  constructor() {
    const filesDirectory = join(process.cwd(), this.#fileDirectory);
    if (!existsSync(filesDirectory)) {
      mkdirSync(this.#fileDirectory);
    }
  }

  async get(fileName: string): Promise<ImageFile> {
    const fileNameWithoutExtension = basename(fileName, extname(fileName));
    const filePath = join(process.cwd(), this.#fileDirectory, fileNameWithoutExtension);
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

  async delete(fileNames: string[]) {
    const fileNamesWithoutExtension = fileNames.map(fileName => basename(fileName, extname(fileName)));
    const filesBasePath = join(process.cwd(), this.#fileDirectory);

    for (const fileName of fileNamesWithoutExtension) {
      await rm(join(filesBasePath, fileName));
    }
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
