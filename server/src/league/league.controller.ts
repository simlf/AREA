import { Controller, Get } from '@nestjs/common';
import { LeagueService } from './league.service';
import { HttpService } from '@nestjs/axios';

@Controller('league')
export class LeagueController {
    constructor(private leagueService: LeagueService, private httpService: HttpService) {}

    @Get('')
    getRoutes() {
        return {routes : ["/profile", "/matches", "/rankone", "/challenges", "/statistics", "/mastery"]}
    }

    @Get('profile')
    getLevel() {
        return this.leagueService.getLevel()
    }

    @Get('matches')
    GetMatches() {
        return this.leagueService.getMatches();
    }

    @Get('rankone')
    GetRankOne() {
        return this.leagueService.getRankOne();
    }

    @Get('challenges')
    GetLastChallenge() {
        return this.leagueService.getLastChallenge();
    }

    @Get('statistics')
    GetSeasonStatistics() {
        return this.leagueService.getSeasonStatistics()
    }

    @Get('mastery')
    GetChampionMastery() {
        return this.leagueService.getChampionMastery()
    }
}