import { LeagueTrigger } from "./league/league.trigger";
import { MeteoTrigger } from "./meteo/meteo.trigger";

// This class is used to trigger all the functions that need to be triggered
// It's called in the main.ts file
export class trigger {
    constructor(private readonly league: LeagueTrigger, private readonly meteo: MeteoTrigger) { }
    
    // This function is just here to centralize all the functions that need to be triggered
    async leagueLevelUp() {
        this.league.levelUp();
    }
    async temperatureAtDate() {
        this.meteo.temperatureAtDate();
    }
}