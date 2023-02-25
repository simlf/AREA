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
import { DiscordModule } from './discord/discord.module';
import { GithubService } from './github/github.service';
import { GithubController } from './github/github.controller';
import { LeagueService } from './league/league.service';
import { LeagueController } from './league/league.controller';
import { NasaService } from './nasa/nasa.service';
import { NasaController } from './nasa/nasa.controller';
import { SpotifyModule } from './spotify/spotify.module';
import { WorkflowController } from './workflow/workflows.controller';
import { WorkflowService } from './workflow/workflows.service';
import { workflowModule } from './workflow/workflows.module';
import { WorkflowAction } from './workflow/workflows.entity';

dotenv.config();

@Module({
  imports: [
    AuthModule,
    UsersModule,
    workflowModule,
    HttpModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [UserEntity, WorkflowAction],
      synchronize: true,
    }),
    DiscordModule,
    SpotifyModule,
  ],
  controllers: [
    AppController,
    GithubController,
    LeagueController,
    NasaController,
    WorkflowController,

  ],
  providers: [
    AppService,
    AboutService,
    GithubService,
    LeagueService,
    IntegrationService,
    NasaService,
    WorkflowService,

  ],
})
export class AppModule {}
