import { LeagueTrigger } from "./league/league.trigger";

// This class is used to trigger all the functions that need to be triggered
// It's called in the main.ts file
export class trigger {
    constructor(private readonly league: LeagueTrigger) { }
    
    // This function is just here to centralize all the functions that need to be triggered
    async leagueLevelUp() {
        this.league.levelUp();
        setInterval(() => {
            this.league.userLevel++;
        }, 500);
    }
}