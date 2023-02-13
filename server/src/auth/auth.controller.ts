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

    @Post('api/register')
    public async register(@Body() createUserDto: CreateUserDto,  ): Promise<RegistrationStatus> {
        const result:
        RegistrationStatus = await this.authService.register(createUserDto,);
        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    @Post('api/login')
    public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
        return await this.authService.login(loginUserDto);
    }

    @Get('api/whoami')
    @UseGuards(AuthGuard())
    public async testAuth(@Req() req: any): Promise<JwtPayload> {
        console.log(req.user);
        return req.user;
    }
}
