"use strict";
exports.__esModule = true;
exports.DiscordHttpService = void 0;
var axios_1 = require("axios");
var DiscordHttpService = /** @class */ (function () {
    function DiscordHttpService() {
    }
    DiscordHttpService.prototype.fetchBotGuilds = function () {
        return axios_1["default"].get('https://discord.com/api/v9/users/@me/guilds', {
            headers: {
                Authorization: "Bot ".concat(process.env.DISCORD_BOT_TOKEN)
            }
        });
    };
    DiscordHttpService.prototype.fetchUserGuilds = function () {
        throw new Error('Method not implemented.');
    };
    return DiscordHttpService;
}());
exports.DiscordHttpService = DiscordHttpService;
