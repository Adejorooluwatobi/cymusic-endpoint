import { Module } from '@nestjs/common';
import { AlbumController } from '../controllers/album.controller';
import { AlbumService } from '../../../domain/services/album.service';
import { PrismaModule } from '../../persistence/prisma/prisma.module';
import { PrismaAlbumRepository } from 'src/infrastructure/persistence/prisma/prisma-album.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AlbumController],
  providers: [AlbumService, PrismaAlbumRepository],
  exports: [AlbumService],
})
export class AlbumModule {}