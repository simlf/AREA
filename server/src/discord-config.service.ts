import { Injectable } from '@nestjs/common';
import {
  DiscordModuleOption,
  DiscordOptionsFactory,
} from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';


@Injectable()
export class DiscordConfigService implements DiscordOptionsFactory {
  createDiscordOptions(): DiscordModuleOption {
    return {
      token: process.env.DISCORD_BOT_TOKEN,
      discordClientOptions: {
        intents: [GatewayIntentBits.Guilds],
      },
    };
  }
}
