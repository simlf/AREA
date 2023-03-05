import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { Repository } from 'typeorm';
import { GithubInfo } from './github.model';

const config = {
    headers:{
        Authorization: "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",
    }
};

@Injectable()
export class GithubService {
    constructor(private readonly httpService: HttpService) {}
    async userInfo (login : string = `torvalds`) {
        let returnValue: GithubInfo = new GithubInfo();
        try {
            const { data }  = await firstValueFrom(this.httpService.get(`https://api.github.com/users/${login}`, config))
            const repos = await firstValueFrom(this.httpService.get(`https://api.github.com/users/${login}/repos`, config))
            returnValue.login = login;
            returnValue.company = data.company;
            returnValue.repos_name = [];
            for (let i = 0; i != Object.keys(repos.data).length; i++) {
                returnValue.repos_name.push(repos.data[i].name);
            }
            return returnValue
        } catch (error) {            
            console.error({"Error" : error.code, "Message" : error.message})
        }
    }

    async repoInfo (login : string = `Torvalds`, repo : string = `linux`) {
        var return_value = { 
            "login"                          :  login,
            "repo_name"                      :  null,
            "repo_id"                        :  null,
            "description"                    :  null,                    
            "commits"                        : [],
            "commitsNumber"                  : 0                   
        }

        try {
            const repo_info = await firstValueFrom(this.httpService.get(`https://api.github.com/repos/${login}/${repo}`, config))
            const commits_info = await firstValueFrom(this.httpService.get(`https://api.github.com/repos/${login}/${repo}/commits`, config))
            return_value.login = login
            return_value.repo_name = repo
            return_value.description = repo_info.data.description
            return_value.commits = [];
            for (let i = 0; i != Object.keys(commits_info.data).length; i++) {
                let t = new Date(commits_info.data[i].commit.author.date)
                let now = new Date 
                return_value.commits.push({ "sha"           : commits_info.data[i].sha,
                                            "author"        : commits_info.data[i].commit.author.name,
                                            "message"       : commits_info.data[i].commit.author.message,
                                            "date"          : commits_info.data[i].commit.author.date,
                                            "secondsAgo"    : ((now.valueOf() / 1000) - (t.valueOf() / 1000)).toFixed(0) })
                return_value.commitsNumber += 1
            }
              
            return return_value
        } catch (error) {            
            return {"Error" : 404, "Message" : error.message}
        }
    }
}