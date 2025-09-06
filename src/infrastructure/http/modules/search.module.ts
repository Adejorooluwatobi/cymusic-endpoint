import { Module } from '@nestjs/common';
import { SearchController } from '../controllers/search.controller';
import { SearchService } from '../../../domain/services/search.service';
import { PrismaModule } from '../../persistence/prisma/prisma.module';
import { PrismaMusicRepository } from '../../persistence/prisma/prisma-music.repository';

@Module({
  imports: [PrismaModule],
  controllers: [SearchController],
  providers: [
    SearchService,
    PrismaMusicRepository,
    {
      provide: 'IMusicRepository',
      useClass: PrismaMusicRepository,
    },
  ],
  exports: [SearchService],
})
export class SearchModule {}