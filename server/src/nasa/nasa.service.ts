import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { datacatalog } from 'googleapis/build/src/apis/datacatalog';

let base_url1 = "https://api.nasa.gov/planetary/apod?api_key="

@Injectable()
export class NasaService {
        constructor(private readonly httpService: HttpService) {}

    async getImageOfTheDay() {
        var return_value = { 
            "url"                   :  null,                  
        }
        console.log(base_url1);
        console.log(process.env.NASA_API);
        const url_tmp = `${base_url1}${process.env.NASA_API}`;
        try {
            const { data }  = await firstValueFrom(this.httpService.get(url_tmp))
            const level = data.date;
            console.log(data.url);
            return_value.url = data.url;
        } catch (error) {            
            return {"Error" : error.code, "Message" : error.message}
        }
        return return_value;
  }
}

