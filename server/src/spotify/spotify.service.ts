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
    'Authorization': 'Bearer BQC6mejQVHf966PH6Au7WpWuJ04DQgoaxTPwDCvkmzR7fx6XuHpnCajOcgeq5MyJJRp9gWnqndnWRZS3N_ylUS8LhzyTe4BsCu9g2G7T8y1pxnHykiEG',
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

    async getUser(id: string) {
        console.log("req id", id);

        try {
            const url = `https://api.spotify.com/v1/me`;
            const result = await this.httpService.get(url, { headers: headersRequest });
            const userIdName = await firstValueFrom(result.pipe(map((response) => response.data['id'])));
            await this.usersService.updateSpotifyUserId(id, userIdName);
            return { userIdName };
        } catch (error) {
            console.log("error", error);
        }
    }

    async getUserPlaylist(id: string) {
        const url = `${spotifyBaseUrl}me/playlists`;
        try {
            const userSpotifyId = await this.usersService.getUserEntityById(id);
            console.log("user spotifyuserid", userSpotifyId.spotifyUserId);
            const result = await this.httpService.get(url, { headers: headersRequest });
            await result.subscribe((response) => {
              response.data['items'].map((item) => {
                if (item['owner']['id'] == userSpotifyId.spotifyUserId) {
                  console.log("Playlist:\n", "Name:", item['name'], "Description:", item['description'], "Id:", item['id'], "Public:", item['public'], "Collaborative:", item['collaborative']);
                }
              });
            });
            // Return each items in the array
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

    // async callback(code : string, email : string) {
    async callback(code : string, email : string) {
        try {
          console.log(`Code is ${code}`)
          if (code == null) {
              return "Invalid callback code"
          }
          var qs = require('qs');
          var data = qs.stringify({
            // 'redirect_uri': 'http://localhost:8080/spotify/oauth/callback/',
            'redirect_uri': 'http://localhost:8080/spotify/oauth/callback/',
            'grant_type': 'client_credentials',
            // 'grant_type': 'authorization_code',
            'code': code
          });
          var config = {
            headers: {
              // 'Authorization': `Basic ${process.env.SPOTIFY_BASE64}`,
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
            // 'Authorization': `Basic ${process.env.SPOTIFY_BASE64}`,
            'Authorization': 'Basic ${process.env.SPOTIFY_APP_TOKEN}',
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

