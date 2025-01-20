import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateNumericTagValueDto {
  @IsInt()
  numericTagGroupId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  value: string;
}
