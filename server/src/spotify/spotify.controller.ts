import { Controller, Get } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { HttpService } from '@nestjs/axios';

@Controller('spotify')
export class SpotifyController {
    constructor(private spotifyService: SpotifyService, private httpService: HttpService) {}

    @Get('')
    getRoutes() {
        return {routes : ["/imageOfTheDay"]}
    }

    @Get('imageOfTheDay')
    getLevel() {
        return this.spotifyService.getImageOfTheDay()
    }
}
