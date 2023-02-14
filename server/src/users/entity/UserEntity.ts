import * as bcryptjs from 'bcryptjs';
import { DiscordAuthEntity } from 'src/auth/entities/DiscordAuthEntity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true  })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  discordId: string;

  @Column({ nullable: true })
  discordToken: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptjs.hash(this.password, 10);
  }
}
