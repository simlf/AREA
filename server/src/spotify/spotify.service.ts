import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { UpdateSpotifyPlaylistDto } from './dto/updateSpotifyPlaylist.dto';

const playlistId = "5O9h0XRcKfR7vESMUsy4up";

const spotifyBaseUrl = `https://api.spotify.com/v1/`;
const headersRequest = {
    'Authorization': `Bearer ${process.env.SPOTIFY_API}`,
};

const spotifyPlaylistUrl = `${spotifyBaseUrl}playlists/`;

@Injectable()
export class SpotifyService {
        constructor(private readonly httpService: HttpService) {}

    async getUserPlaylist() {
        const url = `${spotifyPlaylistUrl}${playlistId}`;
        try {
            const result = await this.httpService.get(url, { headers: headersRequest });
            result.subscribe((response) => {

                console.log("response", response.data['id']);
            });
            return result.pipe(map((response) => response.data));
        } catch (error) {
            console.log("error", error);
        }
    }

    async updatePlaylist(playlistId: string, updateSpotifyPlaylistDto: UpdateSpotifyPlaylistDto) {
        const url = `${spotifyPlaylistUrl}${playlistId}`;

        try {
            const result = await this.httpService.put(url, JSON.stringify(updateSpotifyPlaylistDto), { headers: headersRequest });
            result.subscribe((response) => {
                console.log("response", response);
            });
            return result.pipe(map((response) => response.data));
        } catch (error) {
            console.log("error", error);
        }
    }
}

