import {
  IsString,
  IsInt,
  IsNumber,
  IsNotEmpty,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateAdDto {
  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @IsString()
  @MaxLength(128)
  title: string;

  @IsString()
  @MaxLength(128)
  slug: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;
}
