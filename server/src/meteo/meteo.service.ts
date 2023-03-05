import { Injectable } from '@nestjs/common';
import { firstValueFrom, map, observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { datacatalog } from 'googleapis/build/src/apis/datacatalog';

// let base_url1 = 
let idealTemperature = 8;

@Injectable()
export class MeteoService {
    constructor(private readonly httpService: HttpService) {}

    async getTemperature() {
        var date = new Date();
        class return_value {
            longitude;
            latitude;
        }
        let tmp = date.toISOString().split("T");
        let tmpDate = tmp[0].split("-");
        let tmpTime = (date.getHours() + 1);
        let value = new return_value;
        let i = 0;
        const position = "https://geocoding-api.open-meteo.com/v1/search?name=Nantes&language=fr&count=1";
        try {
            const { data }  = await firstValueFrom(this.httpService.get(position))
            value.latitude = data.results[0].latitude;
            value.longitude = data.results[0].longitude;
        } catch (error) {
            return {"Error" : error.code, "Message" : error.message}
        }
        const urlTmp = `https://api.open-meteo.com/v1/meteofrance?latitude=${value.latitude}&longitude=${value.longitude}&hourly=temperature_2m&start_date=${tmpDate[0]}-${tmpDate[1]}-${tmpDate[2]}&end_date=${tmpDate[0]}-${tmpDate[1]}-${tmpDate[2]}&timezone=Europe%2FLondon`;
        try {
            const { data }  = await firstValueFrom(this.httpService.get(urlTmp))
            let checkBool = false;
            for (let i = 0; data.hourly.temperature_2m[i]; i++) {
             console.log(data.hourly.temperature_2m[i] + console.log(data.hourly))
                const myArray = data.hourly.time[i].split("T");
                const tmpTime2 = myArray[1].split(':');
                if (data.hourly.temperature_2m[i] >= idealTemperature  && data.hourly.temperature_2m[i] < idealTemperature + 1 && tmpTime2[0] <= tmpTime + 8 && tmpTime2[0] >= tmpTime && checkBool == false) {;
                    checkBool = true;
                };
            }
        } catch (error) {            
            return {"Error" : error.code, "Message" : error.message}
        }
        return return_value;
  }
}

