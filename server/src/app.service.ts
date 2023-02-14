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
  actions?: action[];
  reactions?: reaction[];
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

export interface workflow {
    name: string;
    description: string;
    logo: string;
    url: string;
    img: string;
}

@Injectable()
export class AboutService {
  getAbout(@Request() Req): About {
    const Discord: Service = {
      name: 'Discord',
      reactions: [
        {
          name: 'Send message',
          description: 'Send a message to a channel pecified by the user',
        },
      ],
    };
    const Github: Service = {
      name: 'Github',
      actions: [
        {
          name: 'New pull request',
          description: 'Trigger an action when a new pull request is created on a specified repository',
        },
        {
          name: 'New commit',
          description: 'Trigger an action when a new commit is created on a specified repository',
        }
      ],
      reactions: [
        {
          name: 'Create issue',
          description: 'Create an issue on a specified repository',
        },
      ],
    };
    const BattleNet: Service = {
      name: 'BattleNet',
      actions: [
        {
          name: 'New achievement',
          description: 'Trigger an action when a new achievement is unlocked on a specified account',
        },
      ],
    };
    const Lol: Service = {
      name: 'League of Legends',
      actions: [
        {
          name: 'New level',
          description: 'Trigger an action when a new level is reached on a specified account',
        },
      ],
    };
    const Nasa: Service = {
      name: 'Nasa',
      actions: [
        {
          name: 'New picture of the day',
          description: 'Trigger an action when a new picture of the day is released',
        },
      ],
    };
    const Clock: Service = {
      name: 'Clock',
      actions: [
        {
          name: "It's time",
          description: 'Trigger an action when a specified time give by user is reached',
        },
      ],
    };
    const Weather: Service = {
      name: 'Weather',
      actions: [
        {
          name: 'Temperature',
          description: 'Trigger an action when a specified temperature is reached',
        },
        {
          name: 'Weather',
          description: 'Trigger an action when a specified weather is present',
        }
      ],
    };
    const Steam: Service = {
      name: 'Steam',
      actions: [
        {
          name: 'New achievement',
          description: 'Trigger an action when a new achievement is unlocked on a specified account',
        },
        {
          name: 'New level',
          description: 'Trigger an action when a new level is reached on a specified account',
        },
        {
          name: 'New game',
          description: 'Trigger an action when a new game is added to a specified account',
        },
      ],
    };
    const Mail: Service = {
      name: 'Mail',
      reactions: [
        {
          name: 'Send mail',
          description: 'Send a mail to a specified address',
        },
      ],
    };

    const allServices: Service[] = [
      Discord,
      Github,
      BattleNet,
      Lol,
      Nasa,
      Clock,
      Weather,
      Steam,
      Mail,
    ];

    const about: About = {
      client: {
        host: Req.ip.toString().substring(7),
      },
      server: {
        currentTimeServer: new Date().getTime().toString(),
        services: allServices,
      }
    };
    return about;
  }
}

@Injectable()
export class IntegrationService {
  getWorkflows(): workflow[] {
    const workflow: workflow[] = [
      {
        name: 'Discord',
        description: 'Discord is a free and secure all-in-one voice+text app designed for gamers that works on your desktop and phone.',
        logo: 'https://discord.com/assets/2c21aeda16de354ba5334551a883b481.png',
        url: '/integration',
        img: '../../assets/1.png'
      },
      {
        name: 'Discord',
        description: 'Discord is a free and secure all-in-one voice+text app designed for gamers that works on your desktop and phone.',
        logo: 'https://discord.com/assets/2c21aeda16de354ba5334551a883b481.png',
        url: '/integration',
        img: '../../assets/1.png'
      },
    ];
    return workflow;
  }
}
