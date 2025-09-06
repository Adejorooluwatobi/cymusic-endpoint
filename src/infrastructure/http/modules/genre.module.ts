import { Module } from '@nestjs/common';
import { GenreController } from '../controllers/genre.controller';
import { GenreService } from '../../../domain/services/genre.service';
import { PrismaModule } from '../../persistence/prisma/prisma.module';
import { PrismaGenreRepository } from '../../persistence/prisma/prisma-genre.repository';

@Module({
  imports: [PrismaModule],
  controllers: [GenreController],
  providers: [
    GenreService,
    PrismaGenreRepository,
    {
      provide: 'IGenreRepository',
      useClass: PrismaGenreRepository,
    },
  ],
  exports: [GenreService],
})
export class GenreModule {}