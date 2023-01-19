import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from './utils/Guards';

@Controller('auth')
export class AuthController {

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  // api/auth/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { msg:
    'You are succefully connected. You can now interact with the Calendar API. Try it out with /api/google/calendars/' };
  }

  // api/auth/google/redirect
  @Get('google/calendar')
  @UseGuards(GoogleAuthGuard)
  handleCalendar() {
    return { msg:
    'The developper is currently working on that feature. Come back later to see your calendars.' };
  }

  // When the session is serialized, the user is stored in the request
  @Get('status')
  user(@Req() request: Request) {
    console.log(request.user);
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
