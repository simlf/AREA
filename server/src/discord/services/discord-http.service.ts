import { IDiscordHttpService } from "../interfaces/discord-http";
import axios from 'axios';

export class DiscordHttpService implements IDiscordHttpService {
    fetchBotGuilds() {
        return axios.get('https://discord.com/api/v9/users/@me/guilds', {
            headers: {
                Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                },
        });
    }

    fetchUserGuilds() {
        throw new Error('Method not implemented.');
    }
}
