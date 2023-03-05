import { Module } from '@nestjs/common';
import { LinearService } from './linear.service';
import { LinearController } from './linear.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/UserEntity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
//import { LinearAuthGuard } from 'src/auth//utils/Guards';


@Module({
    imports: [
        UsersModule,
        AuthModule,
        TypeOrmModule.forFeature([
            UserEntity
        ]),
        // DiscordService,
    ],
    controllers: [
        LinearController,
    ],
    providers: [
     //   LinearAuthGuard,
        //LinearStrategy,
        // {
        //     provide: 'AUTH_SERVICE',
        //     useClass: AuthService,
        // },
        LinearService,
    ],
})

export class DiscordModule {}
