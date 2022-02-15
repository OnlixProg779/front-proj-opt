"use strict";
exports.__esModule = true;
exports.OptionsBankAccount = void 0;
var ng2_smart_table_1 = require("ng2-smart-table");
var OptionsBankAccount = /** @class */ (function () {
    function OptionsBankAccount() {
        this.pageSize = 15;
        this.currentPage = 1;
        this.showPerPage = 5;
        this.totalCount = 0;
        // media type
        this.auxMediaTypeAccept = null;
        this.auxMediaTypeContentType = null;
        // parameters de busqueda
        this.searchQuery = null;
        this.accountNumber = null;
        this.accountAlias = null;
        this.employeeReferenceId = null;
        this.accountOwner = null;
        this.dniAccountOwner = null;
        this.active = null;
        this.accountTypeId = null;
        this.bankId = null;
        // ordenamiento
        this.orderBy = null;
        // campos
        this.fields = null;
        this.source = new ng2_smart_table_1.LocalDataSource();
    }
    return OptionsBankAccount;
}());
exports.OptionsBankAccount = OptionsBankAccount;
