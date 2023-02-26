import { Body, Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { HttpService } from '@nestjs/axios';
import { UpdateSpotifyPlaylistDto } from './dto/updateSpotifyPlaylist.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';

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
    getUserPlaylist() {
        return this.spotifyService.getUserPlaylist();
    }

    @Put('user/playlist/:playlistId')
    udpateUserPlaylist(@Param('playlistId') playlistId: string, @Body() updateSpotifyPlaylistDto: UpdateSpotifyPlaylistDto) {
        return this.spotifyService.updatePlaylist(playlistId, updateSpotifyPlaylistDto);
    }
}
