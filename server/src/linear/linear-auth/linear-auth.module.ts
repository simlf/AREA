/*import { Module } from '@nestjs/common';
import { LinearAuthService } from 'src/linear/linear-auth/linear-auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LinearStrategy } from '../LinearStrategy';
import { JwtModule } from '@nestjs/jwt';
import { LinearService } from '../linear.service';
import { HttpService } from '@nestjs/axios';
import { UserEntity } from 'src/users/entity/UserEntity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule,
            PassportModule.register({
              defaultStrategy: 'jwt',
              property: 'user',
              session: false,
            }),
            JwtModule.register({
              secret: "jwtConstants.secret",
              signOptions: { expiresIn: '60s' },
            })],
  providers: [LinearAuthService],
  exports: [PassportModule, JwtModule]
})
export class LinearAuthModule {}*/
