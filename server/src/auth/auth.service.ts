import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/user.create.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { LoginUserDto } from 'src/users/dto/user-login.dto';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { UserDto } from 'src/users/dto/user.dto';


@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService) {}

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: 'user registered',
        };
        try {
            await this.usersService.create(userDto);
        } catch (err) {
            status = {
                success: false,
                message: err,
            };
        }
        return status;
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // find user in db
        const user = await this.usersService.findByLogin(loginUserDto);

        // generate and sign token
        const token = this._createToken(user);

        return {
            username: user.username, ...token,
        };
    }

    private _createToken({ username }: UserDto): any {
        const user: JwtPayload = { username };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn: 1500000,
            // expiresIn: process.env.EXPIRESIN,
            accessToken,
        };
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.usersService.findByPayload(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

}
