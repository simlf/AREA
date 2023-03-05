import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowEntity } from './workflows.entity';
import { UserEntity } from '../users/entity/UserEntity';
import { UsersModule } from 'src/users/users.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { WorkflowController } from './workflows.controller';
import { WorkflowService } from './workflows.service';
import { LeagueAction } from 'src/automation/entities/leagueEntities';


@Module({
    imports: [
        UsersModule,
        HttpModule,
        TypeOrmModule.forFeature([WorkflowEntity, LeagueAction]),
    ],
    controllers: [
        WorkflowController
    ],
    providers: [
        WorkflowService,
    ],
    exports: [WorkflowService],
})
export class WorkflowModule {}
