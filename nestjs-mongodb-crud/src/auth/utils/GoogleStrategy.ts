import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy)
{
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    ) {
        super({
            // TODO: Replace environment variables
            clientID: '226121897457-6u9ludlu2ol8842ubhac91a6qb3haut5.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/api/auth/google/redirect',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        console.log(accessToken, refreshToken, profile);
        const user = await this.authService.validateUser({
            email: profile.emails[0].value,
            displayName: profile.displayName,
        });
    }
}
