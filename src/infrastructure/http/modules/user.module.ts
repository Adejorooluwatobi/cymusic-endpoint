import { Module } from '@nestjs/common';
import { UserService } from '../../../domain/services/user.service';
import { UserController } from '../controllers/user.controller';
import { PrismaModule } from 'src/infrastructure/persistence/prisma/prisma.module';
import { PrismaUserRepository } from 'src/infrastructure/persistence/prisma/prisma-user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, PrismaUserRepository],
  exports: [UserService],
})
export class UserModule {}