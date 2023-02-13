import { Controller, Get, Request, Response } from '@nestjs/common';
import { AppService, AboutService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly aboutService: AboutService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('about.json')
  getAbout(@Response() Res, @Request() Req) {
    const about = this.aboutService.getAbout(Req);
    return Res.json(about);
  }
}
