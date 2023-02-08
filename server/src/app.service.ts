import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class AboutService {
  getAbout(): string {
    return 'Hello World!';
  }
}
