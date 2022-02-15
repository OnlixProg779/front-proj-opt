"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.UserCreateDto = void 0;
var user_manipulation_dto_1 = require("./user-manipulation-dto");
var UserCreateDto = /** @class */ (function (_super) {
    __extends(UserCreateDto, _super);
    function UserCreateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserCreateDto;
}(user_manipulation_dto_1.UserManipulationDto));
exports.UserCreateDto = UserCreateDto;
