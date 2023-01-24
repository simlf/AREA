import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/users.module';
// import { Passport } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';

@Module({
    imports: [
        UsersModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.register({
            secret: "area", signOptions: {
                expiresIn: 1500000,
            },
            // secret: process.env.SECRETKEY, signOptions: {
            //     expiresIn: process.env.EXPIRESIN,
            // },
        }),
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        JwtStrategy,
    ],
    exports: [
        PassportModule,
        JwtModule
    ],
})
export class AuthModule {}
