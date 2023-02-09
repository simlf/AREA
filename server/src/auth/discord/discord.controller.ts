import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateDiscordDto } from './dto/discord.create.dto';
import { DiscordDto } from './dto/discord.dto';
import { AuthGuard } from '@nestjs/passport';
import { DiscordAuthGuard } from '../utils/Guards';
import passport from 'passport';

@Controller('api/discord')
export class DiscordController {
    constructor(private readonly discordService: DiscordService) {}

    @Get()
    @UseGuards(DiscordAuthGuard)
    login() {
        console.info("Login");
        passport.authenticate('discord', { scope: ['identify', 'email'] });
        return { msg: 'Login' };
    }

    @Get('redirect')
    @UseGuards(DiscordAuthGuard)
    redirect() {
        return { msg: 'Redirect' };
    }
}
