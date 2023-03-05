import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../users/entity/UserEntity';

@Entity()
export class WorkflowEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  actionName: string;

  @Generated()
  actionId: string;

  @Column()
  reactionName: string;

  @Generated()
  reactionId: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  userId: string;

  @Column()
  workflowName: string;

  @Column()
  description: string;

  @Column()
  logo: string;

  @Column()
  url?: string;

  @Column()
  img: string;
}
