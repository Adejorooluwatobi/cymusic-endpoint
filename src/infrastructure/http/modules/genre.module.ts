import { Module } from '@nestjs/common';
import { GenreController } from '../controllers/genre.controller';
import { GenreService } from '../../../domain/services/genre.service';
import { PrismaModule } from '../../persistence/prisma/prisma.module';
import { PrismaGenreRepository } from '../../persistence/prisma/prisma-genre.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
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