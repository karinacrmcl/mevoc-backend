import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entity/User';
import { UsersModule } from './users/users.module';

import { WordpackModule } from './wordpack/wordpack.module';
import { ListModule } from './list/list.module';
import { WordModule } from './word/word.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { Wordpack } from './entity/Wordpack';
import { Word } from './entity/Word';
import { List } from './entity/List';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'),
      exclude: ['/auth*', '/users*'],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      database: process.env.DB_NAME,
      entities: [User, Wordpack, Word, List],
      migrations: ['dist/migration/*.js'],
      cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
      },
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    WordpackModule,
    AuthModule,
    TokenModule,
    WordModule,
    ListModule,
  ],
  controllers: [AppController],
  providers: [AppService, User],
})
export class AppModule {}
