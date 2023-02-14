import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { Repository } from 'typeorm';

const config = {
    headers:{
        Authorization: "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",
    }
};

@Injectable()
export class GithubService {
    constructor(private readonly httpService: HttpService) {}
    async userInfo (login : string = `torvalds`) {
        var return_value = { 
            "login"                     :  login,
            "id"                        :  null,
            "name"                      :  null,
            "company"                   :  null,
            "email"                     :  null,
            "hireable"                  :  null,
            "bio"                       :  null,
            "repos_name"                :  [],
        }
        try {
            const { data }  = await firstValueFrom(this.httpService.get(`https://api.github.com/users/${login}`, config))
            const repos = await firstValueFrom(this.httpService.get(`https://api.github.com/users/${login}/repos`, config))
            return_value.id = data.id
            return_value.name = data.name
            return_value.company = data.revisionDate
            return_value.hireable = data.hireable
            return_value.bio = data.bio
            return_value.email = data.email
            for (let i = 0; i != Object.keys(repos.data).length; i++) {
                return_value.repos_name.push(repos.data[i].name);
            }
            return return_value
        } catch (error) {            
            return {"Error" : 404, "Message" : error.message}
        }
    }

    async repoInfo (login : string = `Torvalds`, repo : string = `linux`) {
        var return_value = { 
            "login"                          :  login,
            "repo_name"                      :  null,
            "repo_id"                        :  null,
            "description"                    :  null,                    
            "commits"                        : [],            
        }
        try {
            const repo_info = await firstValueFrom(this.httpService.get(`https://api.github.com/repos/${login}/${repo}`, config))
            const commits_info = await firstValueFrom(this.httpService.get(`https://api.github.com/repos/${login}/${repo}/commits`, config))
            return_value.login = login
            return_value.repo_name = repo
            return_value.description = repo_info.data.description
            return_value.repo_id = repo_info.data.id
            for (let i = 0; i != Object.keys(commits_info.data).length; i++) {
                let t = new Date(commits_info.data[i].commit.author.date)
                let now = new Date 
                return_value.commits.push({ "sha"           : commits_info.data[i].sha,
                                            "author"        : commits_info.data[i].commit.author.name,
                                            "message"       : commits_info.data[i].commit.author.message,
                                            "date"          : commits_info.data[i].commit.author.date,
                                            "secondsAgo"    : ((now.valueOf() / 1000) - (t.valueOf() / 1000)).toFixed(0) })
            }
            return return_value
        } catch (error) {            
            console.log(error)
            return {"Error" : 404, "Message" : error.message}
        }
    }
}