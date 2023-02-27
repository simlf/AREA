import { Injectable,  } from '@nestjs/common';
import { firstValueFrom, map, lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { UpdateSpotifyPlaylistDto } from './dto/updateSpotifyPlaylist.dto';
import { Request } from '@nestjs/common';
import axios from 'axios';

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
                console.log("response", response);
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

    async callback(code : string = null) {
        console.log(`Code is ${code}`)
        if (code == null) {
            return "Invalid callback code"
        }
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
          'redirect_uri': 'http://localhost:8080/spotify/oauth/callback/',
          'grant_type': 'authorization_code',
          'code': code 
        });
        var config = {
          method: 'post',
        maxBodyLength: Infinity,
          url: 'https://accounts.spotify.com/api/token',
          headers: { 
            'Authorization': 'Basic ZGNhNDMzZGJlOGExNGE2OGE4NGE1NTA4ZTg1MDgzMWM6YzBkOWYzYzRiODU0NGZmNGJkMDhjYTE2MmUwMWI0OGE', 
            'Content-Type': 'application/x-www-form-urlencoded', 
          },
          data : data
        };
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
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
            'Authorization': 'Basic ZGNhNDMzZGJlOGExNGE2OGE4NGE1NTA4ZTg1MDgzMWM6YzBkOWYzYzRiODU0NGZmNGJkMDhjYTE2MmUwMWI0OGE', 
            'Content-Type': 'application/x-www-form-urlencoded', 
          },
          data : data
        };
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });}   
    }

    