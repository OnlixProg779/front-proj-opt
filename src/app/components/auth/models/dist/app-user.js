"use strict";
exports.__esModule = true;
exports.AppUser = void 0;
var claims_create_dto_1 = require("../../vendors/models/claims-create-dto");
var employee_create_dto_1 = require("../../vendors/models/employee-create-dto");
var AppUser = /** @class */ (function () {
    function AppUser() {
        this.userName = '';
        this.password = '';
        this.active = false;
        this.employees = [new employee_create_dto_1.EmployeeCreateDto()];
        this.userClaims = [new claims_create_dto_1.ClaimsCreateDto(), new claims_create_dto_1.ClaimsCreateDto(), new claims_create_dto_1.ClaimsCreateDto()];
    }
    return AppUser;
}());
exports.AppUser = AppUser;
