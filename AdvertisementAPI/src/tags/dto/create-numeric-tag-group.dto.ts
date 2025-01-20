import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateNumericTagGroupDto {
  @IsInt()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;
}
