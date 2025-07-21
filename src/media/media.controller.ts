import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { User } from '@prisma/client';
import { UpdateMediaDto } from './dto/update-media.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MediaDoc } from './doc/media.doc';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @ApiOperation({
    summary: 'Endpoint para criar mídia',
    description: 'Cria uma nova mídia',
  })
  @ApiResponse({
    status: 201,
    description: 'Mídia criada com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao criar mídia. Verifique os dados fornecidos.',
  })
  @ApiBody({
    description: 'Formato esperado para criar mídia',
    type: MediaDoc,
  })
  create(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Endpoint para ver as mídias',
    description: 'Retorna todas as mídias do usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de mídias retornada com sucesso.',
  })
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Endpoint para ver uma mídia',
    description: 'Retorna uma mídia pelo id',
  })
  @ApiResponse({
    status: 200,
    description: 'Mídia encontrada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Mídia não encontrada.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID não fornecido.',
  })
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint para atualizar uma mídia',
    description: 'Atualiza uma mídia pelo id',
  })
  @ApiResponse({
    status: 200,
    description: 'Mídia atualizada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Mídia não encontrada.',
  })
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(id, updateMediaDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint para remover uma mídia',
    description: 'Remove uma mídia pelo id',
  })
  @ApiResponse({
    status: 200,
    description: 'Mídia removida com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Mídia não encontrada.',
  })
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}
