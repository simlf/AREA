import { Injectable, Request } from '@nestjs/common';
import { Response } from 'express';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

export interface action {
  name: string;
  description: string;
}

export interface reaction {
  name: string;
  description: string;
}

export interface Service {
  name: string;
  actions: action[];
  reactions: reaction[];
}

export interface Client {
  host: string;
}

export interface Server {
  currentTimeServer: string;
  services: Service[];
}
export interface About {
  client: Client;
  server: Server; 
}

@Injectable()
export class AboutService {
  getAbout(@Request() Req): About {
    const about: About = {
      client: {
        host: Req.ip,
      },
      server: {
        currentTimeServer: new Date().getTime().toString(),
        services: [
          {
            name: 'Discord',
            actions: [
              {
                name: 'Send message',
                description: 'Send a message to a channel',
              },
            ],
            reactions: [
              {
                name: 'Send message',
                description: 'Send a message to a channel',
              },
            ],
          },
        ],
      }
    };
    return about;
  }
}
