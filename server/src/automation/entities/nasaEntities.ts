import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity({ name: 'nasaRepo' })
export class nasaImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true  })
  actionId: string;

  @Column() // author
  author : string

  @Column()
  url : string

  @Column() // date
  date : boolean

  @Column()
  actionEnum : 'date' | 'author'
}