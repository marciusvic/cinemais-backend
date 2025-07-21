import { ApiProperty } from '@nestjs/swagger';
import { LoginDto, LoginResponse } from '../dto/login.dto';

export class LoginDoc extends LoginDto {
  @ApiProperty({ example: 'user@cinemais.com' })
  declare email: string;

  @ApiProperty({ example: 'user123' })
  declare password: string;
}

export class LoginResponseDoc extends LoginResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Token de acesso gerado após o login',
  })
  declare access_token: string;

  @ApiProperty({
    description: 'Informações do usuário autenticado',
    type: () => UserResponseDoc,
  })
  declare user: {
    id: string;
    name: string;
    email: string;
  };
}

export class UserResponseDoc {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID único do usuário',
  })
  id: string;

  @ApiProperty({ example: 'Cinemais User', description: 'Nome do usuário' })
  name: string;

  @ApiProperty({
    example: 'user@cinemais.com',
    description: 'Email do usuário',
  })
  email: string;
}
