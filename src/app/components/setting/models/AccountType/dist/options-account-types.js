"use strict";
exports.__esModule = true;
exports.OptionsAccountTypes = void 0;
var ng2_smart_table_1 = require("ng2-smart-table");
var OptionsAccountTypes = /** @class */ (function () {
    function OptionsAccountTypes() {
        this.pageSize = 15;
        this.currentPage = 1;
        this.showPerPage = 5;
        this.totalCount = 0;
        // media type
        this.auxMediaTypeAccept = null;
        this.auxMediaTypeContentType = null;
        // parameters de busqueda
        this.searchQuery = null;
        this.active = null;
        // ordenamiento
        this.orderBy = null;
        // campos
        this.fields = null;
        this.source = new ng2_smart_table_1.LocalDataSource();
    }
    return OptionsAccountTypes;
}());
exports.OptionsAccountTypes = OptionsAccountTypes;
