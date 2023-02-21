"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DiscordModule = void 0;
var common_1 = require("@nestjs/common");
// import { DiscordController } from './discord.controller';
var discord_service_1 = require("./discord.service");
var users_module_1 = require("../users/users.module");
var typeorm_1 = require("@nestjs/typeorm");
var UserEntity_1 = require("../users/entity/UserEntity");
var auth_module_1 = require("../auth/auth.module");
var DiscordStrategy_1 = require("../auth/utils/DiscordStrategy");
var Guards_1 = require("../auth/utils/Guards");
var DiscordModule = /** @class */ (function () {
    function DiscordModule() {
    }
    DiscordModule = __decorate([
        (0, common_1.Module)({
            imports: [
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
                typeorm_1.TypeOrmModule.forFeature([
                    UserEntity_1.UserEntity
                ]),
            ],
            controllers: [
            // DiscordController,
            ],
            providers: [
                Guards_1.DiscordAuthGuard,
                DiscordStrategy_1.DiscordStrategy,
                discord_service_1.DiscordService,
            ]
        })
    ], DiscordModule);
    return DiscordModule;
}());
exports.DiscordModule = DiscordModule;
