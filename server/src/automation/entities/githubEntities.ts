import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity({ name: 'githubUser' })
export class githubEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true  })
  actionId: string;

  @Column() // hireable
  hireable : boolean

  @Column() // ? -> reposName seprated by ;
  repos : string

  @Column()
  actionEnum : 'hireable'
}

@Entity({ name: 'githubRepo' })
export class githubRepoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true  })
  actionId: string;

  @Column()
  name : string 

  @Column()
  description : string 

  @Column() // commits
  commitsNumber : boolean

  @Column()
  actionEnum : 'commits'
}