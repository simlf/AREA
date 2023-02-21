import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { datacatalog } from 'googleapis/build/src/apis/datacatalog';

const playlistId = "5O9h0XRcKfR7vESMUsy4up";

const spotifyBaseUrl = `https://api.spotify.com/v1/`;
const spotifyGetPlaylist = `${spotifyBaseUrl}playlists/${playlistId}`;

@Injectable()
export class SpotifyService {
        constructor(private readonly httpService: HttpService) {}

    async getImageOfTheDay() {
        var return_value = {
            "url" :  null,
        }
        const url_tmp = `${spotifyGetPlaylist}`;
        try {
            const { data }  = await firstValueFrom(this.httpService.get(url_tmp))
            const level = data.date;
            return_value.url = data.url;
        } catch (error) {
            return {"Error" : error.code, "Message" : error.message}
        }
        return return_value;
  }
}

