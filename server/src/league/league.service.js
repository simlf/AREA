"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.LeagueService = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var base_url1 = "https://euw1.api.riotgames.com/lol/";
var key = process.env.LEAGUE_API;
var base_url2 = "https://europe.api.riotgames.com/lol/";
/// For all services, the username used by default is CrossBiwBoyExoPa
var LeagueService = /** @class */ (function () {
    function LeagueService(httpService) {
        this.httpService = httpService;
    }
    /// return the current level of a player
    LeagueService.prototype.getLevel = function (username) {
        if (username === void 0) { username = "CrossBiwBoyExoPa"; }
        return __awaiter(this, void 0, void 0, function () {
            var return_value, url, data, level, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return_value = {
                            "username": username,
                            "icon_id": null,
                            "level": null,
                            "revision_date": null,
                            "puuid": null
                        };
                        url = "".concat(base_url1, "summoner/v4/summoners/by-name/").concat(username, "?api_key=").concat(key);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.get(url))];
                    case 2:
                        data = (_a.sent()).data;
                        level = data.summonerLevel;
                        return_value.icon_id = data.profileIconId;
                        return_value.revision_date = data.revisionDate;
                        return_value.puuid = data.puuid;
                        return_value.level = data.summonerLevel;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, { "Error": error_1.code, "Message": error_1.message }];
                    case 4: return [2 /*return*/, return_value];
                }
            });
        });
    };
    /// Return a win ratio from last 48 hours
    LeagueService.prototype.getMatches = function (username) {
        if (username === void 0) { username = "CrossBiwBoyExoPa"; }
        return __awaiter(this, void 0, void 0, function () {
            var url1, data, puuid, return_value, date, newDate, url2, a, win_count, total_match, url3, b, j, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url1 = "".concat(base_url1, "summoner/v4/summoners/by-name/").concat(username, "?api_key=").concat(key);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.get(url1))];
                    case 2:
                        data = (_a.sent()).data;
                        puuid = data.puuid;
                        return_value = {
                            "username": username,
                            "puuid": puuid,
                            "total_wins": null,
                            "total_losses": null,
                            "winrate": null
                        };
                        date = new Date(new Date().getTime() - (48 * 60 * 60 * 1000));
                        newDate = (Math.round(date.getTime() / 1000));
                        url2 = "".concat(base_url2, "match/v5/matches/by-puuid/").concat(puuid, "/ids?startTime=").concat(((newDate).toString()), "&start=0&count=20&api_key=").concat(key);
                        return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.get(url2))];
                    case 3:
                        a = _a.sent();
                        win_count = 0;
                        total_match = 0;
                        _a.label = 4;
                    case 4:
                        if (!(total_match < Object.keys(a.data).length)) return [3 /*break*/, 7];
                        url3 = "".concat(base_url2, "match/v5/matches/").concat(a.data[total_match], "?api_key=").concat(key);
                        return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.get(url3))];
                    case 5:
                        b = _a.sent();
                        console.log(b.data);
                        for (j = 0; j < Object.keys(b.data.info.participants).length; j++) {
                            if (b.data.info.participants[j].puuid == puuid) {
                                if (b.data.info.participants[j].win == true)
                                    win_count += 1;
                            }
                        }
                        _a.label = 6;
                    case 6:
                        total_match++;
                        return [3 /*break*/, 4];
                    case 7:
                        return_value.total_wins = win_count;
                        return_value.total_losses = total_match - win_count;
                        return_value.winrate = (win_count / total_match);
                        return [2 /*return*/, return_value];
                    case 8:
                        error_2 = _a.sent();
                        return [2 /*return*/, { "Error": error_2.code, "Message": error_2.message }];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /// Return the summoner name of the top Europpean player 
    LeagueService.prototype.getRankOne = function (username) {
        if (username === void 0) { username = "CrossBiwBoyExoPa"; }
        return __awaiter(this, void 0, void 0, function () {
            var url, data, return_value, size, save, lpsave, i, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(base_url1, "league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=").concat(key);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.get(url))];
                    case 2:
                        data = (_a.sent()).data;
                        return_value = {
                            "top_player_username": null,
                            "region": "EUW",
                            "total_league_points": null,
                            "total_wins": null,
                            "total_losses": null,
                            "winrate": null
                        };
                        size = Object.keys(data.entries).length;
                        save = 0;
                        lpsave = 0;
                        for (i = 0; i != size; i++) {
                            if (lpsave < data.entries[i].leaguePoints) {
                                save = i;
                                lpsave = data.entries[i].leaguePoints;
                            }
                        }
                        return_value.top_player_username = data.entries[save].summonerName;
                        return_value.total_league_points = data.entries[save].leaguePoints;
                        return_value.total_losses = data.entries[save].losses;
                        return_value.total_wins = data.entries[save].wins;
                        return_value.winrate = (data.entries[save].wins / (data.entries[save].wins + data.entries[save].losses)) * 100;
                        return [2 /*return*/, return_value];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, { "Error": error_3.code, "Message": error_3.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LeagueService.prototype.getLastChallenge = function (username) {
        if (username === void 0) { username = "CrossBiwBoyExoPa"; }
        return __awaiter(this, void 0, void 0, function () {
            var url1, data, puuid, return_value, url2, challenges_list, size, save, last_save, i, url3, challenges_info, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url1 = "".concat(base_url1, "summoner/v4/summoners/by-name/").concat(username, "?api_key=").concat(key);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.get(url1))];
                    case 2:
                        data = (_a.sent()).data;
                        puuid = data.puuid;
                        return_value = {
                            "puuid": puuid,
                            "username": username,
                            "actual_challenge_level": null,
                            "total_challenge_point": null,
                            "actual_rank_percentile": null,
                            "last_challenge_name": null,
                            "last_challenge_id": null,
                            "last_challenge_date": null
                        };
                        console.log(puuid);
                        url2 = "".concat(base_url1, "challenges/v1/player-data/").concat(puuid, "?api_key=").concat(key);
                        return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.get(url2))];
                    case 3:
                        challenges_list = _a.sent();
                        size = Object.keys(challenges_list.data.challenges).length;
                        save = 0;
                        last_save = 0;
                        for (i = 0; i != size; i++) {
                            if (last_save < challenges_list.data.challenges[i].achievedTime) {
                                save = i;
                                last_save = challenges_list.data.challenges[i].achievedTime;
                            }
                        }
                        console.log(challenges_list.data.challenges[save]);
                        url3 = "".concat(base_url1, "challenges/v1/challenges/").concat(challenges_list.data.challenges[save].challengeId, "/config?api_key=").concat(key);
                        return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.get(url3))];
                    case 4:
                        challenges_info = _a.sent();
                        return_value.total_challenge_point = challenges_list.data.challenges[save].current;
                        return_value.actual_rank_percentile = challenges_list.data.challenges[save].percentile;
                        return_value.actual_challenge_level = challenges_list.data.challenges[save].level;
                        return_value.last_challenge_id = challenges_info.data.id;
                        return_value.last_challenge_name = challenges_info.data.localizedNames.en_US.name;
                        return_value.last_challenge_date = challenges_list.data.challenges[save].achievedTime;
                        console.log(return_value);
                        return [2 /*return*/, return_value];
                    case 5:
                        error_4 = _a.sent();
                        return [2 /*return*/, { "Error": error_4.code, "Message": error_4.message }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /// Return statistics from the last $gameToCheck games (a large number lower drastically the performance. Also can easily reach the maximum number fo request)
    LeagueService.prototype.getSeasonStatistics = function (username, gameToCheck) {
        if (username === void 0) { username = "CrossBiwBoyExoPa"; }
        if (gameToCheck === void 0) { gameToCheck = 10; }
        return __awaiter(this, void 0, void 0, function () {
            var url1, data, puuid, return_value, url2, a, total_match, url3, b, j, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url1 = "".concat(base_url1, "summoner/v4/summoners/by-name/").concat(username, "?api_key=").concat(key);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.get(url1))];
                    case 2:
                        data = (_a.sent()).data;
                        puuid = data.puuid;
                        return_value = {
                            "username": username,
                            "puuid": puuid,
                            "total_game": 0,
                            "total_wins": 0,
                            "total_losses": 0,
                            "winrate": 0,
                            "doublekills": 0,
                            "triplekills": 0,
                            "quadrakills": 0,
                            "pentakills": 0,
                            "total_kill": 0,
                            "total_death": 0,
                            "total_gold_earned": 0,
                            "last_game_played_id": 0
                        };
                        url2 = "".concat(base_url2, "match/v5/matches/by-puuid/").concat(puuid, "/ids?startTime=1672531200&start=0&count=").concat(gameToCheck.toString(), "&api_key=").concat(key);
                        return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.get(url2))];
                    case 3:
                        a = _a.sent();
                        total_match = 0;
                        return_value.last_game_played_id = a.data[0];
                        _a.label = 4;
                    case 4:
                        if (!(total_match < Object.keys(a.data).length)) return [3 /*break*/, 7];
                        url3 = "".concat(base_url2, "match/v5/matches/").concat(a.data[total_match], "?api_key=").concat(key);
                        return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.get(url3))];
                    case 5:
                        b = _a.sent();
                        for (j = 0; j < Object.keys(b.data.info.participants).length; j++) {
                            if (b.data.info.participants[j].puuid == puuid) {
                                return_value.pentakills += b.data.info.participants[j].pentaKills;
                                return_value.quadrakills += b.data.info.participants[j].quadraKills;
                                return_value.triplekills += b.data.info.participants[j].tripleKills;
                                return_value.doublekills += b.data.info.participants[j].doubleKills;
                                return_value.total_kill += b.data.info.participants[j].kills;
                                return_value.total_death += b.data.info.participants[j].deaths;
                                return_value.total_gold_earned += b.data.info.participants[j].goldEarned;
                                if (b.data.info.participants[j].win == true) {
                                    return_value.total_wins += 1;
                                }
                                else {
                                    return_value.total_losses += 1;
                                }
                            }
                        }
                        _a.label = 6;
                    case 6:
                        total_match++;
                        return [3 /*break*/, 4];
                    case 7:
                        return_value.total_game = total_match;
                        return_value.winrate = (return_value.total_wins / total_match);
                        return [2 /*return*/, return_value];
                    case 8:
                        error_5 = _a.sent();
                        return [2 /*return*/, { "Error": error_5.code, "Message": error_5.message }];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /// Count the mastery of an account. Only mastery 4 and above + the chests
    LeagueService.prototype.getChampionMastery = function (username) {
        if (username === void 0) { username = "CrossBiwBoyExoPa"; }
        return __awaiter(this, void 0, void 0, function () {
            var url1, data, puuid, return_value, url2, a, total_champ, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url1 = "".concat(base_url1, "summoner/v4/summoners/by-name/").concat(username, "?api_key=").concat(key);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.get(url1))];
                    case 2:
                        data = (_a.sent()).data;
                        puuid = data.puuid;
                        return_value = {
                            "username": username,
                            "puuid": puuid,
                            "level4_mastery": 0,
                            "level5_mastery": 0,
                            "level6_mastery": 0,
                            "level7_mastery": 0,
                            "chests_granted": 0
                        };
                        console.log(data.id);
                        url2 = "".concat(base_url1, "champion-mastery/v4/champion-masteries/by-summoner/").concat(data.id, "?api_key=").concat(key);
                        return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.get(url2))];
                    case 3:
                        a = _a.sent();
                        console.log(url2);
                        for (total_champ = 0; total_champ < Object.keys(a.data).length; total_champ++) {
                            if (a.data[total_champ].championLevel == 7)
                                return_value.level7_mastery += 1;
                            if (a.data[total_champ].championLevel == 6)
                                return_value.level6_mastery += 1;
                            if (a.data[total_champ].championLevel == 5)
                                return_value.level5_mastery += 1;
                            if (a.data[total_champ].championLevel == 4)
                                return_value.level4_mastery += 1;
                            if (a.data[total_champ].chestGranted == true)
                                return_value.chests_granted += 1;
                        }
                        return [2 /*return*/, return_value];
                    case 4:
                        error_6 = _a.sent();
                        return [2 /*return*/, { "Error": error_6.code, "Message": error_6.message }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LeagueService = __decorate([
        (0, common_1.Injectable)()
    ], LeagueService);
    return LeagueService;
}());
exports.LeagueService = LeagueService;
