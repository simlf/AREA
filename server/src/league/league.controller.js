"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LeagueController = void 0;
var common_1 = require("@nestjs/common");
var LeagueController = /** @class */ (function () {
    function LeagueController(leagueService, httpService) {
        this.leagueService = leagueService;
        this.httpService = httpService;
    }
    LeagueController.prototype.getRoutes = function () {
        return { routes: ["/profile", "/matches", "/rankone", "/challenges", "/statistics", "/mastery"] };
    };
    LeagueController.prototype.getLevel = function () {
        return this.leagueService.getLevel();
    };
    LeagueController.prototype.GetMatches = function () {
        return this.leagueService.getMatches();
    };
    LeagueController.prototype.GetRankOne = function () {
        return this.leagueService.getRankOne();
    };
    LeagueController.prototype.GetLastChallenge = function () {
        return this.leagueService.getLastChallenge();
    };
    LeagueController.prototype.GetSeasonStatistics = function () {
        return this.leagueService.getSeasonStatistics();
    };
    LeagueController.prototype.GetChampionMastery = function () {
        return this.leagueService.getChampionMastery();
    };
    __decorate([
        (0, common_1.Get)('')
    ], LeagueController.prototype, "getRoutes");
    __decorate([
        (0, common_1.Get)('profile')
    ], LeagueController.prototype, "getLevel");
    __decorate([
        (0, common_1.Get)('matches')
    ], LeagueController.prototype, "GetMatches");
    __decorate([
        (0, common_1.Get)('rankone')
    ], LeagueController.prototype, "GetRankOne");
    __decorate([
        (0, common_1.Get)('challenges')
    ], LeagueController.prototype, "GetLastChallenge");
    __decorate([
        (0, common_1.Get)('statistics')
    ], LeagueController.prototype, "GetSeasonStatistics");
    __decorate([
        (0, common_1.Get)('mastery')
    ], LeagueController.prototype, "GetChampionMastery");
    LeagueController = __decorate([
        (0, common_1.Controller)('league')
    ], LeagueController);
    return LeagueController;
}());
exports.LeagueController = LeagueController;
