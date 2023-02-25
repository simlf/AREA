import { Body, Controller, Post, Get } from '@nestjs/common';
import { WorkflowService } from './workflows.service';
import { UserEntity } from '../users/entity/UserEntity';
import { WorkflowEntity } from './workflows.entity';
import { HttpService } from '@nestjs/axios';

@Controller('workflowsDb')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService, private http: HttpService) {}

  @Post('addWorkflow')
  async addWorkflow(): Promise<string> {
    // Create a user object with a hardcoded user ID of 1
    const user = new UserEntity();
    user.id = "1";

    // Create a new workflow action with hardcoded parameters
    await this.workflowService.createWorkflowAction(
      123, // workflow_id
      'example_action', // action_name
      'example_reaction', // reaction_name
      user, // user
      'Example Workflow', // workflow_name
      'This is an example workflow', // description
    );

    return 'Workflow added';
  }

  @Get('displayWorkflow')
  async displayWorkflow(): Promise<WorkflowEntity[]> {
    return this.workflowService.getAllWorkflowActions();
  }

}
