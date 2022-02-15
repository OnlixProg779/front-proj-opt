"use strict";
exports.__esModule = true;
exports.OptionsCreditMovementsImported = void 0;
var ng2_smart_table_1 = require("ng2-smart-table");
var OptionsCreditMovementsImported = /** @class */ (function () {
    function OptionsCreditMovementsImported() {
        this.pageSize = 45;
        this.currentPage = 1;
        this.showPerPage = 15;
        this.totalCount = 0;
        // media type
        this.auxMediaTypeAccept = null;
        this.auxMediaTypeContentType = null;
        // parameters de busqueda
        this.searchQuery = null;
        this.date = null;
        this.office = null;
        this.description = null;
        this.value = null;
        this.verified = null;
        this.document = null;
        this.bankIdReference = null;
        this.active = null;
        // ordenamiento
        this.orderBy = null;
        // campos
        this.fields = null;
        this.source = new ng2_smart_table_1.LocalDataSource();
    }
    return OptionsCreditMovementsImported;
}());
exports.OptionsCreditMovementsImported = OptionsCreditMovementsImported;
