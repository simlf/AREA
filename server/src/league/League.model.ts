import { ApiProperty } from '@nestjs/swagger';

export class LeagueUser {
    @ApiProperty()
    username:  string;

    @ApiProperty()
    icon_id:  string;

    @ApiProperty()
    level:  number;
    
    @ApiProperty()
    revision_date:  number;

    @ApiProperty()
    puuid:  string;
}
