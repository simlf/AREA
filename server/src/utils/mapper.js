"use strict";
exports.__esModule = true;
exports.toUserDto = void 0;
var toUserDto = function (data) {
    var email = data.email;
    var userDto = { email: email };
    return userDto;
};
exports.toUserDto = toUserDto;
