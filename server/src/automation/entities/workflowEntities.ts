import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity({ name: 'workflowEntity' })
export class WorkflowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  ActionId: string;

  @Column() // author
  ActionType : string

  @Column() // author
  ReactionId : string

  @Column() // date
  ReactionType : string
}