import path from 'path';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller.js';
import { AppResolver } from './app.resolver.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/index.js';
import { AppRepository } from './app.respository.js';
import { BoardModule } from './board/index.js';
import { TaskModule } from './task/index.js';
import { LoaderModule, LOADERS_FACTORY, Loaders } from './loader/index.js';
import config from './config.js';
import { useCSRFPrevention } from '@graphql-yoga/plugin-csrf-prevention';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/index.js';

@Module({
  imports: [
    GraphQLModule.forRootAsync<YogaDriverConfig<'fastify'>>({
      driver: YogaDriver<'fastify'>,
      useFactory: (createLoaders: () => Loaders) => {
        return {
          path: '/graphql',
          autoSchemaFile:
            process.env.NODE_ENV !== 'production'
              ? path.join(process.cwd(), 'src/schema.gql')
              : true,
          sortSchema: true,
          context: () => ({ loaders: createLoaders() }),
          cors: config.corsOptions,
          plugins: [useCSRFPrevention()],
        };
      },
      inject: [LOADERS_FACTORY],
      imports: [LoaderModule],
    }),
    DatabaseModule,
    BoardModule,
    TaskModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppRepository, AppService, AppResolver],
})
export class AppModule {}
