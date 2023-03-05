import { Controller, Get, Headers, Query, Redirect, Req } from '@nestjs/common';
import { LinearService } from './linear.service'
import { HttpService } from '@nestjs/axios';
//import { LinearClient, LinearFetch, User } from "@linear/sdk" 
import { callbackify } from 'util';
import { Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MyAuthGuard } from 'src/auth/utils/auth.middleware'
//import { DiscordAuthGuard, JwtAuthGuard } from 'src/auth/utils/Guards';
import { UsersService } from 'src/users/users.service';
import { find } from 'rxjs';
import { UserEntity } from 'src/users/entity/UserEntity';
import { ExtractJwt } from 'passport-jwt';
import { decode } from 'punycode';

@Controller('linear')
export class LinearController {
    constructor(private linearService: LinearService,
                private httpService: HttpService,
                private readonly userService: UsersService) {}

    @UseGuards(AuthGuard())
    @Post('auth/login')
    async login(@Request() req) {
      return req.user;
    }
  
    //@UseGuards(AuthGuard())
    @Get('oauth') 
    @Redirect("https://linear.app/oauth/authorize?response_type=code&client_id=a54c3e124f5b80f45772aedc8bb5994e&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flinear%2Foauth%2Fcallback&scope=read,write", 301)
    async oauth(@Request() req) {
        console.log(req.user);
        return ("user")
    }

    //@UseGuards(AuthGuard())
    @Get('oauth/callback')
    async  getCallback(@Query('code') code :string, @Request() req) {
    const token = req.headers.authorization.split(' ')[1]
    //Jwt

    //usr.linearToken = 'valeur';
    
    return await this.linearService.callback(code);    
    }
    
    @Get('test')
    getTest() {
        return this.linearService.getTest();
    }



}


// https://api.linear.app/oauth/token?client_id=a54c3e124f5b80f45772aedc8bb5994e&redirect_uri=http://localhost:8080/linear/redirect&client_secret=9ddd759d3c23bda2bee4bc367b313b1a&