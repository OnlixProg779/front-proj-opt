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
exports.CreditMovementForUpdateDto = void 0;
var credit_movement_for_manipulation_dto_1 = require("./credit-movement-for-manipulation-dto");
var CreditMovementForUpdateDto = /** @class */ (function (_super) {
    __extends(CreditMovementForUpdateDto, _super);
    function CreditMovementForUpdateDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CreditMovementForUpdateDto;
}(credit_movement_for_manipulation_dto_1.CreditMovementForManipulationDto));
exports.CreditMovementForUpdateDto = CreditMovementForUpdateDto;
