import { Module } from '@nestjs/common';
import { ArtistService } from '../../../domain/services/artist.service';
import { ArtistController } from '../controllers/artist.controller';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';
import { PrismaArtistRepository } from 'src/infrastructure/persistence/prisma/prisma-artist.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ArtistController],
  providers: [ArtistService, PrismaArtistRepository],
  exports: [ArtistService],
})
export class ArtistModule {}