import { Module } from '@nestjs/common';
import { AdminController } from '../controllers/admin.controller';
import { AdminService } from 'src/domain/services/admin.service';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';
import { PrismaAdminRepository } from 'src/infrastructure/persistence/prisma/prisma-admin.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [AdminService, PrismaAdminRepository],
  exports: [AdminService],
})
export class AdminModule {}