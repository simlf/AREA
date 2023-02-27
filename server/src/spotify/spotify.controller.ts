import { Body, Controller, Get, Param, Put, Query, Request, Redirect } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { HttpService } from '@nestjs/axios';
import { UpdateSpotifyPlaylistDto } from './dto/updateSpotifyPlaylist.dto';
import { callbackify } from 'util';

@Controller('spotify')
export class SpotifyController {
    constructor(private spotifyService: SpotifyService, private httpService: HttpService) {}

    @Get('')
    getRoutes() {
        return {routes : ["/imageOfTheDay"]}
    }

    @Get('users/playlist')
    getUserPlaylist() {
        return this.spotifyService.getUserPlaylist();
    }

    @Get('oauth')
    @Redirect('https://accounts.spotify.com/authorize?client_id=dca433dbe8a14a68a84a5508e850831c&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fspotify%2Foauth%2Fcallback%2F&response_type=code&scope='+encodeURIComponent('ugc-image-upload user-read-playback-state app-remote-control user-modify-playback-state playlist-read-private user-follow-modify playlist-read-collaborative user-follow-read user-read-currently-playing user-read-playback-position user-library-modify playlist-modify-private playlist-modify-public user-read-email user-top-read streaming user-read-recently-played user-read-private user-library-read'), 301)
    getOauth() {        
        //return this.spotifyService.getUserPlaylist();
    }

    @Get('oauth/callback')
    getCallback(@Query('code') code :string, @Request() req) {
        console.log('code : ' + code)
        return this.spotifyService.callback(code)
        return 'connected';
    }

    @Get('oauth/refresh')
    getRefresh() {
        return this.spotifyService.refresh()
    }

    @Put('users/playlist/:playlistId')
    udpateUserPlaylist(@Param('playlistId') playlistId: string, @Body() updateSpotifyPlaylistDto: UpdateSpotifyPlaylistDto) {
        return this.spotifyService.updatePlaylist(playlistId, updateSpotifyPlaylistDto);
    }
}



/*
BQAUIGmzZJKM0mcUVM5nQSj1mNR6U4NKDM20lYHl_Y4NAouYFl45mW_rHz1SfOkSomb7vJZo1Q-qTqLyc8_XgY_o-uASMSNoINeTHl0Yh_a8uBmDtzzHiTsLJJRomzY7fzayoOEFhjBVgfysETKP_DrLoytThJh0b9SfRJmD516LbauRVN944Oy6XwZ7xqHXXYSD
*/