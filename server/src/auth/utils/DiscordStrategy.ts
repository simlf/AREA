import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-discord'
import { DiscordService } from '../../discord/discord.service';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entity/UserEntity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
	constructor(
	private readonly discordService: DiscordService,
	private readonly usersService: UsersService,
	@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
	) {
		super({
			clientID: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			callbackURL: process.env.DISCORD_REDIRECT_URI,
			scope: ['identify', 'email', 'connections', 'bot', 'guilds', 'messages.read' ],
			//  'relationships.read', 'activities.write', 'dm_channels.read', 'activities.read' ],
			session: false,
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		cb: any,
	) {

		try {
			console.log("validate method");

			const user = await this.userRepo.findOne({ where: { discordId: profile.id } });
			if (user) {
				console.log("user found", user);
				return cb(null, user);
			}

			const oldUser = await this.userRepo.findOne({ where: { email: profile.email } });
			console.log("user old found", oldUser);

			if (oldUser) {
				oldUser.discordId = profile.id;
				oldUser.discordToken = profile.accessToken;
				const userRepo = await this.userRepo.update(oldUser.id, oldUser);
				const newUser = await this.userRepo.findOne({ where: { discordId: profile.id } });
				console.log("user updated", userRepo);
				console.log("new user", newUser);
				// return newUser;
				return cb(null, newUser.email);
			}
		}
		catch (err) {
			console.error(err);
			return cb(err, null);
		}
	}
}
