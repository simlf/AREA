import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './typeorm/entities/User';
import { CalendarController } from './calendar/calendar.controller';
import { CalendarModule } from './calendar/calendar.module';
import { CalendarService } from './calendar/calendar.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    AuthModule,
    CalendarModule,
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
      autoLoadEntities: true,
      // entities: [User],
      synchronize: true,
      // synchronize: false,
    }),
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController, CalendarController],
  providers: [AppService, CalendarService],
})
export class AppModule {}
