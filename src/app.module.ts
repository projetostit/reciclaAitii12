import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { DatabaseModule } from './database/database.module.js';
import { UsuariosModule } from './usuarios/usuarios.module.js';
import { QrcodesModule } from './qrcodes/qrcodes.module.js';
import { HistoricoModule } from './historico/historico.module.js';
import { PontosModule } from './pontos/pontos.module.js';
import { EcopontosModule } from './ecopontos/ecopontos.module.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const frontendPath = join(__dirname, '..', 'public');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ServeStaticModule.forRoot({
      rootPath: frontendPath,
    }),

    DatabaseModule,
    UsuariosModule,
    QrcodesModule,
    HistoricoModule,
    PontosModule,
    EcopontosModule,
  ],
})
export class AppModule {}