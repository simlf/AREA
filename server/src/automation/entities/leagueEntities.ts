import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity({name : 'leagueAction'})
export class LeagueAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({nullable: true})
  lastGameId: string

  @Column({nullable: true})
  currentLevel : number

  @Column({nullable: true})
  mastery7 : number
 
  @Column({nullable: true})
  winrate : number

  @Column({nullable: true})
  rankOne: string

  @Column()
  actionEnum : 'penta' | 'level' | 'mastery' | 'winrate' | 'rankone'

}