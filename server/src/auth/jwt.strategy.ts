import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "area",
            // secretOrKey: process.env.SECRETKEY,
        });
    }

    async validate(payload: JwtPayload, done: any) {
        const user = await this.authService.validateUser(payload);
        console.log('user: ', user);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        done(null, user);
    }
    // async validate(payload: JwtPayload, done: any): Promise<UserDto> {
    //     const user = await this.authService.validateUser(payload);
    //     if (!user) {
    //         throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    //     }
    //     return user;
    // }
}
