import { Inject, Injectable, Request } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-discord'
import { AuthService } from '../auth.service';
import { DiscordService } from '../discord/discord.service';
import { request } from 'http';
import { JwtPayload } from 'jsonwebtoken';
import { DiscordAuthEntity } from '../entities/DiscordAuthEntity';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly discordService: DiscordService) {
		super({
			clientID: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
			callbackURL: "http://localhost:8080/api/discord/redirect",
			scope: ['identify', 'email'],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
	) {
		let discordId = profile.id;
		if (await this.discordService.findOne({ where: { discordId } }) != null)
			console.info("User already exists : ", profile.username)
		else {
			this.discordService.createDiscordAuth(accessToken, refreshToken, profile.id);
			console.info("User created : ", profile.username);
		}
		return await this.discordService.findOne({ where: { discordId } });
	}
}
