import { ApiProperty } from '@nestjs/swagger';
import { CreateFavoriteDto } from '../dto/create-favorite.dto';

export class FavoriteDoc extends CreateFavoriteDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID único da media a ser favoritada',
  })
  declare mediaId: string;
}
