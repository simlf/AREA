import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService, AboutService, IntegrationService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/entity/UserEntity';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from './users/users.module';
import { DiscordAuthEntity } from './auth/entities/DiscordAuthEntity';
import { DiscordModule } from './auth/discord/discord.module';
import { GithubService } from './github/github.service';
import { GithubController } from './github/github.controller';
import { LeagueService } from './league/league.service';
import { LeagueController } from './league/league.controller';



dotenv.config();

@Module({
  imports: [
    AuthModule,
    UsersModule,
    HttpModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [UserEntity, DiscordAuthEntity],
      synchronize: true,
    }),
    DiscordModule,
  ],
  controllers: [
    AppController,
    GithubController,
    LeagueController,
  ],
  providers: [
    AppService,
    AboutService,
    GithubService,
    LeagueService,
    IntegrationService,
  ],
})
export class AppModule {}
