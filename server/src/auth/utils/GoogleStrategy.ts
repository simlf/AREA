import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';


@Injectable()
// TODO: Make tokens private with .env
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID: '226121897457-6u9ludlu2ol8842ubhac91a6qb3haut5.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8080/api/auth/google/redirect',
      scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar.readonly'],
    });
  }

  // This method is called when the user is authenticated from Google
  // TODO: Update the user before returning it
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log("Access Token ", accessToken);
    console.log("Refresh Token ", refreshToken);
    // console.log(profile);

    // Check if the user exists in the database or create a new one
    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      displayName: profile.displayName,
      accessToken: accessToken,
    });
    console.log('Validate');
    console.log(user);
    // If the user is not found/create return null to stop the authentication process
    // it will return a 401 error
    return user || null;
  }

  async calendar(accessToken: string, refreshToken: string, profile: Profile) {
    console.log("TTTEEEEEESSSSSSSTTTTT",);

    return null;
  }
}
