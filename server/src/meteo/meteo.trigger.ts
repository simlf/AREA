import { MeteoController } from "./meteo.controller";
import { MeteoService } from "./meteo.service";
import { MeteoInfo } from "./meteo.model";

// This class is used to trigger all the functions that need to be triggered for Meteo
export class MeteoTrigger {
    constructor(private readonly meteoService: MeteoService) {};

    private time = ""
    private idealTemperature = 0;
    // This function is called every 10ms to check if the time for the ideal temperature has changed
    // If it has changed, it will log it in the console
    // If it's the first time the function is called, it will set the time and idealTemperature to the actual time and idealTemperature
    // This function is called in the app.trigger.ts file
    async temperatureAtDate() {
        //SetInterval is used to call the function every 10ms
        setInterval(async () => {
            const meteoInfo: MeteoInfo = await this.meteoService.getTemperature();   
            if (this.time === "") {
                this.time = meteoInfo.time;
                this.idealTemperature = meteoInfo.idealTemperature;
                console.log("Ideal temperature of " + this.idealTemperature + " will be at " + this.time);
            } else if (this.time != meteoInfo.time) {
                this.time = meteoInfo.time;
                this.idealTemperature = meteoInfo.idealTemperature;
                console.log("The hour has changed !");
                console.log("Ideal temperature of " + this.idealTemperature + " will be at " + this.time);
            }
        }, 10000);
    }
}