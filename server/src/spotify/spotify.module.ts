import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { SpotifyService } from './spotify.service';
import { SpotifyController } from './spotify.controller';

@Module({
    imports: [
        HttpModule,
    ],
    controllers: [
        SpotifyController
    ],
    providers: [
        SpotifyService,
    ],
})
export class SpotifyModule {}
