import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/entity/UserEntity';
// import { CalendarController } from './calendar/calendar.controller';
// import { CalendarModule } from './calendar/calendar.module';
// import { CalendarService } from './calendar/calendar.service';
import { HttpModule } from '@nestjs/axios';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
// import { UsersService } from './users/users.service';
// import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    // CalendarModule,
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'host.docker.internal',
      // host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'docker_nest',
      // database: 'google_oauth2_app2',
      // autoLoadEntities: true,
      entities: [UserEntity],
      synchronize: true,
      // synchronize: false,
    }),
    // PassportModule.register({ session: true }),
  ],
  controllers: [
    AppController,
    // CalendarController
  ],
  providers: [
    AppService,
    // UsersService,
    // CalendarService
  ],
})
export class AppModule {}
