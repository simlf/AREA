import { Injectable, Req, Request } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { firstValueFrom, map, lastValueFrom } from 'rxjs';
import axios from 'axios';
import { UpdateSpotifyPlaylistDto } from './dto/updateSpotifyPlaylist.dto';
import { UsersService } from 'src/users/users.service';

const playlistId = "5O9h0XRcKfR7vESMUsy4up";

const spotifyBaseUrl = `https://api.spotify.com/v1/`;
const headersRequest = {
    'Authorization': `Bearer BQAP9Zyj-duSiyz_OuIutb7vXKz3rJy3AdoaN0JrnZo0QAr_sCYSgZqPCKoOVM0Lwr0R0Nc1qLTUyZpJRk-ejcnfzogbLa6migeJjDUJyxsL9PDtfFbdVl-YA8sQN3DHHzuo1nhYHd6nYdkUC6i2yUk7e5JT64oQ2VDmRvpM85T4BHEUBqSqLi-2cVCUZQBLnAIMRegEa6g03PnR3ThFbxirOFL45QJ0hXw-h_WkRYc9eTReooHi6XFfHljT0jWwwjQbHVxAVxCcm-xvG8XAFn60yw0OJWE1TWIuuhT-bUj2d1fZfh5ruPk2NA`,
    // 'Authorization': `Bearer BQBqurN_t98cVCpIvQZKrLLFNduD3VGrahahb68NNdkmqygO6wvWMVL7YLU7MoILfRYRumNYB5xXHJW-9oI3UCTzk0xIF7i4QzAskMBbm4ScOjvRXRUaJU--XzBt-AgLk9EZXTR7Yjb0e7PO_gy6xECWY1tRJkeVhk9VyTx0S9ZuXdYbUPM`,
    // 'Authorization': `Bearer ${process.env.SPOTIFY_API}`,
};

const spotifyPlaylistUrl = `${spotifyBaseUrl}playlists/`;

let refresh = "";
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

    async getUserPlaylist(email: string) {

        // const url = `${spotifyPlaylistUrl}${playlistId}`;
        const url = `${spotifyBaseUrl}me/playlists`;

        try {
            const userSpotifyId = await this.usersService.findByPayload(email);
            console.log("user", userSpotifyId);
            // console.log("userSpotifyId", userSpotifyId.spotifyUserId);

            const result = await this.httpService.get(url, { headers: headersRequest });
            result.subscribe((response) => {
              // console.log("response", response.data['items']);

              response.data['items'].forEach(item => {
                console.log("Name:", item['name']);
                console.log("Description:", item['description']);
                console.log("Id:", item['id']);
                console.log("public:", item['public']);
                console.log("public:", item['owner']['id']);
              });
              // Loop trough the items

                // console.log("response", response.data['id']);
                // console.log("response", response.data['name']);
                // console.log("response", response.data['public']);
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

    async callback(code : string, email : string) {
        try {
          console.log(`Code is ${code}`)
          if (code == null) {
              return "Invalid callback code"
          }
          var qs = require('qs');
          var data = qs.stringify({
            'redirect_uri': 'http://localhost:8080/spotify/oauth/callback/',
            'grant_type': 'authorization_code',
            'code': code
          });
          var config = {
            headers: {
              'Authorization': `Basic ${process.env.SPOTIFY_APP_TOKEN}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            data : data
          };
          const url = 'https://accounts.spotify.com/api/token';
          const result = await this.httpService.post(url, data, config);
          console.log("result", result);
          const accessToken = await firstValueFrom(result.pipe(map((response) => response.data['access_token'])));
          console.log("accessToken", accessToken);
          await this.usersService.updateSpotifyAccessToken(email, accessToken);
        }
        catch (error) {
          console.log("error", error);
        }
    }

    async refresh(refresh : string = null) {
        if (refresh == null) {
            return "Invalid callback code"
        }
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
          'grant_type': 'refresh_token',
          'refresh_token': refresh
        });
        var config = {
          method: 'post',
        maxBodyLength: Infinity,
          url: 'https://accounts.spotify.com/api/token',
          headers: {
            'Authorization': `Basic ${process.env.SPOTIFY_APP_TOKEN}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data : data
        };
        axios(config)
        .then(function (response) {
          console.log("stringyfy refresh", JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }

