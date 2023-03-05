import { ModuleRef, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { async } from 'rxjs';
import { WorkflowService } from './workflow/workflows.service';
import { Repository } from 'typeorm';
import { WorkflowEntity } from './workflow/workflows.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { trigger } from './app.trigger';
import { LeagueTrigger } from './league/league.trigger';
import { LeagueService } from './league/league.service';
import { MeteoTrigger } from './meteo/meteo.trigger';
import { MeteoService } from './meteo/meteo.service';
import { NasaTrigger } from './nasa/nasa.trigger';
import { NasaService } from './nasa/nasa.service';
import { GithubTrigger } from './github/github.trigger';
import { GithubService } from './github/github.service';
import { HttpService } from '@nestjs/axios';

// TODO: Make secret private with .env
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('AREA API Documentation')
    .setDescription('The AREA API description')
    .setVersion('1.0')
    .addTag('area')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.use(
    session({
      secret: 'asiodasjoddjdoasddasoidjasiodasdjaiodd',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 900000, // 15 minutes
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors();
  const moduleRef = app.get<ModuleRef>(ModuleRef);
  const workflowService = await moduleRef.get<WorkflowService>(WorkflowService);
  workflowService.loop()
  await app.listen(8080);
  //const triggerList = new trigger(new LeagueTrigger(new LeagueService(new HttpService())),new MeteoTrigger(new MeteoService(new HttpService())),new NasaTrigger(new NasaService(new HttpService())),new GithubTrigger(new GithubService(new HttpService())));
//  triggerList.leagueLevelUp();
//  triggerList.leagueWinRate();
//  triggerList.leagueRankOne();
//  triggerList.temperatureAtDate();
//  triggerList.imageOfTheDay();
//  triggerList.githubUserInfo();
//  triggerList.githubRepoInfo();
}

bootstrap();
