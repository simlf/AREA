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
exports.__esModule = true;
exports.SessionSerializer = void 0;
var passport_1 = require("@nestjs/passport");
var SessionSerializer = /** @class */ (function (_super) {
    __extends(SessionSerializer, _super);
    function SessionSerializer() {
        return _super.call(this) || this;
    }
    SessionSerializer.prototype.serializeUser = function (user, cb) {
        console.log('serializeUser: ', user);
        return cb(null, user.id);
    };
    SessionSerializer.prototype.deserializeUser = function (id, cb) {
        console.log('dserializeUser: ', id);
        return cb(null, { id: id });
    };
    return SessionSerializer;
}(passport_1.PassportSerializer));
exports.SessionSerializer = SessionSerializer;
