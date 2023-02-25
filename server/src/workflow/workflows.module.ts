import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowAction } from './workflows.entity';
import { UserEntity } from '../users/entity/UserEntity';
import { UsersModule } from 'src/users/users.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { WorkflowController } from './workflows.controller';
import { WorkflowService } from './workflows.service';

@Module({
    imports: [
        UsersModule,
        HttpModule,
        TypeOrmModule.forFeature([WorkflowAction]),
    ],
    controllers: [
        WorkflowController
    ],
    providers: [
        WorkflowService,
    ],
})
export class workflowModule {}