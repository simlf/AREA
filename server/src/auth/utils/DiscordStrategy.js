"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.DiscordStrategy = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var passport_discord_1 = require("passport-discord");
var typeorm_1 = require("@nestjs/typeorm");
var UserEntity_1 = require("../../users/entity/UserEntity");
var DiscordStrategy = /** @class */ (function (_super) {
    __extends(DiscordStrategy, _super);
    function DiscordStrategy(discordService, usersService, userRepo) {
        var _this = _super.call(this, {
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: process.env.DISCORD_REDIRECT_URI,
            scope: ['identify', 'email', 'connections', 'bot', 'guilds', 'messages.read'],
            //  'relationships.read', 'activities.write', 'dm_channels.read', 'activities.read' ],
            session: false
        }) || this;
        _this.discordService = discordService;
        _this.usersService = usersService;
        _this.userRepo = userRepo;
        return _this;
    }
    DiscordStrategy.prototype.validate = function (accessToken, refreshToken, profile, cb) {
        return __awaiter(this, void 0, void 0, function () {
            var user, oldUser, userRepo, newUser, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        console.log("validate method");
                        return [4 /*yield*/, this.userRepo.findOne({ where: { discordId: profile.id } })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            console.log("user found", user);
                            return [2 /*return*/, cb(null, user)];
                        }
                        return [4 /*yield*/, this.userRepo.findOne({ where: { email: profile.email } })];
                    case 2:
                        oldUser = _a.sent();
                        console.log("user old found", oldUser);
                        if (!oldUser) return [3 /*break*/, 5];
                        oldUser.discordId = profile.id;
                        oldUser.discordToken = profile.accessToken;
                        return [4 /*yield*/, this.userRepo.update(oldUser.id, oldUser)];
                    case 3:
                        userRepo = _a.sent();
                        return [4 /*yield*/, this.userRepo.findOne({ where: { discordId: profile.id } })];
                    case 4:
                        newUser = _a.sent();
                        console.log("user updated", userRepo);
                        console.log("new user", newUser);
                        // return newUser;
                        return [2 /*return*/, cb(null, newUser.email)];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [2 /*return*/, cb(err_1, null)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    DiscordStrategy = __decorate([
        (0, common_1.Injectable)(),
        __param(2, (0, typeorm_1.InjectRepository)(UserEntity_1.UserEntity))
    ], DiscordStrategy);
    return DiscordStrategy;
}((0, passport_1.PassportStrategy)(passport_discord_1.Strategy)));
exports.DiscordStrategy = DiscordStrategy;
