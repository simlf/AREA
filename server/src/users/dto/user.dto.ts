import { DiscordDto } from "src/auth/discord/dto/discord.dto";

export class UserDto {
    id: string;
    username: string;
    email: string;
    discordAuth?: DiscordDto;
}
