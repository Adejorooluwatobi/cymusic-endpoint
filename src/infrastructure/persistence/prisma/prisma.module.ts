import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUserRepository } from './prisma-user.repository';
import { PrismaAdminRepository } from './prisma-admin.repository';
import { PrismaArtistRepository } from './prisma-artist.repository';
import { PrismaSuperAdminRepository } from './prisma-super-admin.repository';
import { PrismaProfileRepository } from './prisma-profile.repository';

@Module({
  providers: [PrismaService, PrismaUserRepository, PrismaAdminRepository, PrismaArtistRepository, PrismaSuperAdminRepository, PrismaProfileRepository],
  exports: [PrismaService, PrismaUserRepository, PrismaAdminRepository, PrismaArtistRepository, PrismaSuperAdminRepository, PrismaProfileRepository],
})
export class PrismaModule {}