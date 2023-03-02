import { ApiProperty } from '@nestjs/swagger';

export class NasaInfo {
    @ApiProperty()
    url:  string;

    @ApiProperty()
    date:  string;
}
