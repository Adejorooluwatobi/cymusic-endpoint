import { Module } from '@nestjs/common';
import { SuperAdminController } from '../controllers/super-admin.controller';
import { SuperAdminService } from 'src/domain/services/super-admin.service';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';
import { PrismaSuperAdminRepository } from 'src/infrastructure/persistence/prisma/prisma-super-admin.repository';

@Module({
  imports: [PrismaModule],
  controllers: [SuperAdminController],
  providers: [SuperAdminService, PrismaSuperAdminRepository],
  exports: [SuperAdminService],
})
export class SuperAdminModule {}