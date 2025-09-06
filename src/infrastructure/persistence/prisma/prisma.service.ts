import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: any) {
    process.on('beforeExit', async () => {
      try {
        await app.close();
      } catch (error) {
        console.error('Error during application shutdown:', error);
      }
    });
  }
}