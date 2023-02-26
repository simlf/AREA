import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { datacatalog } from 'googleapis/build/src/apis/datacatalog';

let base_url1 = "https://www.reddit.com/api/v1/authorize?client_id=UIV4zzlxbYCBkxHZmWqpSw&response_type=TYPE&state=RANDOM_STRING&redirect_uri=http://localhost:8081/reddit&duration=permanent&scope=SCOPE_STRING"

@Injectable()
export class RedditService {
        constructor(private readonly httpService: HttpService) {}

    async getImageOfTheDay() {
        var return_value = { 
            "url" :  null,                  
        }
        const url_tmp = `${base_url1}`;
        try {
            const { data }  = await firstValueFrom(this.httpService.get(url_tmp))
            console.log(data);
        } catch (error) {            
            return {"Error" : error.code, "Message" : error.message}
        }
        return return_value;
  }
}

