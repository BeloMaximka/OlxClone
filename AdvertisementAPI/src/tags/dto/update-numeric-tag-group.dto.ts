import { PartialType } from '@nestjs/mapped-types';
import { CreateNumericTagGroupDto } from './create-numeric-tag-group.dto';

export class UpdateNumericTagGroupDto extends PartialType(
  CreateNumericTagGroupDto,
) {}
