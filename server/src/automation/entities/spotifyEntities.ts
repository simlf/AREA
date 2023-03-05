import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity({ name: 'spotifyEntity' })
export class nasaReactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  ReactionId: string;

  @Column() // author
  route : string

  @Column() // author
  description : string

  @Column() // date
  title : string

  @Column() // date
  playlistId : string

  @Column()
  actionEnum : 'date'
}