import {
    IsString,
    IsInt,
    MaxLength,
  } from 'class-validator';
  
  export class CreateCategoryDto {
    @IsInt()
    sectionId: number;
  
    @IsString()
    @MaxLength(128)
    name: string;
  
    @IsString()
    @MaxLength(32)
    slug: string;
  }
  