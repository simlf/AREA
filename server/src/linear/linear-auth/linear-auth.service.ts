//import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//import { UsersService } from 'src/users/users.service';
//import { JwtPayload } from 'src/auth/interfaces/payload.interface';
//import { UserDto } from 'src/users/dto/user.dto';
//import { JwtService } from '@nestjs/jwt';
//import { LoginUserDto } from 'src/users/dto/user-login.dto';
//import { LoginStatus } from 'src/auth/interfaces/login-status.interface';
//
//@Injectable()
//export class LinearAuthService {
//  constructor(private usersService: UsersService, private readonly jwtService: JwtService) {}
//
//  private _createToken({ email }: UserDto): any {
//    const user: JwtPayload = { email };
//    const accessToken = this.jwtService.sign(user);
//
//    return {
//        expiresIn: 1500000,
//        // expiresIn: process.env.EXPIRESIN,
//        accessToken,
//    };
//  }
//  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
//    // find user in db
//        const user = await this.usersService.findByLogin(loginUserDto);
//
//        // generate and sign token
//        const token = this._createToken(user);
//
//        return {
//            email: user.email, ...token,
//        };
//    }
//  
//  async validateUser(username: string, pass: string): Promise<any> {
//    const user = await this.usersService.findOne({where: {username}});
//    if (!user) {
//        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
//    }
//
//  }
//}
