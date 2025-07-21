import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { PrismaModule } from 'nestjs-prisma';
import { FavoriteService } from 'src/favorite/favorite.service';
import { FavoriteRepository } from 'src/favorite/favorite.repository';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [PrismaModule, MediaModule],
  providers: [UserService, UserRepository, FavoriteService, FavoriteRepository],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UserModule {}
