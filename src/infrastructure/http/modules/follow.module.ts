import { Module } from '@nestjs/common';
import { FollowController } from '../controllers/follow.controller';
import { FollowService } from '../../../domain/services/follow.service';
import { PrismaModule } from '../../persistence/prisma/prisma.module';
import { PrismaFollowRepository } from '../../persistence/prisma/prisma-follow.repository';

@Module({
  imports: [PrismaModule],
  controllers: [FollowController],
  providers: [
    FollowService,
    PrismaFollowRepository,
    {
      provide: 'IFollowRepository',
      useClass: PrismaFollowRepository,
    },
  ],
  exports: [FollowService],
})
export class FollowModule {}