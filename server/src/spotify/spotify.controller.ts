import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { HttpService } from '@nestjs/axios';
import { UpdateSpotifyPlaylistDto } from './dto/updateSpotifyPlaylist.dto';

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

    @Put('users/playlist/:playlistId')
    udpateUserPlaylist(@Param('playlistId') playlistId: string, @Body() updateSpotifyPlaylistDto: UpdateSpotifyPlaylistDto) {
        return this.spotifyService.updatePlaylist(playlistId, updateSpotifyPlaylistDto);
    }
}
