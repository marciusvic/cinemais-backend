import {
  Body,
  Controller,
  Get,
  Injectable,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from 'lib/decorators/public.decorator';
import { RegisterDto } from './dto/register.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDoc } from './doc/register.doc';
import { LoginDoc, LoginResponseDoc } from './doc/login.doc';

@Injectable()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Endpoint para login de usuário',
    description:
      'Realiza o login do usuário e retorna o token de autenticação.',
  })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso.',
    type: LoginResponseDoc,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas.',
  })
  @ApiBody({
    description: 'Formato esperado para o login',
    type: LoginDoc,
  })
  login(@Request() req, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @Public()
  @ApiOperation({
    summary: 'Endpoint para registro de usuário',
    description: 'Cria um novo usuário no sistema.',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro ao criar usuário. Tente com outro email.',
  })
  @ApiBody({
    description: 'Formato esperado para o registro',
    type: RegisterDoc,
  })
  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
}
