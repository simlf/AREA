import { DiscordDto } from "src/auth/discord/dto/discord.dto";
import { DiscordAuthEntity } from "src/auth/entities/DiscordAuthEntity";
import { UserDto } from "src/users/dto/user.dto";
import { UserEntity } from "src/users/entity/UserEntity";

export const toUserDto = (data: UserEntity): UserDto => {
    const { email } = data;
    let userDto: UserDto = { email };

    return userDto;
};

// export const toDiscordDto = (data: DiscordAuthEntity): DiscordDto => {
//     const { id, accessToken, refreshToken, discordId, userId,  user } = data;
//     let discordDto: DiscordDto = { id, accessToken, refreshToken, discordId, userId, user };
//     return discordDto;
// };
