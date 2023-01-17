import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/User';
import { CalendarController } from './calendar.controller';
import { SessionSerializer } from 'src/auth/utils/Serializer';
import { CalendarService } from './calendar.service';
import { AuthService } from 'src/auth/auth.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [TypeOrmModule.forFeature([User]), HttpModule],
    controllers: [CalendarController],
    providers: [
        SessionSerializer,  
        CalendarService,
        {
            provide: 'AUTH_SERVICE',
            useClass: AuthService,
        },
    ],
},)
export class CalendarModule {}
