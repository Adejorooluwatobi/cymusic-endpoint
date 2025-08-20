import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './application/use-cases/app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infrastructure/persistence/prisma/prisma.module';
import { FilesModule } from './shared/files/files.module'
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './infrastructure/http/auth/auth.module';
import { AppGateway } from './shared/websockets/app.gateway';
import { AppResolver } from './application/graphql/app.resolver';

import { LoggingMiddleware } from './shared/middleware/logging.middleware';

@Module({
  imports: [
    FilesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: false,
    }),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './prisma/schema.prisma',
      sortSchema: true,
      playground: true,
      debug: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway, AppResolver],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}