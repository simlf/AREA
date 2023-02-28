import { Controller, Get, Request, Response } from '@nestjs/common';
import { AppService, AboutService, IntegrationService, workflow } from './app.service';
import { WorkflowService } from './workflow/workflows.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly aboutService: AboutService, private readonly workflowService: WorkflowService) {}

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
  async getWorkflows(@Response() Res) {
    const workflows = await this.workflowService.getAllWorkflowActions();
    return Res.json(workflows);
  }
}
