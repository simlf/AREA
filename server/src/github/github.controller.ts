import { Controller, Get } from '@nestjs/common';
import { GithubService } from './github.service';
import { HttpService } from '@nestjs/axios';

@Controller('github')
export class GithubController {
    constructor(private githubService : GithubService, private httpService: HttpService) {}

    @Get('')
    getRoutes() {
        return {routes : ["/repo", "/user"]}
    }
    @Get('user')
    getUserInfo () {
        return this.githubService.userInfo()
    }

    @Get('repo')
    getRepoInfo() {
        return this.githubService.repoInfo()
    }
}