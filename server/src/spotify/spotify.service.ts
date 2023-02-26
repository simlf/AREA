import { Injectable, Req } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { UpdateSpotifyPlaylistDto } from './dto/updateSpotifyPlaylist.dto';
import { UsersService } from 'src/users/users.service';

const playlistId = "5O9h0XRcKfR7vESMUsy4up";

const spotifyBaseUrl = `https://api.spotify.com/v1/`;
const headersRequest = {
    'Authorization': `Bearer ${process.env.SPOTIFY_API}`,
};

const spotifyPlaylistUrl = `${spotifyBaseUrl}playlists/`;
@Injectable()
export class SpotifyService {
        constructor(
            private readonly httpService: HttpService,
            private readonly usersService: UsersService,
        ) {}

    async getUser(email: string) {
        console.log("req email", email);

        try {
            const url = `https://api.spotify.com/v1/me`;
            const result = await this.httpService.get(url, { headers: headersRequest });
            const userIdName = await firstValueFrom(result.pipe(map((response) => response.data['id'])));
            await this.usersService.updateSpotifyUserId(email, userIdName);
            return { userIdName };
        } catch (error) {
            console.log("error", error);
        }
    }

    async getUserPlaylist() {
        console.log("spotifyPlaylistUrl", spotifyPlaylistUrl);
        const url = `${spotifyBaseUrl}me/playlists`;
        try {
            const result = await this.httpService.get(url, { headers: headersRequest });
            result.subscribe((response) => {

                console.log("response", response.data['id']);
                console.log("response", response.data['name']);
                console.log("response", response.data['public']);
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

