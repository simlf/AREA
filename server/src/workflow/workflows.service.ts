import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowEntity } from './workflows.entity';
import { UserEntity } from '../users/entity/UserEntity';
@Injectable()
export class WorkflowService {
    constructor(
      @InjectRepository(WorkflowEntity) private readonly workflowActionRepository: Repository<WorkflowEntity>,
    ) {}

    async createWorkflowAction(
      actionName: string,
      reactionName: string,
      user: UserEntity,
      userId: string,
      workflowName: string,
      description: string,
      ): Promise<WorkflowEntity> {
      const workflowAction = new WorkflowEntity();
      workflowAction.actionName = actionName;
      workflowAction.reactionName = reactionName;
      workflowAction.user = user;
      workflowAction.userId = userId;
      workflowAction.workflowName = workflowName;
      workflowAction.description = description;
      return this.workflowActionRepository.save(workflowAction);
    }
    
    async getWorkflowActionByUser(userId: string): Promise<WorkflowEntity[]> {
      return await this.workflowActionRepository.findBy({ userId });
    }
    async getAllWorkflowActions(): Promise<WorkflowEntity[]> {
      return this.workflowActionRepository.find();
    }

    async deleteWorkflowAction(id: number) {
      await this.workflowActionRepository.delete(id);
    }

}
