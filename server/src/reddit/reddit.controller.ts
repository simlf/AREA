import { Controller, Get } from '@nestjs/common';
import { RedditService } from './reddit.service';
import { HttpService } from '@nestjs/axios';

@Controller('nasa')
export class RedditController {
    constructor(private redditService: RedditService, private httpService: HttpService) {}

    @Get('')
    getRoutes() {
        return {routes : ["/imageOfTheDay"]}
    }

    @Get('imageOfTheDay')
    getLevel() {
        return this.redditService.getImageOfTheDay()
    }
}