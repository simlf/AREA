import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './typeorm/entities/User';
import { CalendarController } from './calendar/calendar.controller';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      // password: 'testuser123',
      database: 'google_oauth2_app2',
      entities: [User],
      synchronize: true,
      // synchronize: false,
    }),
    PassportModule.register({ session: true }),
    CalendarModule,
  ],
  controllers: [AppController, CalendarController],
  providers: [AppService],
})
export class AppModule {}
