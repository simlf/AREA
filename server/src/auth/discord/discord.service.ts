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
        private readonly discordStrategy: DiscordStrategy,
        @InjectRepository(DiscordAuthEntity) private readonly discordAuthRepo: Repository<DiscordAuthEntity>,
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    ){}

    // async validate(): Promise<any> {
    //     // await this.discordStrategy.validate();
    // }
    // async validateUser(discordId: string): Promise<any> {
    //     const user = await.this.userService
    // }

    async findOne(options?: object): Promise<DiscordDto> {
       const discordUser =  await this.discordAuthRepo.findOne(options);
        return toDiscordDto(discordUser);
    }

    async createDiscordAuth(createDiscordDto: CreateDiscordDto): Promise<DiscordDto> {
        const { accessToken, refreshToken, discordId } = createDiscordDto;

        let discordUser = await this.findOne({ where: { discordId } });
        const user = await this.userRepo.find(
            {relations: ['discordAuth']}
        );
        discordUser.user = user;
        console.log(user);
        return toDiscordDto(discordUser);

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
