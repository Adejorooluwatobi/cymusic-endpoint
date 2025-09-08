import { Module } from '@nestjs/common';
import { FollowController } from '../controllers/follow.controller';
import { FollowService } from '../../../domain/services/follow.service';
import { PrismaModule } from '../../persistence/prisma/prisma.module';
import { PrismaFollowRepository } from '../../persistence/prisma/prisma-follow.repository';
import { PrismaArtistProfileRepository } from '../../persistence/prisma/prisma-artist-profile.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [FollowController],
  providers: [
    FollowService,
    PrismaFollowRepository,
    PrismaArtistProfileRepository,
    {
      provide: 'IFollowRepository',
      useClass: PrismaFollowRepository,
    },
    {
      provide: 'IArtistProfileRepository',
      useClass: PrismaArtistProfileRepository,
    },
  ],
  exports: [FollowService],
})
export class FollowModule {}