import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { UserModule } from './user/user.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [AuthModule, MediaModule, UserModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
