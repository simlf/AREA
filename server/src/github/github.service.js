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
exports.GithubService = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var config = {
    headers: {
        Authorization: "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"
    }
};
var GithubService = /** @class */ (function () {
    function GithubService(httpService) {
        this.httpService = httpService;
    }
    GithubService.prototype.userInfo = function (login) {
        if (login === void 0) { login = "torvalds"; }
        return __awaiter(this, void 0, void 0, function () {
            var return_value, data, repos, i, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return_value = {
                            "login": login,
                            "id": null,
                            "name": null,
                            "company": null,
                            "email": null,
                            "hireable": null,
                            "bio": null,
                            "repos_name": []
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.get("https://api.github.com/users/".concat(login), config))];
                    case 2:
                        data = (_a.sent()).data;
                        return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.get("https://api.github.com/users/".concat(login, "/repos"), config))];
                    case 3:
                        repos = _a.sent();
                        return_value.id = data.id;
                        return_value.name = data.name;
                        return_value.company = data.revisionDate;
                        return_value.hireable = data.hireable;
                        return_value.bio = data.bio;
                        return_value.email = data.email;
                        for (i = 0; i != Object.keys(repos.data).length; i++) {
                            return_value.repos_name.push(repos.data[i].name);
                        }
                        return [2 /*return*/, return_value];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, { "Error": 404, "Message": error_1.message }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GithubService.prototype.repoInfo = function (login, repo) {
        if (login === void 0) { login = "Torvalds"; }
        if (repo === void 0) { repo = "linux"; }
        return __awaiter(this, void 0, void 0, function () {
            var return_value, repo_info, commits_info, i, t, now, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return_value = {
                            "login": login,
                            "repo_name": null,
                            "repo_id": null,
                            "description": null,
                            "commits": []
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.get("https://api.github.com/repos/".concat(login, "/").concat(repo), config))];
                    case 2:
                        repo_info = _a.sent();
                        return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(this.httpService.get("https://api.github.com/repos/".concat(login, "/").concat(repo, "/commits"), config))];
                    case 3:
                        commits_info = _a.sent();
                        return_value.login = login;
                        return_value.repo_name = repo;
                        return_value.description = repo_info.data.description;
                        return_value.repo_id = repo_info.data.id;
                        for (i = 0; i != Object.keys(commits_info.data).length; i++) {
                            t = new Date(commits_info.data[i].commit.author.date);
                            now = new Date;
                            return_value.commits.push({ "sha": commits_info.data[i].sha,
                                "author": commits_info.data[i].commit.author.name,
                                "message": commits_info.data[i].commit.author.message,
                                "date": commits_info.data[i].commit.author.date,
                                "secondsAgo": ((now.valueOf() / 1000) - (t.valueOf() / 1000)).toFixed(0) });
                        }
                        return [2 /*return*/, return_value];
                    case 4:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2 /*return*/, { "Error": 404, "Message": error_2.message }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    GithubService = __decorate([
        (0, common_1.Injectable)()
    ], GithubService);
    return GithubService;
}());
exports.GithubService = GithubService;
