import { DiscordDto } from "src/discord/dto/discord.dto";
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty()
    email: string;
    discordAuth?: DiscordDto;
}
