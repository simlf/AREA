// import { Controller, Get } from '@nestjs/common';
import { Body, Controller, Get, Param, Put, Query, Request, Redirect } from '@nestjs/common';
import { RedditService } from './reddit.service';
import { HttpService } from '@nestjs/axios';

let scopeTmp = ['identity', 'edit', 'flair', 'history', 'modconfig', 'modflair', 'modlog', 'modposts', 'modwiki', 'mysubreddits', 'privatemessages', 'read', 'report', 'save', 'submit', 'subscribe', 'vote', 'wikiedit', 'wikiread'] 

@Controller('reddit')
export class RedditController {

    constructor(private redditService: RedditService, private httpService: HttpService) {}

    @Get('')
    getRoutes() {
        return {routes : ["/imageOfTheDay"]}
    }

    @Get('oauth')
    @Redirect(`https://www.reddit.com/api/v1/authorize?client_id=UIV4zzlxbYCBkxHZmWqpSw&response_type=code&state=randomestringhere&redirect_uri=${encodeURIComponent('http://localhost:8080/reddit/oauth/callback')}&duration=permanent&scope=${scopeTmp}`, 301)
    getOauth() {
        // console.log("hello world");
        //return this.spotifyService.getUserPlaylist();
    }

    @Get('oauth/callback')
    getCallback(@Query('code') code :string, @Request() req) {
        console.log('code : ' + code)
        console.log("hello world");
        return this.redditService.callback(code)
        // return 'connected';
    }

    @Get('oauth/refresh')
    getRefresh() {
        return this.redditService.refresh()
    }

    @Get('subscribe')
    subscribeReddit() {
        // console.log(encodeURIComponent("https://www.reddit.com/api/v1/authorize?client_id=&response_type=code&state=randomestringhere&redirect_uri=http://localhost:8081/reddit&duration=permanent&scope=identity edit flair history read vote wikiread wikiedit"));
        return this.redditService.subscribe()
    }

    @Get('unsubscribe')
    unsubscribeReddit() {
        // console.log(encodeURIComponent("https://www.reddit.com/api/v1/authorize?client_id=&response_type=code&state=randomestringhere&redirect_uri=http://localhost:8081/reddit&duration=permanent&scope=identity edit flair history read vote wikiread wikiedit"));
        return this.redditService.unsubscribe()
    }
    
    @Get('newSubreddit')
    newSubreddit() {
        // console.log(encodeURIComponent("https://www.reddit.com/api/v1/authorize?client_id=&response_type=code&state=randomestringhere&redirect_uri=http://localhost:8081/reddit&duration=permanent&scope=identity edit flair history read vote wikiread wikiedit"));
        return this.redditService.newSubreddit();
    }

    @Get('mySubreddit')
    mySubreddit() {
        // console.log(encodeURIComponent("https://www.reddit.com/api/v1/authorize?client_id=&response_type=code&state=randomestringhere&redirect_uri=http://localhost:8081/reddit&duration=permanent&scope=identity edit flair history read vote wikiread wikiedit"));
        return this.redditService.mySubreddit();
    }
}