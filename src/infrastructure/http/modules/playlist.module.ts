import { Module } from '@nestjs/common';
import { PlaylistController } from '../controllers/playlist.controller';
import { PlaylistService } from '../../../domain/services/playlist.service';
import { PrismaModule } from '../../persistence/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService],
})
export class PlaylistModule {}