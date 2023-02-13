import { DiscordDto } from "src/auth/discord/dto/discord.dto";

export class UserDto {
    email: string;
    discordAuth?: DiscordDto;
}
