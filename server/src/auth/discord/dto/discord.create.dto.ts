import { UserDto } from "src/users/dto/user.dto";

export class CreateDiscordDto {
    id: string;
    accessToken: string;
    refreshToken: string;
    discordId: string;
    userId: string;
    user: UserDto;
}
