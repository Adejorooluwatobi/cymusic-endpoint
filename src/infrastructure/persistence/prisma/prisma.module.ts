import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUserRepository } from './prisma-user.repository';
import { PrismaAdminRepository } from './prisma-admin.repository';
import { PrismaArtistRepository } from './prisma-artist.repository';
import { PrismaSuperAdminRepository } from './prisma-super-admin.repository';
import { PrismaProfileRepository } from './prisma-profile.repository';
import { PrismaAlbumRepository } from './prisma-album.repository';
import { PrismaMusicRepository } from './prisma-music.repository';
import { PrismaArtistProfileRepository } from './prisma-artist-profile.repository';

@Module({
  providers: [
    PrismaService,
    PrismaUserRepository,
    PrismaAdminRepository,
    PrismaArtistRepository,
    PrismaSuperAdminRepository,
    PrismaProfileRepository,
    PrismaAlbumRepository,
    PrismaMusicRepository,
    PrismaArtistProfileRepository,
  ],
  exports: [
    PrismaService,
    PrismaUserRepository,
    PrismaAdminRepository,
    PrismaArtistRepository,
    PrismaSuperAdminRepository,
    PrismaProfileRepository,
    PrismaAlbumRepository,
    PrismaMusicRepository,
    PrismaArtistProfileRepository,
  ],
})
export class PrismaModule {}