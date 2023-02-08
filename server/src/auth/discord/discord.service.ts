import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/users/dto/user.dto';
import { toDiscordDto } from 'src/utils/mapper';
import { Repository } from 'typeorm';
import { DiscordAuthEntity } from 'src/auth/entities/DiscordAuthEntity';
import { UserEntity } from 'src/users/entity/UserEntity';
import { CreateDiscordDto } from './dto/discord.create.dto';
import { DiscordDto } from './dto/discord.dto';
import { UsersService } from 'src/users/users.service';
import { DiscordStrategy } from '../utils/DiscordStrategy';

@Injectable()
export class DiscordService {
    constructor(
        private readonly usersService: UsersService,
        @InjectRepository(DiscordAuthEntity) private readonly discordAuthRepo: Repository<DiscordAuthEntity>,
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    ){}

    async findOne(options?: object): Promise<DiscordDto> {
        const discordUser =  await this.discordAuthRepo.findOne(options);
        if (!discordUser)
            return null;
        return toDiscordDto(discordUser);
    }

    async createDiscordAuth(accessToken, refreshToken, discordId): Promise<DiscordDto> {
        console.log("create Discord Auth");

        let userId: string = "562e471c-7aef-4d7e-989a-cf0bd0ad75b6"

        let DiscordAuthEntity;
        const user = await this.userRepo.findOne({where: {id: userId}});

        DiscordAuthEntity = {accessToken, refreshToken, discordId, userId, user};
        user.discordAuth = DiscordAuthEntity;
        await this.discordAuthRepo.save(DiscordAuthEntity);

        return toDiscordDto(DiscordAuthEntity);
    }

    async getDiscordAuth({ email }: UserDto): Promise<DiscordDto> {
        const user = await this.usersService.findOne({ where: { email } });
        const discordAuth = await this.discordAuthRepo.findOne({ where: { user } });

        return toDiscordDto(discordAuth);
    }
}
