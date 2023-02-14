import { Module } from '@nestjs/common';
// import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/UserEntity';
import { AuthModule } from '../auth/auth.module';
import { DiscordStrategy } from '../auth/utils/DiscordStrategy';
import { DiscordAuthGuard } from '../auth/utils/Guards';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        TypeOrmModule.forFeature([
            UserEntity
        ]),
    ],
    controllers: [
        // DiscordController,
    ],
    providers: [
        DiscordAuthGuard,
        DiscordStrategy,
        DiscordService,
    ],
})

export class DiscordModule {}
