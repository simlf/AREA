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
import { WorkflowModule } from './workflow/workflows.module';
import { WorkflowEntity } from './workflow/workflows.entity';
import { WorkflowService } from './workflow/workflows.service';
import { LeagueAction } from './automation/entities/leagueEntities';
import { GithubAction } from './automation/entities/githubEntities';
import { WeatherAction } from './automation/entities/weatherEntities';
import { NasaAction } from './automation/entities/nasaEntities';
import { SpotifyAction } from './automation/entities/spotifyEntities';
import { SpotifyService } from './spotify/spotify.service';
import { SpotifyController } from './spotify/spotify.controller';
import { AuthService } from './auth/auth.service';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkflowEntity, LeagueAction, GithubAction, WeatherAction, NasaAction, SpotifyAction]),
    AuthModule,
    UsersModule,
    HttpModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [UserEntity, WorkflowEntity, LeagueAction, GithubAction, WeatherAction, NasaAction, SpotifyAction],
      synchronize: true,
    }),
    DiscordModule,
    SpotifyModule,
    WorkflowModule,
  ],
  controllers: [
    AppController,
    GithubController,
    LeagueController,
    NasaController,
    MeteoController,
    SpotifyController
  ],
  providers: [
    AppService,
    AboutService,
    GithubService,
    LeagueService,
    WorkflowService,
    IntegrationService,
    NasaService,
    MeteoService,
    SpotifyService,
    AuthService 
  ],
})

export class AppModule {}
