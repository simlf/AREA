import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity({ name: 'leagueRankOne' })
export class LeagueRankOneEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true  })
  actionId: string;

  @Column() // username
  rankOneUsername: string;

  @Column() // win
  totalWins: number;

  @Column() // loose
  totalLosses: number;

  @Column('decimal', { precision: 2, scale: 2 }) // winrate
  winrate: number;

  @Column('enum')
  actionEnum : 'level' | 'win' | 'loose' | 'winrate'
}


@Entity({ name: 'leagueMatches' })
export class LeagueMatchesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true  })
  actionId: string;

  @Column()
  username: string;

  @Column()
  totalWins: number;

  @Column()
  totalLosses: number;

  @Column('decimal', { precision: 2, scale: 2 })
  winrate: number;

  @Column('enum')
  actionEnum : 'level' | 'win' | 'loose' | 'winrate'
}

@Entity({ name: 'leagueMatches' })
export class LeagueChallengesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true  })
  actionId: string;

  @Column() // level
  actualChallengeLevel: string;

  @Column() // total
  totalChallengePoints: number;

  @Column('decimal', { precision: 2, scale: 2 }) // percentile
  ractualRankPercentile: number;

  @Column() // name
  lastChallengeName: string;

  @Column() 
  lastChallengeId : number

  @Column() // any
  lastChallengeDate : Date

  @Column('enum')
  actionEnum : 'level' | 'total' | 'percentile' | 'name' | 'any'
}

Entity({ name: 'leagueStatistics' })
export class LeagueStatisticsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true  })
  actionId: string;

  @Column()
  usenrame: string;

  @Column()
  totalGame: number;

  @Column('decimal', { precision: 2, scale: 2 })
  totalWins: number;

  @Column()
  total_losses: string;

  @Column('decimal', { precision: 2, scale: 2 })
  winrate : number

  @Column() // double
  doubleKills : number

  @Column() // triple
  tripleKills : number

  @Column() // quadra
  quadraKills : number

  @Column() // penta
  pentaKills : number

  @Column() // totalk
  totalKills : number

  @Column() // totald
  totalDeaths : number

  @Column() // golds
  totalGolds : number

  @Column()
  lastGameId : string 

  @Column('enum')
  actionEnum : 'double' | 'triple' | 'quadra' | 'penta' | 'totalk' | 'totald' | 'golds'
}

Entity({ name: 'leagueMatery' })
export class LeagueMasteryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true  })
  actionId: string;

  @Column()
  username: string;

  @Column('decimal', { precision: 2, scale: 2 })
  winrate : number

  @Column() // lvl4
  level4 : number

  @Column() // lvl5
  level5 : number

  @Column() // lvl6
  level6 : number

  @Column() // lvl7
  level7 : number

  @Column() // chest
  chestGranted : number

  @Column('enum')
  actionEnum : 'lvl4' | 'lvl5' | 'lvl6' | 'lvl7' | 'chest'
}

