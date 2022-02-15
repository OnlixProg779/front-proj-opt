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
exports.AddressUpdateDto = void 0;
var address_create_dto_1 = require("./address-create-dto");
var AddressUpdateDto = /** @class */ (function (_super) {
    __extends(AddressUpdateDto, _super);
    function AddressUpdateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AddressUpdateDto;
}(address_create_dto_1.AddressCreateDto));
exports.AddressUpdateDto = AddressUpdateDto;
