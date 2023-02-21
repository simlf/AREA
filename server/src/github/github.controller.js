"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GithubController = void 0;
var common_1 = require("@nestjs/common");
var GithubController = /** @class */ (function () {
    function GithubController(githubService, httpService) {
        this.githubService = githubService;
        this.httpService = httpService;
    }
    GithubController.prototype.getRoutes = function () {
        return { routes: ["/repo", "/user"] };
    };
    GithubController.prototype.getUserInfo = function () {
        return this.githubService.userInfo();
    };
    GithubController.prototype.getRepoInfo = function () {
        return this.githubService.repoInfo();
    };
    __decorate([
        (0, common_1.Get)('')
    ], GithubController.prototype, "getRoutes");
    __decorate([
        (0, common_1.Get)('user')
    ], GithubController.prototype, "getUserInfo");
    __decorate([
        (0, common_1.Get)('repo')
    ], GithubController.prototype, "getRepoInfo");
    GithubController = __decorate([
        (0, common_1.Controller)('github')
    ], GithubController);
    return GithubController;
}());
exports.GithubController = GithubController;
