import { Injectable } from '@nestjs/common';
import { firstValueFrom, map, observable, Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { datacatalog } from 'googleapis/build/src/apis/datacatalog';
import { response } from 'express';
import { stringify } from 'querystring';
import { Any } from 'typeorm';

let scopeTmp = ['identity', 'edit', 'flair', 'history', 'modconfig', 'modflair', 'modlog', 'modposts', 'modwiki', 'mysubreddits', 'privatemessages', 'read', 'report', 'save', 'submit', 'subscribe', 'vote', 'wikiedit', 'wikiread'] 
let base_url1 = `https://www.reddit.com/api/v1/authorize?client_id=UIV4zzlxbYCBkxHZmWqpSw&response_type=TYPE&state=RANDOM_STRING&redirect_uri=http://localhost:8081/reddit&duration=permanent&scope=${scopeTmp}`

const headersRequest = {
    Authorization: `Bearer 13019661919274-ziL8slEUBl3TrlCcRED8g6_MqDtUCQ`,
};

@Injectable()
export class RedditService {
    constructor(private readonly httpService: HttpService) {}

    async newSubreddit() {
        const url = `https://oauth.reddit.com/subreddits/new`;
        let result: any;
        try {
            const { data } = await firstValueFrom(this.httpService.get(url, {headers: headersRequest}));
            return (data.data.children[0].data.display_name);
        } catch (error) {
            console.log("error", error);
        }
    }

    async mySubreddit() {
        const url = `https://oauth.reddit.com/subreddits/mine/subscriber`;
        let result: any;
        try {
            const { data } = await firstValueFrom(this.httpService.get(url, {headers: headersRequest}));
            let getSubreddit = '';
            let boolean = false;
            for (let i = 0; data.data.children[i]; i++) {
                let split = data.data.children[i].data.url.split('/');
                if (split[1] === 'r' && boolean === false) {
                    getSubreddit = data.data.children[i].data.display_name
                    boolean = true;
                }
            }
            return (getSubreddit);
        } catch (error) {
            console.log("error", error);
        }
    }

    async subscribe() {
        let tmp =  await this.newSubreddit();
        console.log(tmp);
        const url = `https://oauth.reddit.com/api/subscribe`;
        try {
            const result = await this.httpService.post(url,
            {
                action: 'sub',
                sr_name: `${tmp}`,
                api_type: 'json',
            },
            {
                headers: {
                    Authorization: `Bearer 13019661919274-ziL8slEUBl3TrlCcRED8g6_MqDtUCQ`,
                    'Content-Type': 'application/x-www-form-urlencoded', 
                }
            });
            result.subscribe((response) => {
                console.log("response", response.data.sr_fullname);
            });
            return result.pipe(map((response) => response.data));
        } catch (error) {
            console.log("error", error);
        }
    }

    async unsubscribe() {
        let tmp =  await this.mySubreddit();
        console.log(tmp);
        const url = `https://oauth.reddit.com/api/subscribe`;
        try {
            const result = await this.httpService.post(url,
            {
                action: 'unsub',
                sr_name: `${tmp}`,
                api_type: 'json',
            },
            {
                headers: {
                    Authorization: `Bearer 13019661919274-ziL8slEUBl3TrlCcRED8g6_MqDtUCQ`,
                    'Content-Type': 'application/x-www-form-urlencoded', 
                }
            });
            result.subscribe((response) => {
                console.log("response", response.data.sr_fullname);
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
          redirect_uri: 'http://localhost:8080/reddit/oauth/callback',
          grant_type: 'authorization_code',
          code: code
        });
        let tmp = 'UIV4zzlxbYCBkxHZmWqpSw:I_oGFsqS-j_E_e3G05dZxKu-D8QW-Q';
        let autHeader = `Basic ${Buffer.from(tmp).toString('base64')}`;
        var config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://www.reddit.com/api/v1/access_token',
          data : data,
          headers: {
            Authorization: autHeader, 
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'app/1.0.0'
          },
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
        let tmp = 'UIV4zzlxbYCBkxHZmWqpSw:I_oGFsqS-j_E_e3G05dZxKu-D8QW-Q';
        let autHeader = `Basic ${Buffer.from(tmp).toString('base64')}`;
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify({
          'grant_type': 'refresh_token',
          'refresh_token': refresh
        });
        var config = {
          method: 'post',
        maxBodyLength: Infinity,
          url: 'https://www.reddit.com/api/v1/access_token',
          headers: {
            Authorization: autHeader,
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
}
