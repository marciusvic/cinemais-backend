import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class MediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ title, description, type, releaseYear, genre }) {
    if (!title || !description || !type || !releaseYear || !genre) {
      throw new Error('All fields are required');
    }

    return this.prisma.media.create({
      data: {
        title,
        description,
        type,
        releaseYear,
        genre,
      },
    });
  }

  async findMany(params: { where?: Prisma.MediaWhereInput }) {
    const { where } = params;
    return this.prisma.media.findMany({ where });
  }

  async findOne(id: string) {
    return this.prisma.media.findFirst({
      where: {
        id,
      },
    });
  }

  async update(params: {
    where: Prisma.MediaWhereUniqueInput;
    data: Prisma.MediaUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.media.update({
      where,
      data,
    });
  }

  async delete(params: { where: Prisma.MediaWhereUniqueInput }) {
    const { where } = params;
    return this.prisma.media.delete({ where });
  }
}
