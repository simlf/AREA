import { UserEntity } from 'src/users/entity/UserEntity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

@Entity({ name: 'discord_auth' })
export class DiscordAuthEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    accessToken: string;

    @Column()
    refreshToken: string;

    @Column()
    discordId: string;

    @OneToOne(() => UserEntity, (user) => user.discordAuth)
    @JoinColumn()
    user: Relation<UserEntity>;
}
