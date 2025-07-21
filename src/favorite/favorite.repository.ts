import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class FavoriteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addFavorite({ userId, mediaId }) {
    if (!userId || !mediaId) {
      throw new Error('User ID and Media ID are required');
    }
    return this.prisma.favorite.create({
      data: {
        userId,
        mediaId,
      },
    });
  }

  async findMany(params: {
    where?: Prisma.FavoriteWhereInput;
    include?: Prisma.FavoriteInclude;
  }) {
    const { where, include } = params;
    return this.prisma.favorite.findMany({ where, include });
  }

  async findOne(where: Prisma.FavoriteWhereInput) {
    return this.prisma.favorite.findFirst({
      where,
    });
  }

  async delete(params: { where: Prisma.FavoriteWhereUniqueInput }) {
    const { where } = params;
    return this.prisma.favorite.delete({ where });
  }
}
