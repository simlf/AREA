import * as bcryptjs from 'bcryptjs';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptjs.hash(this.password, 10);
  }// @Column()
  // accessToken: string;
}
