import { GithubController } from "./github.controller";
import { GithubService } from "./github.service";
import { GithubInfo } from "./github.model";

// This class is used to trigger all the functions that need to be triggered for League of Legends
export class GithubTrigger {
/*
    constructor(private readonly githubService: GithubService) {};

    private userlogin = "";
    private repos_name = [];
    private commits = [];
    private company = ""
    private description = "";

    // This function is called every 10ms to check if the user level has changed
    // If it has changed, it will log it in the console
    // If it's the first time the function is called, it will set the userLevel to the actual level
    // This function is called in the app.trigger.ts file
    async userInfo(login : string = `torvalds`) {
        //SetInterval is used to call the function every 10ms
        setInterval(async () => {
            const user: GithubInfo = await this.githubService.userInfo(login);
            if (this.userlogin === "") {
                this.userlogin = user.login;
                console.log("Set actual login to login: " + this.userlogin);
            } else if (this.userlogin != user.login) {
                this.userlogin = user.login;
                console.log("Login has changed! " + this.userlogin);
            }
            if (this.company === "") {
                this.company = user.company;
                console.log("Set the actual company to: " + this.company);
            } else if (this.company != user.company) {
                this.company = user.company;
                console.log("The company has changed! " + this.company);
            }
            if (this.repos_name.length === 0) {
                this.repos_name = user.repos_name;
                console.log("Set list of repos");
            } else if (this.repos_name.length != user.repos_name.length) {
                this.repos_name = user.repos_name;
                console.log("A new repository has been created by this user : " + this.userlogin);
            }
        }, 5000000);
    }
    async repoInfo(login : string = `torvalds`, repo : string = `linux`) {
        //SetInterval is used to call the function every 10ms
        setInterval(async () => {
            const user: GithubInfo = await this.githubService.repoInfo(login, repo);
            if (this.userlogin === "") {
                this.userlogin = user.login;
                console.log("Set actual login to login: " + this.userlogin);
            } else if (this.userlogin != user.login) {
                this.userlogin = user.login;
                console.log("Login has changed! " + this.userlogin);
            }
            if (this.description === "") {
                this.description = user.description;
                console.log("Set the actual description of the repository " + repo + " to: " + this.description);
            } else if (this.description != user.description) {
                this.description = user.description;
                console.log("The description of the repository " + repo + " has changed! " + this.description);
            }
            if (this.commits.length === 0) {
                this.commits = user.commits;
                console.log("Set list of commits for repository " + repo);
            } else if (this.commits.length != user.commits.length) {
                this.commits = user.commits;
                console.log("A new commit has been created by this user : " + this.userlogin + "for the repository " + repo);
            }
        }, 5000000);
    }
*/ 
} 