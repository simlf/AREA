import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

@Controller('calendar')
export class CalendarController {
    @Get('calendars')
    findAll(@Req() request: any) {
        console.log(request.user.accessToken);
        console.log(typeof(request));
        // console.log("https://www.googleapis.com/calendar/v3/users/me/calendarList" + request.user.accessToken);

    }
}
