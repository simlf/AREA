import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/entity/UserEntity';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'area_db',
      username: 'root',
      password: 'root',
      database: 'area_database',
      entities: [UserEntity],
      synchronize: true,
    }),
    // PassportModule.register({ session: true }),
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
