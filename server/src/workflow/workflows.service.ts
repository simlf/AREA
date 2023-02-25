import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowAction } from './workflows.entity';
import { UserEntity } from '../users/entity/UserEntity';

@Injectable()
export class WorkflowService {
    constructor(@InjectRepository(WorkflowAction) private readonly workflowActionRepository: Repository<WorkflowAction>,) {}

    async createWorkflowAction(
      workflowId: number,
      actionName: string,
      reactionName: string,
      user: UserEntity,
      workflowName: string,
      description: string,
    ): Promise<WorkflowAction> {
      const workflowAction = new WorkflowAction();
      workflowAction.workflow_id = workflowId;
      workflowAction.action_name = actionName;
      workflowAction.reaction_name = reactionName;
      workflowAction.user = user;
      workflowAction.workflow_name = workflowName;
      workflowAction.description = description;
      return this.workflowActionRepository.save(workflowAction);
    }

    async getAllWorkflowActions(): Promise<WorkflowAction[]> {
      return this.workflowActionRepository.find();
    }

}