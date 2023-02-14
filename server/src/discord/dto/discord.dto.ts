import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from "src/users/dto/user.dto";

export class DiscordDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;

    @ApiProperty()
    discordId: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    user?: UserDto;
}
