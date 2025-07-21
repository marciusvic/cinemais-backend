import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RegisterDto } from '../dto/register.dto';

export class RegisterDoc implements RegisterDto {
  @ApiProperty({ example: 'user@cinemais.com' })
  email: string;

  @ApiPropertyOptional({ example: 'João da Silva' })
  name?: string;

  @ApiProperty({ example: 'user123' })
  password: string;
}
