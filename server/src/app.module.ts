import { Module } from '@nestjs/common';
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
import { MeteoService } from './meteo/meteo.service';
import { MeteoController } from './meteo/meteo.controller';
import { SpotifyModule } from './spotify/spotify.module';
import { RedditController } from './reddit/reddit.controller';
import { RedditService } from './reddit/reddit.service';
import { WorkflowModule } from './workflow/workflows.module';
import { WorkflowEntity } from './workflow/workflows.entity';

dotenv.config();

@Module({
  imports: [
    AuthModule,
    UsersModule,
    WorkflowModule,
    HttpModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [UserEntity, WorkflowEntity],
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
<<<<<<< HEAD
    RedditController,
=======
    MeteoController,
>>>>>>> main
  ],
  providers: [
    AppService,
    AboutService,
    GithubService,
    LeagueService,
    IntegrationService,
    NasaService,
<<<<<<< HEAD
    RedditService,
=======
    MeteoService,
>>>>>>> main
  ],
})

export class AppModule {}
