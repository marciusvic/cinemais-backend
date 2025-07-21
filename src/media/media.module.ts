import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaRepository } from './media.repository';
import { PrismaModule } from 'nestjs-prisma';
import { FavoriteService } from 'src/favorite/favorite.service';
import { FavoriteRepository } from 'src/favorite/favorite.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    MediaService,
    MediaRepository,
    FavoriteService,
    FavoriteRepository,
    UserRepository,
  ],
  controllers: [MediaController],
  exports: [MediaService, MediaRepository],
})
export class MediaModule {}
