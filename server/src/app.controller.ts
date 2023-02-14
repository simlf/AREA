import { Controller, Get, Request, Response } from '@nestjs/common';
import { AppService, AboutService, IntegrationService, workflow } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly aboutService: AboutService, private readonly integrationService: IntegrationService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('about.json')
  getAbout(@Response() Res, @Request() Req) {
    const about = this.aboutService.getAbout(Req);
    return Res.json(about);
  }

  @Get('workflows')
  getWorkflows(@Response() Res) {
    const workflows: workflow[] = this.integrationService.getWorkflows();
    return Res.json(workflows);
  }
}
