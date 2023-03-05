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
    @Redirect(`https://www.reddit.com/api/v1/authorize?client_id=${process.env.REDDIT_ID}&response_type=code&state=randomestringhere&redirect_uri=${encodeURIComponent('http://localhost:8080/reddit/oauth/callback')}&duration=permanent&scope=${scopeTmp}`, 301)
    getOauth() {
        // console.log("hello world");
        //return this.spotifyService.getUserPlaylist();
    }

    @Get('oauth/callback')
    getCallback(@Query('code') code :string, @Request() req) {
        console.log('code : ' + code)
        console.log("hello world");
        return this.redditService.callback(code)
    }

    @Get('oauth/refresh')
    getRefresh() {
        return this.redditService.refresh()
    }

    @Get('subscribe')
    subscribeReddit() {
        return this.redditService.subscribe()
    }

    @Get('unsubscribe')
    unsubscribeReddit() {
        return this.redditService.unsubscribe()
    }
    
    @Get('newSubreddit')
    newSubreddit() {
        return this.redditService.newSubreddit();
    }

    @Get('mySubreddit')
    mySubreddit() {
        return this.redditService.mySubreddit();
    }

    // @Get('sendComment')
    // sendComment() {
    //     return this.redditService.sendComment();
    // }
}