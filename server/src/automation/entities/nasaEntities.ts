import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity({ name: 'nasaAction' })
export class NasaAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true  })
  actionId: string;

  @Column() // author
  author : string

  @Column()
  url : string

  @Column() // date
  date : Date

  @Column()
  actionEnum : 'date' | 'author'
}