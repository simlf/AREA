import { Injectable } from '@nestjs/common';
import { firstValueFrom, map, observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { datacatalog } from 'googleapis/build/src/apis/datacatalog';
import { MeteoInfo } from './meteo.model';

// let base_url1 = 
let idealTemperature = 7;

@Injectable()
export class MeteoService {
    constructor(private readonly httpService: HttpService) {}

    async getTemperature(): Promise<MeteoInfo> {
        let returnValue: MeteoInfo = new MeteoInfo();
        var date = new Date();
    
        let longitude;
        let latitude;
        returnValue.idealTemperature = idealTemperature;
        let tmp = date.toISOString().split("T");
        let tmpDate = tmp[0].split("-");
        let tmpTime = (date.getHours() + 1)+":"+date.getMinutes()+":"+ date.getSeconds();
        const position = "https://geocoding-api.open-meteo.com/v1/search?name=Nantes&language=fr&count=1";
        try {
            const { data }  = await firstValueFrom(this.httpService.get(position))
            latitude = data.results[0].latitude;
            longitude = data.results[0].longitude;
        } catch (error) {
            console.error({"Error" : error.code, "Message" : error.message})
        }
        const urlTmp = `https://api.open-meteo.com/v1/meteofrance?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&start_date=${tmpDate[0]}-${tmpDate[1]}-${tmpDate[2]}&end_date=${tmpDate[0]}-${tmpDate[1]}-${tmpDate[2]}&timezone=Europe%2FLondon`;
        try {
            const { data }  = await firstValueFrom(this.httpService.get(urlTmp))
            let checkBool = false;
            for (let i = 0; data.hourly.temperature_2m[i]; i++) {
                const myArray = data.hourly.time[i].split("T");
                const tmpTime2 = myArray[1].split(':');
                if (data.hourly.temperature_2m[i] >= idealTemperature  && data.hourly.temperature_2m[i] < idealTemperature + 1 && tmpTime2[0] >= tmpTime[0] && checkBool == false) {
                    checkBool = true;
                    returnValue.time = myArray[1];
                }
            }
        } catch (error) {            
            console.error({"Error" : error.code, "Message" : error.message})
        }
        return returnValue;
  }
}

