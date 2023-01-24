import { Body, Controller, HttpException, HttpStatus, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { CreateUserDto } from 'src/users/dto/user.create.dto';
import { LoginStatus } from './interfaces/login-status.interface';
import { LoginUserDto } from 'src/users/dto/user-login.dto';
import { JwtPayload } from './interfaces/payload.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    public async register(@Body() createUserDto: CreateUserDto,  ): Promise<RegistrationStatus> {
        const result:
        RegistrationStatus = await this.authService.register(createUserDto,);
        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
        return await this.authService.login(loginUserDto);
    }

    @Get('whoami')
    @UseGuards(AuthGuard())
    public async testAuth(@Req() req: any): Promise<JwtPayload> {
        return req.user;
    }
}
