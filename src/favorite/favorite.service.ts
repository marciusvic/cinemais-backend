import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FavoriteRepository } from './favorite.repository';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UserRepository } from 'src/user/user.repository';
import { MediaRepository } from 'src/media/media.repository';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly userRepository: UserRepository,
    private readonly mediaRepository: MediaRepository,
  ) {}
  async addFavorite(userId: string, createFavoriteDto: CreateFavoriteDto) {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const media = await this.mediaRepository.findOne(createFavoriteDto.mediaId);
    if (!media) {
      throw new NotFoundException('Mídia não encontrada');
    }
    const existingFavorite = await this.favoriteRepository.findOne({
      userId: userId,
      mediaId: createFavoriteDto.mediaId,
    });
    if (existingFavorite) {
      throw new BadRequestException('Essa mídia já está nos favoritos.');
    }
    return this.favoriteRepository.addFavorite({
      ...createFavoriteDto,
      userId,
    });
  }

  async getUserFavorites(userId: string) {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return this.favoriteRepository.findMany({
      where: { userId },
      include: {
        media: true,
      },
    });
  }

  async removeFavorite(userId: string, mediaId: string) {
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const media = await this.mediaRepository.findOne(mediaId);
    if (!media) {
      throw new NotFoundException('Mídia não encontrada');
    }
    const favorite = await this.favoriteRepository.findOne({
      userId: userId,
      mediaId: mediaId,
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    return this.favoriteRepository.delete({
      where: { id: favorite.id },
    });
  }
}
