import { UserDto } from 'src/users/dto/user.dto';

export interface LoginStatus {
  // username: string;
  email: string;
  accessToken: any;
  expiresIn: any;
}
