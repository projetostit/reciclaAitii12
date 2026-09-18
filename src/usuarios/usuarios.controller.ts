import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { LoginUsuarioDto } from './dto/login-usuario.dto.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { UsuariosService } from './usuarios.service.js';

type RequestComUsuario = Request & {
  user: {
    sub: number;
    email: string;
  };
};

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('cadastro')
  @ApiOperation({ summary: 'Cadastrar usuário' })
  cadastrar(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.cadastrar(createUsuarioDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Fazer login' })
  login(@Body() loginUsuarioDto: LoginUsuarioDto) {
    return this.usuariosService.login(loginUsuarioDto);
  }

  @Get('jwt-check')
jwtCheck() {
  return {
    jwtConfigurado: Boolean(process.env.JWT_SECRET),
  };
}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar perfil do usuário logado' })
  buscarPerfil(@Req() request: RequestComUsuario) {
    return this.usuariosService.buscarPerfil(request.user.sub);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar perfil do usuário logado' })
  atualizarPerfil(
    @Req() request: RequestComUsuario,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.atualizarPerfil(
      request.user.sub,
      updateUsuarioDto,
    );
  }
}
