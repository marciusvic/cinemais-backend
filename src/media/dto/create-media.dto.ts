import { IsEnum, IsInt, IsString } from 'class-validator';
import { MediaType } from '@prisma/client';

export class CreateMediaDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(MediaType)
  type: MediaType;

  @IsInt()
  releaseYear: number;

  @IsString()
  genre: string;
}
