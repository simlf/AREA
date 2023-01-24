import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { UserDto } from 'src/users/dto/user.dto';
import { CreateDiscordDto } from './dto/discord.create.dto';
import { DiscordDto } from './dto/discord.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('discord')
export class DiscordController {
    constructor(private readonly discordService: DiscordService) {}

    @Post()
    @UseGuards(AuthGuard())
    async create(@Body() createDiscordDto: CreateDiscordDto, @Req() req: any): Promise<DiscordDto> {
        const user = <UserDto>req.user;
        return await this.discordService.createDiscordAuth(user, createDiscordDto);
    }

    @Get()
    @UseGuards(AuthGuard())
    async status(@Req() req: any): Promise<DiscordDto> {
        const user = <UserDto>req.user;
        return await this.discordService.getDiscordAuth(user);
    }
}
