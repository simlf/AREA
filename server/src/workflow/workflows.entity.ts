import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../users/entity/UserEntity';

@Entity()
export class WorkflowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  workflow_id: number;

  @Column()
  action_name: string;

  @Column()
  reaction_name: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  workflow_name: string;

  @Column()
  description: string;
}
