import { Module } from '@nestjs/common';
import { SuperAdminController } from '../controllers/super-admin.controller';
import { SuperAdminService } from 'src/domain/services/super-admin.service';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SuperAdminController],
  providers: [SuperAdminService],
  exports: [SuperAdminService],
})
export class SuperAdminModule {}