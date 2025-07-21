import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { MediaRepository } from 'src/media/media.repository';
import { UserRepository } from 'src/user/user.repository';
import { FavoriteRepository } from './favorite.repository';
import { FavoriteService } from './favorite.service';
import { UserModule } from 'src/user/user.module';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [PrismaModule, UserModule, MediaModule],
  providers: [
    FavoriteService,
    FavoriteRepository,
    UserRepository,
    MediaRepository,
  ],
})
export class FavoriteModule {}
