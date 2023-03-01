import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowEntity } from './workflows.entity';
import { UserEntity } from '../users/entity/UserEntity';
import { Uuid as v4 } from 'uuid';
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
      logo: string,
      reactionId: number,
      actionId: number,
      ): Promise<WorkflowEntity> {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      const workflowAction = new WorkflowEntity();
      workflowAction.actionName = actionName;
      workflowAction.actionId = actionId;
      workflowAction.reactionName = reactionName;
      workflowAction.reactionId = reactionId;
      workflowAction.user = user;
      workflowAction.userId = userId;
      workflowAction.workflowName = workflowName;
      workflowAction.description = description;
      workflowAction.logo = '../../assets/' + logo;
      workflowAction.img = '../../assets/' + randomNumber + '.png';
      workflowAction.url = '';
      const savedWorkflowAction = await this.workflowActionRepository.save(workflowAction);
      workflowAction.url = '/config-integration/' + savedWorkflowAction.id;  
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

    async getWorkflowActionById(id: string): Promise<WorkflowEntity | undefined> {
      return await this.workflowActionRepository.findOne({where: {id}});
    }
}
