import { NasaController } from "./nasa.controller";
import { NasaService } from "./nasa.service";
import { NasaInfo } from "./nasa.model";

// This class is used to trigger all the functions that need to be triggered for Nasa
export class NasaTrigger {
    constructor(private readonly nasaService: NasaService) {};

    private date = "";
    private url = "";
    // This function is called every 10ms to check if the time for the ideal temperature has changed
    // If it has changed, it will log it in the console
    // If it's the first time the function is called, it will set the time and idealTemperature to the actual time and idealTemperature
    // This function is called in the app.trigger.ts file
    async ImageOfTheDay() {
        //SetInterval is used to call the function every 10ms
        setInterval(async () => {
            const nasaInfo: NasaInfo = await this.nasaService.getImageOfTheDay();   
            if (this.date === "") {
                this.date = nasaInfo.date;
                console.log("The date hasn't changed ! Checkout the image of the day !")
            } else if (this.date != nasaInfo.date) {
                this.date = nasaInfo.date;
                console.log("The date has changed ! Checkout the new image of the day !");
            }
            if (this.url === "") {
                this.url = nasaInfo.url;
                console.log("This is the actual url of the image of the day : " + this.url);
            } else if (this.url != nasaInfo.url) {
                this.url = nasaInfo.url;
                console.log("This is the new url of the image of the day : " + this.url);
            }
        }, 5000000);
    }
}