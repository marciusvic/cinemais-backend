import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MediaRepository } from './media.repository';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { User } from '@prisma/client';
import { NotFoundError } from 'rxjs';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async create(createMediaDto: CreateMediaDto, userId: string) {
    return this.mediaRepository.create({ ...createMediaDto, userId });
  }

  async findAll(where = {}) {
    return this.mediaRepository.findMany({ where });
  }

  async findOne(id: string) {
    if (!id) {
      throw new BadRequestException('ID não fornecido');
    }
    const media = await this.mediaRepository.findOne(id);

    if (!media) {
      throw new NotFoundException('Serie ou filme não encontrado');
    }

    return media;
  }

  async update(id: string, updateMediaDto: UpdateMediaDto, userId: string) {
    const media = await this.mediaRepository.findOne(id);

    if (!media) {
      throw new NotFoundException('Serie ou filme não encontrado');
    }

    return this.mediaRepository.update({
      where: { id },
      data: updateMediaDto,
    });
  }

  async remove(id: string, userId: string) {
    const media = await this.mediaRepository.findOne(id);

    if (!media) {
      throw new NotFoundException('Serie ou filme não encontrado');
    }

    return this.mediaRepository.delete({
      where: { id },
    });
  }
}
