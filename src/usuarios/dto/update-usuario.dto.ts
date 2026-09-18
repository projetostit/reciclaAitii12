import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUsuarioDto {
  @ApiPropertyOptional({ example: 'Danilo Marley' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  nome?: string;

  @ApiPropertyOptional({ example: 'usuario@email.com' })
  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  email?: string;

  @ApiPropertyOptional({
    description: 'Imagem do perfil em Data URL/Base64. String vazia remove a foto.',
  })
  @IsOptional()
  @IsString()
  foto?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  notificacoes?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  localizacao?: boolean;
}
