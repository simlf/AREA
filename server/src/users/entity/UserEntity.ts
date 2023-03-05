import * as bcryptjs from 'bcryptjs';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  discordId: string;

  @Column({ nullable: true })
  discordToken: string;

  @Column({ nullable: true })
  spotifyUserId: string;

  @Column({ nullable: true })
  spotifyAccessToken: string;

  // @OneToMany(() => SpotifyEntity, (spotify) => spotify.user)
  // spotify: SpotifyEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptjs.hash(this.password, 10);
  }
}
