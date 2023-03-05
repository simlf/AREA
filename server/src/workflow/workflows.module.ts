import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowEntity } from './workflows.entity';
import { UserEntity } from '../users/entity/UserEntity';
import { UsersModule } from 'src/users/users.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { WorkflowController } from './workflows.controller';
import { WorkflowService } from './workflows.service';
import { LeagueAction } from 'src/automation/entities/leagueEntities';
import { LeagueService } from 'src/league/league.service';
import { GithubAction } from 'src/automation/entities/githubEntities';
import { GithubService } from 'src/github/github.service';
import { MeteoService } from 'src/meteo/meteo.service';
import { WeatherAction } from 'src/automation/entities/weatherEntities';
import { NasaAction } from 'src/automation/entities/nasaEntities';
import { NasaService } from 'src/nasa/nasa.service';
import { SpotifyAction } from 'src/automation/entities/spotifyEntities';
import { SpotifyService } from 'src/spotify/spotify.service';


@Module({
    imports: [
        UsersModule,
        HttpModule,
        TypeOrmModule.forFeature([WorkflowEntity, LeagueAction, GithubAction, WeatherAction, NasaAction, SpotifyAction]),
    ],
    controllers: [
        WorkflowController
    ],
    providers: [
        WorkflowService,
        LeagueService,
        GithubService,
        MeteoService,
        NasaService,
        SpotifyService
    ],
    exports: [WorkflowService, LeagueService, GithubService, MeteoService, NasaService, SpotifyService],
})
export class WorkflowModule {}
