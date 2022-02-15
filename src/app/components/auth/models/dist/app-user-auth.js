"use strict";
exports.__esModule = true;
exports.AppUserAuth = void 0;
var employee_dto_1 = require("../../vendors/models/employee-dto");
var AppUserAuth = /** @class */ (function () {
    function AppUserAuth() {
        this.userName = '';
        this.bearerToken = '';
        this.isAuthenticated = false;
        this.claims = [];
        this.employee = new employee_dto_1.EmployeeDto();
    }
    return AppUserAuth;
}());
exports.AppUserAuth = AppUserAuth;
