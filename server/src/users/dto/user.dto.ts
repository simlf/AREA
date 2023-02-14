import { DiscordDto } from "src/discord/dto/discord.dto";

export class UserDto {
    email: string;
    discordAuth?: DiscordDto;
}
