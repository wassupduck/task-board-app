import path from 'path';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller.js';
import { AppResolver } from './app.resolver.js';
import { AppService } from './app.service.js';
import { DatabaseModule } from './database/database.module.js';
import { AppRepository } from './app.respository.js';
import { BoardModule } from './board/board.module.js';

@Module({
  imports: [
    GraphQLModule.forRoot<YogaDriverConfig<'fastify'>>({
      driver: YogaDriver<'fastify'>,
      path: '/graphql',
      autoSchemaFile:
        process.env.NODE_ENV !== 'production'
          ? path.join(process.cwd(), 'src/schema.gql')
          : true,
      sortSchema: true,
    }),
    DatabaseModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppRepository, AppService, AppResolver],
})
export class AppModule {}
