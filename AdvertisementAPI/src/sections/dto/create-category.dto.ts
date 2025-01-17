import {
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class CreateSectionDto {
    @IsString()
    @MaxLength(128)
    name: string;
  
    @IsString()
    @MaxLength(32)
    slug: string;

    @IsString()
    @MaxLength(1024)
    imageUrl: string;
  }
  