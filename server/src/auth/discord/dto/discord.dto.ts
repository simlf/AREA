import { UserDto } from "src/users/dto/user.dto";

export class DiscordDto {
    id: string;
    accessToken: string;
    refreshToken: string;
    discordId: string;
    userId: string;
    user?: UserDto;
}
