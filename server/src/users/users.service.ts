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
    constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,){}

    async findOne(options?: object): Promise<UserDto> {
       const user =  await this.userRepo.findOne(options);
        return toUserDto(user);
    }

    async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
        const user = await this.userRepo.findOne({ where: { email } });

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

    async findByPayload({ email }: any): Promise<UserDto> {
        return await this.findOne({
            where:  { email } });
    }

    async create(userDto: CreateUserDto): Promise<UserDto> {
        const { email, password } = userDto;

        // check if the user exists in the db
        const userInDb = await this.userRepo.findOne({
            where: { email }
        });

        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user: UserEntity = await this.userRepo.create({ email, password });
        await this.userRepo.save(user);
        return toUserDto(user);
    }

    async getUserEntityByLogin({ email, password }: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepo.findOne({ where: { email } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        // compare passwords
        const areEqual = await comparePasswords(user.password, password);

        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    async getUserEntityById(id: string): Promise<UserEntity> {
        const user = await this.userRepo.findOne({ where: { id } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }
}
