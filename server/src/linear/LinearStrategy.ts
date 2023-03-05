import { Inject, Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { request } from 'http';
import { LinearService } from './linear.service';
import { JwtPayload } from 'jsonwebtoken';
import { Strategy } from 'passport';

//@Injectable()
//export class LinearStrategy extends PassportStrategy(Strategy) {
//    constructor(private readonly linearService: LinearService) {
//        super()
//    }
//    async validate(username: string, password: string): Promise<any> {
//        const user = await this.authService.validateUser(username, password);
//        if (!user) {
//          throw new UnauthorizedException();
//        }
//        return user;
//    }    
//}