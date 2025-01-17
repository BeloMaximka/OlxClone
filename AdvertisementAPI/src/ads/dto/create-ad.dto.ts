import {
    IsString,
    IsInt,
    IsDecimal,
    IsArray,
    IsNotEmpty,
    MaxLength,
    Min,
  } from 'class-validator';
  
  export class CreateAdDto {
    @IsInt()
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
  
    @IsDecimal()
    @Min(0)
    price: number;
  
    @IsArray()
    @IsString({ each: true })
    images: string[];
  }
  