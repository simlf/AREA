import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { GoogleStrategy } from "./utils/GoogleStrategy";
import { AuthService } from "./auth.service";
import { User } from "src/typeorm/entities/User";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [
        GoogleStrategy,
        {
            provide: 'AUTH_SERVICE',
            useClass: AuthService
        },
    ],
})

export class AuthModule {}




 // import { Module } from '@nestjs/common';
// import { AuthController } from './auth.controller';
// import { GoogleStrategy } from './utils/googlestrategy';
// import { AuthService } from './auth.service';
// import { UsersModule } from '../users/users.module';

// import { Type } from '@sinclair/typebox';
// import { Mongoose } from 'mongoose';
// import { UsersService } from 'src/users/users.service';
// import { PassportModule } from '@nestjs/passport';

// @Module({
//     imports: [
//         // UsersModule,
//         // PassportModule.register({ defaultStrategy: 'google' })
//     ],
//     controllers: [AuthController],
//     providers: [
//         // UsersService,
//         // GoogleStrategy,
//         // {
//         //     provide: 'AUTH_SERVICE',
//         //     useClass: AuthService,
//         // },
//     ],
// })
// export class AuthModule {}
