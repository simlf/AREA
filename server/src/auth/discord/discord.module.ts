import { Module } from '@nestjs/common';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscordAuthEntity } from '../entities/DiscordAuthEntity';
import { UserEntity } from 'src/users/entity/UserEntity';
import { AuthModule } from '../auth.module';
import { DiscordStrategy } from '../utils/DiscordStrategy';
import { DiscordAuthGuard } from '../utils/Guards';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        TypeOrmModule.forFeature([
            UserEntity
        ]),
    ],
    controllers: [
        DiscordController,
    ],
    providers: [
        DiscordAuthGuard,
        DiscordStrategy,
        DiscordService,
    ],
})

export class DiscordModule {}
