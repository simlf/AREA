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
  mastery1 : number  
  
  @Column({nullable: true})
  mastery2 : number

  @Column({nullable: true})
  mastery3 : number

  @Column({nullable: true})
  mastery4 : number

  @Column({nullable: true})
  mastery5 : number

  @Column({nullable: true})
  mastery6 : number

  @Column({nullable: true})
  mastery7 : number 

  @Column({nullable: true})
  winrate : number

  @Column({nullable: true})
  rankOne: string

  @Column()
  actionEnum : 'penta' | 'level' | 'mastery1' | 'mastery2' | 'mastery3' | 'mastery4' | 'mastery5' | 'mastery6' | 'mastery7' | 'winrate' | 'rankone'

}