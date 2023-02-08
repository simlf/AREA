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
  // export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    // @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    // @Inject('DISCORD_SERVICE') private readonly discordService: DiscordService,
    // @Inject('DISCORD_AUTH_REPOSITORY') private readonly discordAuthRepo: typeof DiscordAuthEntity,
    private readonly discordService: DiscordService,
  ) {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/discord/redirect",
      //   callbackURL: process.env.DISCORD_REDIRECT_URI,
      scope: ['identify', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ) {
    // console.log("Profile", profile);
    let discordId = profile.id;
    if (await this.discordService.findOne({ where: { discordId } }) != null) {
      throw new Error("User already exists");
    }
    else {
      this.discordService.createDiscordAuth(accessToken, refreshToken, profile.id);
      console.log("User created");
    }
    return await this.discordService.findOne({ where: { discordId } });
  }
}
