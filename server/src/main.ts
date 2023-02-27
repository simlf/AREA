import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { workflowService } from './workflow/workflow.service';

const test = () => {
  setInterval(() => {
      console.log('test1')
    },
    10000 // execute the above code every 10ms
  )

  setInterval(() => {
      console.log('test2')
    },
    10000 // execute the above code every 10ms
  )
}

// TODO: Make secret private with .env
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('AREA API Documentation')
    .setDescription('The AREA API description')
    .setVersion('1.0')
    .addTag('area')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.use(
    session({
      secret: 'asiodasjoddjdoasddasoidjasiodasdjaiodd',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 900000, // 15 minutes
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors();
  await app.listen(8080);
  test();
}

bootstrap();
