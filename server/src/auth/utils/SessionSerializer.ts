import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Done } from 'src/utils/types';
import { AuthService } from '../auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { UserEntity } from 'src/users/entity/UserEntity';

export class SessionSerializer extends PassportSerializer {
  constructor(
    // @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }
  serializeUser(user, cb) {
    console.log('serializeUser: ', user);
    return cb(null, user.id);
  }

  deserializeUser(id, cb) {
    console.log('dserializeUser: ', id);
    return cb(null, { id: id });
  }

  // serializeUser(user: UserDto, done: Done) {
  //   done(null, user);
  // }
  // async deserializeUser(user: UserDto, done: Done) {
  //   const userDB = await this.authService.validateUser(user);
  //   return userDB ? done(null, userDB) : done(null, null);
  // }
}
