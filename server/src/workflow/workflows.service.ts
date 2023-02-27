import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowEntity } from './workflows.entity';
import { UserEntity } from '../users/entity/UserEntity';
import { UsersService } from '../users/users.service';
@Injectable()
export class WorkflowService {
    constructor(
      @InjectRepository(WorkflowEntity) private readonly workflowActionRepository: Repository<WorkflowEntity>,
      private usersService: UsersService
    ) {}

    async getWorkflowActionByUser(actualUserId: string): Promise<WorkflowEntity[]> {
      return await this.workflowActionRepository.find({ where: { userId: actualUserId } });
    }

    async createWorkflowAction(
      actionName: string,
      reactionName: string,
      user: UserEntity,
      userId: string,
      workflowName: string,
      description: string,
    ): Promise<WorkflowEntity> {
      const workflowAction = new WorkflowEntity();
      workflowAction.action_name = actionName;
      workflowAction.reaction_name = reactionName;
      workflowAction.user = user;
      workflowAction.userId = userId;
      workflowAction.workflow_name = workflowName;
      workflowAction.description = description;
      return this.workflowActionRepository.save(workflowAction);
    }

    async getAllWorkflowActions(): Promise<WorkflowEntity[]> {
      return this.workflowActionRepository.find();
    }

    async deleteWorkflowAction(id: number): Promise<void> {
      await this.workflowActionRepository.delete(id);
    }

}
