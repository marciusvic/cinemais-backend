import { ApiProperty } from '@nestjs/swagger';
import { CreateMediaDto } from '../dto/create-media.dto';
import { MediaType } from '@prisma/client';

export class MediaDoc extends CreateMediaDto {
  @ApiProperty({
    example: 'Kimetsu no Yaiba Season 1',
    description: 'Título da mídia',
  })
  declare title: string;
  @ApiProperty({
    example: 'Uma história de caçadores de demônios',
    description: 'Descrição da mídia',
  })
  declare description: string;
  @ApiProperty({
    example: 'Action',
    description: 'Gênero da mídia',
  })
  @ApiProperty({
    example: MediaType.series,
    description: 'Tipo da mídia (series, movie)',
  })
  declare genre: string;
  @ApiProperty({
    example: 2019,
    description: 'Ano de lançamento da mídia',
  })
  declare releaseYear: number;
}
