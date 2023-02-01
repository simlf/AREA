import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-discord'
import { AuthService } from '../auth.service';
import { DiscordService } from '../discord/discord.service';

// import { Done } from 'src/utils/types';
// import { encrypt } from '../../utils/encrypt';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    @Inject('DISCORD_SERVICE') private readonly discordService: DiscordService,
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
    profile: Profile,
    // done: Done,
  ) {

    const { id, email, discriminator, avatar } = profile;
    this.discordService.createDiscordAuth(accessToken, refreshToken, profile.id);
    let user = JSON.parse(JSON.stringify(profile));
    console.log("Validate");
    // console.log(profile);
    // console.log(user);
    console.log(user.bearer);

    // done(null, user);
    // return { id, email, discriminator, avatar };
  }
}
