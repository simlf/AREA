import { Controller, Get, HttpException, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserDetails } from 'src/utils/types';
import { User } from 'src/utils/user.decorator';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) {}

    @Get('accesToken')
    getUserAccesToken(@User() user: UserDetails) {
        try {
            console.log(user.accessToken);
            return user.accessToken;
        } catch (error) {
            throw new HttpException('No access token, you are not logged in', 401);
        }

    }

    @Get('calendars')
    getCalendars(@User() user: UserDetails) {
        try {
            // console.log(this.calendarService.getCalendarsList(user.accessToken));
            // console.log(user.accessToken);
            // return user.accessToken;
            return this.calendarService.getCalendarsList(user.accessToken);
        } catch (error) {
            throw new HttpException('No access token, you are not logged in', 401);
        }

    }
}
