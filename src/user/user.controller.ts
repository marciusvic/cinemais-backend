import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FavoriteService } from 'src/favorite/favorite.service';
import { CreateFavoriteDto } from 'src/favorite/dto/create-favorite.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FavoriteDoc } from 'src/favorite/doc/favorite.doc';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private favoriteService: FavoriteService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Endpoint para criar usuário',
    description: 'Cria um usuário',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Endpoint para ver os usuários',
    description: 'Retorna todos os usuários',
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Endpoint para ver um usuário',
    description: 'Retorna um usuário pelo id',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(
      { id },
      {
        id: true,
        name: true,
        email: true,
      },
    );
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint para atualizar um usuário',
    description: 'Atualiza um usuário pelo id',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint para deletar um usuário',
    description: 'Deleta um usuário pelo id',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post(':userId/favorites')
  @ApiOperation({
    summary: 'Endpoint para adicionar mídia aos favoritos',
    description: 'Adiciona uma mídia aos favoritos para o usuário',
  })
  @ApiResponse({
    status: 201,
    description: 'Mídia adicionada aos favoritos com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Essa mídia já está nos favoritos.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário ou mídia não encontrado.',
  })
  @ApiBody({
    description: 'Formato esperado para adicionar mídia aos favoritos',
    type: FavoriteDoc,
  })
  addFavorite(
    @Param('userId') userId: string,
    @Body() createFavoriteDto: CreateFavoriteDto,
  ) {
    return this.favoriteService.addFavorite(userId, createFavoriteDto);
  }

  @Get(':userId/favorites')
  @ApiOperation({
    summary: 'Endpoint para ver os favoritos de um usuário',
    description: 'Retorna as mídias favoritas de um usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de mídias favoritas do usuário.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
  })
  getUserFavorites(@Param('userId') userId: string) {
    return this.favoriteService.getUserFavorites(userId);
  }

  @Delete(':userId/favorites/:mediaId')
  @ApiOperation({
    summary: 'Endpoint para remover mídia dos favoritos',
    description: 'Remove uma mídia dos favoritos do usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Mídia removida dos favoritos com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário ou mídia não encontrado.',
  })
  removeFavorite(
    @Param('userId') userId: string,
    @Param('mediaId') mediaId: string,
  ) {
    return this.favoriteService.removeFavorite(userId, mediaId);
  }
}
