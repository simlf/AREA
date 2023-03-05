import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity({ name: 'spotifyEntity' })
export class nasaReactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  ReactionId: string;

  @Column()
  description : string

  @Column()
  title : string

  @Column()
  playlistId : string

  @Column()
  actionEnum : 'changePlaylist'
}