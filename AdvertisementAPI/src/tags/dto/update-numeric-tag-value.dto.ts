import { PartialType } from '@nestjs/mapped-types';
import { CreateNumericTagValueDto } from './create-numeric-tag-value.dto';

export class UpdateNumericTagValueDto extends PartialType(
  CreateNumericTagValueDto,
) {}
