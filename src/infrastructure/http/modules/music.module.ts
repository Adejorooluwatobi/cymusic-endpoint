import { Module } from '@nestjs/common';
import { MusicController } from '../controllers/music.controller';
import { MusicService } from '../../../domain/services/music.service';
import { PrismaModule } from '../../persistence/prisma/prisma.module';
import { PrismaMusicRepository } from 'src/infrastructure/persistence/prisma/prisma-music.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [MusicController],
  providers: [MusicService, PrismaMusicRepository],
  exports: [MusicService],
})
export class MusicModule {}