import { Body, Controller, Get, Param, Put, Req, UseGuards, Query, Request, Redirect } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { HttpService } from '@nestjs/axios';
import { UpdateSpotifyPlaylistDto } from './dto/updateSpotifyPlaylist.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { callbackify } from 'util';

@ApiBearerAuth()
@Controller('spotify')
export class SpotifyController {
    constructor(private spotifyService: SpotifyService, private httpService: HttpService, private readonly authService: AuthService) {}

    @Get('')
    getRoutes() {
        return {routes : ["/users/playlists", "/users/playlist/:playlistId"]}
    }

    @Get('user')
    @UseGuards(AuthGuard())
    public async getUser(@Req() req: any) {
        return this.spotifyService.getUser(req.user.email);
    }

    @Get('user/playlist')
    @UseGuards(AuthGuard())
    getUserPlaylist(@Req() req: any) {
        return this.spotifyService.getUserPlaylist(req.user.email);
    }

    @Get('oauth')
    @UseGuards(AuthGuard())
    @Redirect('https://accounts.spotify.com/authorize?client_id=dca433dbe8a14a68a84a5508e850831c&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fspotify%2Foauth%2Fcallback%2F&response_type=code', 301)
    getOauth() {
        console.log('getOauth');
        //return this.spotifyService.getUserPlaylist();
    }

    @Get('oauth/callback')
    @UseGuards(AuthGuard())
    getCallback(@Query('code') code :string, @Req() req: any) {
        console.log('req.user : ', req.user);
        console.log('code : ' + code);
        return this.spotifyService.callback(code, req.user.email);
        return 'connected';
    }

    @Get('oauth/refresh')
    getRefresh() {
        return this.spotifyService.refresh()
    }

    @Put('user/playlist/:playlistId')
    udpateUserPlaylist(@Param('playlistId') playlistId: string, @Body() updateSpotifyPlaylistDto: UpdateSpotifyPlaylistDto) {
        return this.spotifyService.updatePlaylist(playlistId, updateSpotifyPlaylistDto);
    }
}



/*
BQAUIGmzZJKM0mcUVM5nQSj1mNR6U4NKDM20lYHl_Y4NAouYFl45mW_rHz1SfOkSomb7vJZo1Q-qTqLyc8_XgY_o-uASMSNoINeTHl0Yh_a8uBmDtzzHiTsLJJRomzY7fzayoOEFhjBVgfysETKP_DrLoytThJh0b9SfRJmD516LbauRVN944Oy6XwZ7xqHXXYSD
*/
