import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

Entity({name : 'weatherActionEntity'})
export class WeatherAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  temperature : number
}