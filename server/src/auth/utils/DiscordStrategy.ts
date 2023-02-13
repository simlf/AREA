import { Inject, Injectable, Request } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-discord'
import { AuthService } from '../auth.service';
import { DiscordService } from '../discord/discord.service';
import { request } from 'http';
import { JwtPayload } from 'jsonwebtoken';
import { DiscordAuthEntity } from '../entities/DiscordAuthEntity';
import { UsersService } from 'src/users/users.service';
// import { Done } from 'src/utils/types';
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
			// callbackURL: "Dhttp://localhost:8080/api/discord/redirect",
			scope: ['identify', 'email', 'connections', 'guilds', 'relationships.read','gdm.join', 'bot', 'activities.write', 'dm_channels.read', 'applications.builds.read', 'messages.read', 'activities.read'],
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
				return user;
				// return cb(null, user);
				// console.log("efter done");
				// return user;
			}

			const oldUser = await this.userRepo.findOne({ where: { email: profile.email } });
			console.log("user old found", oldUser);

			if (oldUser) {
				oldUser.discordId = profile.id;
				oldUser.discordToken = profile.accessToken;
				const userRepo = await this.userRepo.update(oldUser.id, oldUser);
				// const user1Repo = await this.userRepo.update(oldUser.id, oldUser);
				const newUser = await this.userRepo.findOne({ where: { discordId: profile.id } });
				console.log("user updated", userRepo);
				console.log("new user", newUser);
				return user;
				// return cb(null, oldUser.email);
			}
		}
		catch (err) {
			console.error(err);
			// return done(err, null);
		}

		// let discordId = profile.id;


		// if (await this.discordService.findOne({ where: { discordId } }) != null)
		// 	console.info("User already exists : ", profile.username)
		// else {
		// 	// this.discordService.createDiscordAuth(accessToken, refreshToken, profile.id);
		// 	console.info("User created : ", profile.username);
		// }
		// return await this.discordService.findOne({ where: { discordId } });
	}
}
