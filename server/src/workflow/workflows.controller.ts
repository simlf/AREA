import { Body, Controller, Post, Get } from '@nestjs/common';
import { WorkflowService } from './workflows.service';
import { UserEntity } from '../users/entity/UserEntity';
import { UsersService } from 'src/users/users.service';
import { WorkflowEntity } from './workflows.entity';
import { HttpService } from '@nestjs/axios';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('workflowsDb')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService, private http: HttpService, private userService: UsersService) { }

  @Post('addWorkflow')
  @ApiOperation({ summary: 'Add a new workflow action' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        actionName: { type: 'string', description: 'The name of the action' },
        reactionName: { type: 'string', description: 'The name of the reaction' },
        workflowName: { type: 'string', description: 'The name of the workflow' },
        description: { type: 'string', description: 'A description of the workflow' },
        userId: { type: 'string', description: 'The id of the user' },
      },
      required: ['actionName', 'reactionName', 'workflowName', 'description', 'userId'],
    },
  })
  @ApiResponse({ status: 201, description: 'Workflow added' })
  @ApiResponse({ status: 401, description: 'No user logged in' })
  async addWorkflow(
    @Body('actionName') actionName: string,
    @Body('reactionName') reactionName: string,
    @Body('workflowName') workflowName: string,
    @Body('description') description: string,
    @Body('userId') userId: string,
  ): Promise<string> {
    // check id of user
    if (!userId) {
      return 'No user logged in';
    }
    // Get user entity
    const user = await this.userService.getUserEntityById(userId);
    // Create a new workflow action with given parameters
    await this.workflowService.createWorkflowAction(
      actionName,
      reactionName,
      user,
      userId,
      workflowName,
      description,
    );

    return 'Workflow added by ' + user.email;
  }

  @Post('displayWorkflow')
  @ApiOperation({ summary: 'Display all workflows link to user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', description: 'The id of the user' },
      },
      required: ['userId'],
    },
  })
  async displayWorkflow(@Body('userId') userId: string,): Promise<WorkflowEntity[]> {
    return await this.workflowService.getWorkflowActionByUser(userId);
  }

  @Get('displayAllWorkflow')
  async displayAllWorkflow(): Promise<WorkflowEntity[]> {
    return this.workflowService.getAllWorkflowActions();
  }

  @Post('deleteWorkflow')
  @ApiOperation({ summary: 'Delete a workflow with id' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        workflowId: { type: 'number', description: 'The id of the workflow' },
      },
      required: ['workflowId'],
    },
  })
  async deleteWorkflow(@Body('workflowId') workflowId: number,) {
    this.workflowService.deleteWorkflowAction(workflowId);
  }

}
