import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

Entity({name : 'leagueAction'})
export class LeagueAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  lastGameId: string

  @Column()
  currentLevel : number

  @Column()
  mastery7 : number
 
  @Column()
  winrate : number

  @Column()
  rankOne: string
}