"use strict";
exports.__esModule = true;
exports.OptionsClient = void 0;
var ng2_smart_table_1 = require("ng2-smart-table");
var OptionsClient = /** @class */ (function () {
    function OptionsClient() {
        this.pageSize = 15;
        this.currentPage = 1;
        this.showPerPage = 5;
        this.totalCount = 0;
        // media type
        this.auxMediaTypeAccept = null;
        this.auxMediaTypeContentType = null;
        // parameters de busqueda
        this.type = null;
        this.searchQuery = null;
        this.serie = null;
        // ordenamiento
        this.orderBy = null;
        // campos
        this.fields = null;
        this.source = new ng2_smart_table_1.LocalDataSource();
    }
    return OptionsClient;
}());
exports.OptionsClient = OptionsClient;
