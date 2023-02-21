"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.DiscordService = void 0;
var common_1 = require("@nestjs/common");
var DiscordService = /** @class */ (function () {
    function DiscordService(discordHttpService) {
        this.discordHttpService = discordHttpService;
    }
    DiscordService.prototype.getBotGuilds = function () {
        return this.discordHttpService.fetchBotGuilds();
    };
    DiscordService.prototype.getUserGuilds = function () {
        return this.discordHttpService.fetchUserGuilds();
    };
    DiscordService.prototype.getMutualGuilds = function () {
        return this.getBotGuilds();
    };
    DiscordService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)('DISCORD_HTTP_SERVICE'))
    ], DiscordService);
    return DiscordService;
}());
exports.DiscordService = DiscordService;
