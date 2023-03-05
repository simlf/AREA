import { ApiProperty } from '@nestjs/swagger';

export class GithubInfo {
    @ApiProperty()
    login:  string;

    @ApiProperty()
    repos_name:  any;

    @ApiProperty()
    commits: any;

    @ApiProperty()
    company: string;

    @ApiProperty()
    repo_name: string;

    @ApiProperty()
    description: string;

}