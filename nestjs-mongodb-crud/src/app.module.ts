import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
import { User } from './typeorm/entities/User';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';

@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost:27017/nest'), UsersModule, AuthModule],
  imports: [
    // UsersModule,
    // AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      // password: 'testuser123',
      database: 'google_oauth2_app',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
