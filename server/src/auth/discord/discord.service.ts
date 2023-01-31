import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/users/dto/user.dto';
import { toDiscordDto } from 'src/utils/mapper';
import { Repository } from 'typeorm';
import { DiscordAuthEntity } from 'src/auth/entities/DiscordAuthEntity';
import { CreateDiscordDto } from './dto/discord.create.dto';
import { DiscordDto } from './dto/discord.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DiscordService {
    constructor(
        private readonly usersService: UsersService,
        @InjectRepository(DiscordAuthEntity) private readonly discordAuthRepo: Repository<DiscordAuthEntity>,
    ){}

    async createDiscordAuth({ username }: UserDto, createDiscordDto: CreateDiscordDto): Promise<DiscordDto> {
        const { accessToken, refreshToken, discordId } = createDiscordDto;
        const user = await this.usersService.findOne({ where: { username } });
        const discordAuth: DiscordAuthEntity = await this.discordAuthRepo.create({ accessToken, refreshToken, discordId, user });

        await this.discordAuthRepo.save(discordAuth);
        return toDiscordDto(discordAuth);

    }

    async getDiscordAuth({ username }: UserDto): Promise<DiscordDto> {
        const user = await this.usersService.findOne({ where: { username } });
        const discordAuth = await this.discordAuthRepo.findOne({ where: { user } });

        return toDiscordDto(discordAuth);
    }
}
