import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entity/UserEntity';
import { UsersService } from 'src/users/users.service';
import { IDiscordService } from '../interfaces/discord';
import { IDiscordHttpService } from '../interfaces/discord-http';

@Injectable()
export class DiscordService implements IDiscordService {
    constructor(
        @Inject('DISCORD_HTTP_SERVICE') private readonly discordHttpService: IDiscordHttpService,
    ) {}

    getBotGuilds() {
        return this.discordHttpService.fetchBotGuilds();
    }

    getUserGuilds() {
        return this.discordHttpService.fetchUserGuilds();
    }

    getMutualGuilds() {
        return this.getBotGuilds();
    }
}
