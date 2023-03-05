import { LeagueTrigger } from "./league/league.trigger";
import { MeteoTrigger } from "./meteo/meteo.trigger";
import { NasaTrigger } from "./nasa/nasa.trigger";
import { GithubTrigger} from "./github/github.trigger";

// This class is used to trigger all the functions that need to be triggered
// It's called in the main.ts file
export class trigger {
    constructor(private readonly league: LeagueTrigger, private readonly meteo: MeteoTrigger, private readonly nasa: NasaTrigger, private readonly github: GithubTrigger) { }
    
    // This function is just here to centralize all the functions that need to be triggered
    //async leagueLevelUp() {
    //    this.league.levelUp();
    //}
    //async leagueWinRate() {
    //    this.league.winRate();
    //}
    //async temperatureAtDate() {
    //    this.meteo.temperatureAtDate();
    //}
    //async imageOfTheDay() {
    //    this.nasa.ImageOfTheDay();
    //}
    //async leagueRankOne() {
    //    this.league.rankOne();
    //}
    //async githubUserInfo()  {
    //    this.github.userInfo();
    //}
    //async githubRepoInfo()  {
    //    this.github.repoInfo();
    //}
}