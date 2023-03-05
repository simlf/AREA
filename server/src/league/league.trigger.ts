import { LeagueController } from "./league.controller";
import { LeagueService } from "./league.service";
import { LeagueUser } from "./League.model";

// This class is used to trigger all the functions that need to be triggered for League of Legends
export class LeagueTrigger {
    constructor(private readonly leagueService: LeagueService) {};

    private userLevel = -1;
    private userWinRate = -1;
    private userLosses = -1;
    private userWins = -1;
    private topPlayerUsername = "";
    private totalLeaguePoints = -1;

    // This function is called every 10ms to check if the user level has changed
    // If it has changed, it will log it in the console
    // If it's the first time the function is called, it will set the userLevel to the actual level
    // This function is called in the app.trigger.ts file
    async levelUp(userId: string = "CrossBiwBoyExoPa") {
        //SetInterval is used to call the function every 10ms
        setInterval(async () => {
            const user: LeagueUser = await this.leagueService.getLevel(userId);
            if (this.userLevel === -1) {
                this.userLevel = user.level;
                console.log("Set level to actual level : " + this.userLevel);
            } else if (this.userLevel < user.level) {
                this.userLevel = user.level;
                console.log("Level up! : " + this.userLevel);
            }
        }, 5000000);
    }
    async winRate(userId: string = "CrossBiwBoyExoPa") {
        //SetInterval is used to call the function every 10ms
        setInterval(async () => {
            const user: LeagueUser = await this.leagueService.getMatches(userId);
            if (this.userWinRate === -1) {
                this.userWinRate = user.winrate;
                console.log("Set winrate to actual winrate : " + this.userWinRate);
            } else if (this.userWinRate < user.winrate) {
                this.userWinRate = user.winrate;
                console.log("Winrate changed! : " + this.userWinRate);
            }
            if (this.userLosses === -1) {
                this.userLosses = user.total_losses;
                console.log("Set total losses to actual total losses : " + this.userLosses);
            } else if (this.userLosses < user.total_losses) {
                this.userLosses = user.total_losses;
                console.log("Total losses changed! : " + this.userLosses);
            }
            if (this.userWins === -1) {
                this.userWins = user.total_wins;
                console.log("Set total wins to actual total wins : " + this.userWins);
            } else if (this.userWins < user.total_wins) {
                this.userWins = user.total_wins;
                console.log("Total wins changed! : " + this.userWins);
            }
        }, 5000000);
    }
    async rankOne(userId: string = "CrossBiwBoyExoPa") {
        //SetInterval is used to call the function every 10ms
        setInterval(async () => {
            const user: LeagueUser = await this.leagueService.getRankOne(userId);
            if (this.totalLeaguePoints === -1) {
                this.totalLeaguePoints = user.total_league_points;
                console.log("Set total league points to actual total league points : " + this.totalLeaguePoints);
            } else if (this.totalLeaguePoints < user.total_league_points) {
                this.totalLeaguePoints = user.total_league_points;
                console.log("Total league points has changed! : " + this.totalLeaguePoints);
            }
            if (this.topPlayerUsername === "") {
                this.topPlayerUsername = user.top_player_username;
                console.log("Set top player username to actual top player username : " + this.topPlayerUsername);
            } else if (this.topPlayerUsername != user.top_player_username) {
                this.topPlayerUsername = user.top_player_username;
                console.log("Top player isn't the same anymore! : " + this.topPlayerUsername);
            }
        }, 5000000);
    }
}