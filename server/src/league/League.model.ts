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

    @ApiProperty()
    total_wins:  number;

    @ApiProperty()
    total_losses:  number;

    @ApiProperty()
    winrate:  number;

    @ApiProperty()
    total_league_points:  number;

    @ApiProperty()
    top_player_username:  string;

    
}
