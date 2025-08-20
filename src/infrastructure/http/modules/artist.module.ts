import { Module } from '@nestjs/common';
import { ArtistService } from '../../../domain/services/artist.service';
import { ArtistController } from '../controllers/artist.controller';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}