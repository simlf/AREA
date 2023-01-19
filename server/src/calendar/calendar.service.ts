import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs';

@Injectable()
export class CalendarService {
    constructor(private readonly httpService: HttpService) {}

    async getCalendarsList(id: string) {
        return this.httpService
        .get('https://www.googleapis.com/calendar/v3/users/me/calendarList', { headers: {"Authorization" : `OAuth2 ${id}`} })
        .pipe(
        map((res) => res.data?.kind))
        .pipe(
            catchError(() => {
            throw new ForbiddenException('API not available');
            }),
        );;
    }
}
