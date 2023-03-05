import { ApiProperty } from '@nestjs/swagger';

export class MeteoInfo {
    @ApiProperty()
    idealTemperature:  number;

    @ApiProperty()
    time:  string;
}
