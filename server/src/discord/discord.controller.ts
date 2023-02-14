import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import  { Client, Events, GatewayIntentBits, TextChannel, CategoryChannel } from 'discord.js';

import { DiscordService } from './discord.service';


@Controller('discord')
export class DiscordController {
    constructor(
    ) {}


    @Get()
    discord() {
        const client = new Client({ intents: [GatewayIntentBits.Guilds] });

        client.once(Events.ClientReady, c => {
            console.log(`Ready! Logged in as ${c.user.tag}`);
        });

        // Log in to Discord with your client's token
        client.login(process.env.DISCORD_BOT_TOKEN);

        console.info("Login");

        const channel = client.channels.cache.get('id');
        if (channel instanceof TextChannel) {
            channel.send('Hello world!');
        }


        client.on(Events.InteractionCreate, async interaction => {
            if (!interaction.isChatInputCommand()) return;

            const { commandName } = interaction;

            if (commandName === 'react') {
                const message = await interaction.reply({ content: 'You can react with Unicode emojis!', fetchReply: true });
                message.react('😄');
            }
        });
        // .send('Hello world!');
        return { msg: 'Login' };
    }

    @Get('redirect')
    redirect() {
        return { msg: 'Redirect' };
    }
}
