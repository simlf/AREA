import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';

const playlistId = "5O9h0XRcKfR7vESMUsy4up";

const spotifyBaseUrl = `https://api.spotify.com/v1/`;
const spotifyGetPlaylist = `${spotifyBaseUrl}playlists/${playlistId}`;
const headersRequest = {
    'Authorization': `Bearer ${process.env.SPOTIFY_API}`,
};

@Injectable()
export class SpotifyService {
        constructor(private readonly httpService: HttpService) {}

    async getUserPlaylist() {
        try {
            const result = await this.httpService.get(spotifyGetPlaylist, { headers: headersRequest });
            result.subscribe((response) => {
                console.log("response", response);
            });
            return result.pipe(map((response) => response.data));
        } catch (error) {
            console.log("error", error);
        }
  }
}

