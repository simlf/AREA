import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entity/UserEntity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DiscordService {
    constructor(
        private readonly usersService: UsersService,
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    ){}
}
