"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DiscordDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var DiscordDto = /** @class */ (function () {
    function DiscordDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], DiscordDto.prototype, "id");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], DiscordDto.prototype, "accessToken");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], DiscordDto.prototype, "refreshToken");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], DiscordDto.prototype, "discordId");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], DiscordDto.prototype, "userId");
    __decorate([
        (0, swagger_1.ApiProperty)()
    ], DiscordDto.prototype, "user");
    return DiscordDto;
}());
exports.DiscordDto = DiscordDto;
