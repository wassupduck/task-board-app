import path from 'path';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

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
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
