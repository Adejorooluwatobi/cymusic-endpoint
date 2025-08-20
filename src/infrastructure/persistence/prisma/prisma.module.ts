import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUserRepository } from './prisma-user.repository';
import { PrismaAdminRepository } from './prisma-admin.repository';
import { PrismaArtistRepository } from './prisma-artist.repository';
import { PrismaSuperAdminRepository } from './prisma-super-admin.repository';

@Module({
  providers: [PrismaService, PrismaUserRepository, PrismaAdminRepository, PrismaArtistRepository, PrismaSuperAdminRepository],
  exports: [PrismaService, PrismaUserRepository, PrismaAdminRepository, PrismaArtistRepository, PrismaSuperAdminRepository],
})
export class PrismaModule {}