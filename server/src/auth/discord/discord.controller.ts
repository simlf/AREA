import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateDiscordDto } from './dto/discord.create.dto';
import { DiscordDto } from './dto/discord.dto';
import { AuthGuard } from '@nestjs/passport';
import { DiscordAuthGuard } from '../utils/Guards';
import passport from 'passport';

@Controller('discord')
export class DiscordController {
    constructor(private readonly discordService: DiscordService) {}

    @Get('login')
    @UseGuards(DiscordAuthGuard)
    login() {
        passport.authenticate('discord', { scope: ['identify', 'email'] });
        console.log("Login");
        return { msg: 'Login' };
    }

    @Get('redirect')
    @UseGuards(DiscordAuthGuard)
    redirect() {
        // This is a dummy function, the actual redirect happens in the DiscordAuthGuard
        console.log(this.discordService.getDiscordAuth)
        return { msg: 'Redirect' };
    }

    @Get()
    // @UseGuards(AuthGuard())
    async status(@Req() req: any): Promise<DiscordDto> {
        const user = <UserDto>req.user;
        return await this.discordService.getDiscordAuth(user);
    }
}
