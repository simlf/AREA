import { ApiProperty } from '@nestjs/swagger';

export class UpdateSpotifyPlaylistDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    public: boolean;
}
