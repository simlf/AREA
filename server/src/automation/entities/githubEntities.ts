import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity({ name: 'githubRepo' })
export class githubEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true  })
  actionId: string;

  @Column()
  name : string 

  @Column()
  description : string 

  @Column({nullable: true}) // commits
  commitsNumber : boolean

  @Column({nullable: true}) // hireable
  hireable : boolean

  @Column({nullable: true}) // ? -> reposName seprated by ;
  repos : string

  @Column()
  actionEnum : 'hireable' | 'commits'

}

