import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';
import { ArtistProfileController } from '../controllers/artist-profile.controller';
import { ArtistProfileService } from 'src/domain/services/artist-profile.service';
import { PrismaArtistProfileRepository } from 'src/infrastructure/persistence/prisma/prisma-artist-profile.repository';
// import { IArtistProfileRepository } from 'src/domain/repositories/artist-profile.repository.interface';

@Module({
  imports: [PrismaModule],
  controllers: [ArtistProfileController],
  providers: [
    ArtistProfileService,
    {
      provide: 'IArtistProfileRepository',
      useClass: PrismaArtistProfileRepository,
    },
  ],
  exports: [ArtistProfileService],
})
export class ArtistProfileModule {}
