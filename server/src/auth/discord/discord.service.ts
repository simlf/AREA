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
        console.log("createDiscordAuth");
        let userId: string = "8e9d76f8-a51b-405d-a17f-b1f071ed35aa"
        let DiscordAuthEntity;
        const user = await this.userRepo.findOne({where: {id: userId}});
        DiscordAuthEntity = {accessToken, refreshToken, discordId, userId, user};
        user.discordAuth = DiscordAuthEntity;
        console.log("DiscordAuthEntity", DiscordAuthEntity);
        await this.discordAuthRepo.save(DiscordAuthEntity);
        return toDiscordDto(DiscordAuthEntity);


















        // const { accessToken, refreshToken, discordId } = createDiscordDto;

        // let discordUser = await this.findOne({ where: { discordId } });
        // console.log("Discord User", discordUser);

        // const user = await this.userRepo.find(
        //     {relations: ['discordAuth']}
        // );


        // if (discordUser)
        //     DiscordAuthEntity = {accessToken, refreshToken, discordId, user}

        // const user = await this.usersService.findOne({ where: { id } });
        // const discordAuth: DiscordAuthEntity = await this.discordAuthRepo.create({ accessToken, refreshToken, discordId, user });

        // await this.discordAuthRepo.save(discordAuth);
        // return toDiscordDto(discordAuth);

    }

    async getDiscordAuth({ username }: UserDto): Promise<DiscordDto> {
        const user = await this.usersService.findOne({ where: { username } });
        const discordAuth = await this.discordAuthRepo.findOne({ where: { user } });

        return toDiscordDto(discordAuth);
    }
}
