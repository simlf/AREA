import { Injectable } from '@nestjs/common';
import { firstValueFrom, map, observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { datacatalog } from 'googleapis/build/src/apis/datacatalog';

// let base_url1 = 
let idealTemperature = 7;

@Injectable()
export class MeteoService {
    constructor(private readonly httpService: HttpService) {}

    async getTemperature() {
        var date = new Date();
	    let current_time = (date.getHours() + 1)+":"+date.getMinutes()+":"+ date.getSeconds();
        class return_value {
            longitude;
            latitude;
        }
        let tmp = date.toISOString().split("T");
        let tmp_date = tmp[0].split("-");
        let tmp_time = (date.getHours() + 1)+":"+date.getMinutes()+":"+ date.getSeconds();
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
        const url_tmp = `https://api.open-meteo.com/v1/meteofrance?latitude=${value.latitude}&longitude=${value.longitude}&hourly=temperature_2m&start_date=${tmp_date[0]}-${tmp_date[1]}-${tmp_date[2]}&end_date=${tmp_date[0]}-${tmp_date[1]}-${tmp_date[2]}&timezone=Europe%2FLondon`;
        try {
            const { data }  = await firstValueFrom(this.httpService.get(url_tmp))
            let check_bool = false;
            for (let i = 0; data.hourly.temperature_2m[i]; i++) {
                const myArray = data.hourly.time[i].split("T");
                const tmp_time2 = myArray[1].split(':');
                if (data.hourly.temperature_2m[i] >= idealTemperature  && data.hourly.temperature_2m[i] < idealTemperature + 1 && tmp_time2[0] >= tmp_time[0] && check_bool == false) {
                    check_bool = true;
                    console.log(data.hourly.time[i]);
                    console.log(myArray[0]);
                    console.log(myArray[1]);
                    console.log(data.hourly.temperature_2m[i]);
                }
            }
        } catch (error) {            
            return {"Error" : error.code, "Message" : error.message}
        }
        return return_value;
  }
}

