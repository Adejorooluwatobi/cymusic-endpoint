import { Module } from '@nestjs/common';
import { MusicController } from '../controllers/music.controller';
import { MusicService } from '../../../domain/services/music.service';
import { PrismaModule } from '../../persistence/prisma/prisma.module';
import { FileUploadService } from '../../../shared/services/file-upload.service';
import { PrismaMusicRepository } from 'src/infrastructure/persistence/prisma/prisma-music.repository';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [PrismaModule, AuthModule,
    MulterModule.register({
      dest: './uploads', // Use your existing upload folder here
    }),
  ],
  controllers: [MusicController],
  providers: [
    MusicService,
    PrismaMusicRepository,
    FileUploadService,
    {
      provide: 'IMusicRepository',
      useClass: PrismaMusicRepository,
    },
  ],
  exports: [MusicService],
})
export class MusicModule {}