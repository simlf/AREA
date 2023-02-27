import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../users/entity/UserEntity';

@Entity()
export class WorkflowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  actionName: string;

  @Column()
  reactionName: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  userId: string;

  @Column()
  workflowName: string;

  @Column()
  description: string;
}
