import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { SpotifyService } from './spotify.service';
import { SpotifyController } from './spotify.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
    imports: [
        HttpModule,
        UsersModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            // session: true,
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
        SpotifyController
    ],
    providers: [
        AuthService,
        JwtStrategy,
        SpotifyService,
    ],
})
export class SpotifyModule {}
