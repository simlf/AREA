import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { datacatalog } from 'googleapis/build/src/apis/datacatalog';
import { NasaInfo } from './nasa.model';

let base_url1 = "https://api.nasa.gov/planetary/apod?api_key="

@Injectable()
export class NasaService {
        constructor(private readonly httpService: HttpService) {}

    async getImageOfTheDay(): Promise<NasaInfo> {
        let returnValue = new NasaInfo();
        const url_tmp = `${base_url1}${process.env.NASA_API}`;
        try {
            const { data }  = await firstValueFrom(this.httpService.get(url_tmp))
            returnValue.date = data.date;
            returnValue.url = data.url;
        } catch (error) {            
            console.error({"Error" : error.code, "Message" : error.message})
        }
        return returnValue;
  }
}

