import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowEntity } from './workflows.entity';
import { UserEntity } from '../users/entity/UserEntity';
import { Uuid as v4 } from 'uuid';
import { LeagueAction } from 'src/automation/entities/leagueEntities';
import * as delay from 'delay';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LeagueService } from 'src/league/league.service';
import { GithubAction } from 'src/automation/entities/githubEntities';
import { GithubService } from 'src/github/github.service';
import { WeatherAction } from 'src/automation/entities/weatherEntities';
import { MeteoService } from 'src/meteo/meteo.service';
import { NasaAction } from 'src/automation/entities/nasaEntities';
import { NasaService } from 'src/nasa/nasa.service';
import { SpotifyAction } from 'src/automation/entities/spotifyEntities';
import { SpotifyService } from 'src/spotify/spotify.service';

@Injectable()
export class WorkflowService {
    constructor(
      @InjectRepository(WorkflowEntity) private readonly workflowActionRepository: Repository<WorkflowEntity>,
      @InjectRepository(LeagueAction) private readonly leagueAction :  Repository<LeagueAction>,
      @InjectRepository(GithubAction) private readonly githubAction :  Repository<GithubAction>,
      @InjectRepository(WeatherAction) private readonly weatherAction : Repository<WeatherAction>,
      @InjectRepository(NasaAction) private readonly nasaAction : Repository<NasaAction>,
      @InjectRepository(SpotifyAction) private readonly spotifyAction : Repository<SpotifyAction>,
      private readonly spotifyService : SpotifyService,
      private readonly nasaService : NasaService,
      private readonly meteoService : MeteoService, 
      private readonly githubService : GithubService, 
      private readonly httpService: HttpService,
      private readonly leagueService : LeagueService

    ) {}      
    async createWorkflowAction(
      actionName: string,
      reactionName: string,
      user: UserEntity,
      userId: string,
      workflowName: string,
      description: string,
      logo: string,

      reactionId: string,
      actionId: string,
      isActive: boolean,
      ): Promise<WorkflowEntity> {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      const workflowAction = new WorkflowEntity();
      workflowAction.actionName = actionName;
      workflowAction.actionId = actionId;
      workflowAction.reactionName = reactionName;
      workflowAction.reactionId = reactionId;
      workflowAction.user = user;
      workflowAction.userId = userId;
      workflowAction.workflowName = workflowName;
      workflowAction.description = description;
      workflowAction.logo = '../../assets/' + logo;
      workflowAction.img = '../../assets/' + randomNumber + '.png';
      workflowAction.url = '';
      workflowAction.active = isActive;
      const savedWorkflowAction = await this.workflowActionRepository.save(workflowAction);
      workflowAction.url = '/config-integration/' + savedWorkflowAction.id;  
      return this.workflowActionRepository.save(workflowAction);
    }
    
    async getWorkflowActionByUser(userId: string): Promise<WorkflowEntity[]> {
      return await this.workflowActionRepository.findBy({ userId });
    }
    async getAllWorkflowActions(): Promise<WorkflowEntity[]> {
      return this.workflowActionRepository.find();
    }

    async deleteWorkflowAction(id: number) {
      await this.workflowActionRepository.delete(id);
    }

    private async trigger(e : WorkflowEntity) {
      if (e.reactionName == 'spotify') {
        //const action = await this.spotifyAction.findOne({where : {id : e.actionId}})
        //this.spotifyService.updatePlaylist(action.playlistId, upda)
      }
    }

    async loop () {
      while (1) {
        const wfs  = await this.getAllWorkflowActions()
        wfs.forEach(async element => {
          if (element.actionName == 'league') {
            const action = await this.leagueAction.findOne({where : {id : element.actionId}})
            switch (action.actionEnum) {
              case 'penta' : {
                const penta = JSON.parse(JSON.stringify(await this.leagueService.getSeasonStatistics(action.username, 1))).pentakills
                if (penta > 1)
                  console.log('Trigger !')
                break;
                }
                case 'level' : {
                  const level = JSON.parse(JSON.stringify(await this.leagueService.getLevel(action.username))).level
                  if (level > action.currentLevel)
                    console.log('Trigger !!')
                  break;  
                }
                case 'mastery' : {
                  const mastery = JSON.parse(JSON.stringify(await this.leagueService.getChampionMastery(action.username))).level7_mastery
                  console.log('mastery')
                  console.log(action.mastery7)
                  if ( mastery > action.mastery7)
                    console.log('Trigger !!!!')
                  break;
                }
                case 'winrate' : {
                  const level = JSON.parse(JSON.stringify(await this.leagueService.getLevel(action.username))).level
                  if (level > action.currentLevel)
                    console.log('Trigger !!!!!')
                  break;
                }
                case 'rankone' : {
                  const rankone = JSON.parse(JSON.stringify(await this.leagueService.getRankOne(action.username))).top_player_username
                  if (rankone === action.username)
                    console.log('Trigger !!!!!!')
                  break;
                }
              }
          }
          if (element.actionName == 'github') {
            const action = await this.githubAction.findOne({where : {id : element.actionId}})
            switch (action.actionEnum) {
              case 'commits' : {
                const hire = JSON.parse(JSON.stringify(await this.githubService.userInfo(action.name))).hireable
                if (action.hireable != hire)
                  console.log('Trigger comm')
                break;  
                }
              case 'hireable' : {
                const commits = JSON.parse(JSON.stringify(await this.githubService.repoInfo(action.name)))
                if (commits > action.commitsNumber)
                  console.log('Trigger !')
                break;
              }
            }
          }
          if (element.actionName == 'weather') {
            const action = await this.weatherAction.findOne({where : {id : element.actionId}})
            if (await this.meteoService.getTemperature(action.temperature) != true)
              console.log('Trigger')
          }
          if (element.actionName == 'nasa') {
            const action = await this.nasaAction.findOne({where : {id : element.actionId}})
            if (action.date == JSON.parse(JSON.stringify(await this.nasaService.getImageOfTheDay())).date)
              console.log('Trigger')
          }

        });
        await delay(10000)
      }
  }  
    async getWorkflowActionById(id: string): Promise<WorkflowEntity | undefined> {
      return await this.workflowActionRepository.findOne({where: {id}});
    }
}
