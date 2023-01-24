import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/user.create.dto';
import { LoginUserDto } from 'src/users/dto/user-login.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { UserEntity as UserEntity } from 'src/users/entity/UserEntity';
import { toUserDto } from 'src/utils/mapper';
import { comparePasswords } from 'src/utils/utils';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    ){}

    async findOne(options?: object): Promise<UserDto> {
       const user =  await this.userRepo.findOne(options);
        return toUserDto(user);
    }

    async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
        const user = await this.userRepo.findOne({ where: { username } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        // compare passwords
        const areEqual = await comparePasswords(user.password, password);

        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }

    async findByPayload({ username }: any): Promise<UserDto> {
        return await this.findOne({
            where:  { username } });
    }

    async create(userDto: CreateUserDto): Promise<UserDto> {
        const { username, password, email } = userDto;

        // check if the user exists in the db
        const userInDb = await this.userRepo.findOne({
            where: { username }
        });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user: UserEntity = await this.userRepo.create({ username, password, email, });
        await this.userRepo.save(user);
        return toUserDto(user);
    }
}
