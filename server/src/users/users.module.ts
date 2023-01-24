import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/UserEntity';
import { UsersService } from './users.service';
// import { SessionSerializer } from './utils/Serializer';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [],
    providers: [
    UsersService,
    ],
    exports: [UsersService],
})
export class UsersModule {}
