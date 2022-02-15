"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.SentActionPatchDeposit = exports.ResourceMultiSel = exports.MultiSelComponent = void 0;
var core_1 = require("@angular/core");
var MultiSelComponent = /** @class */ (function () {
    function MultiSelComponent(papa) {
        this.papa = papa;
        this.model = new ResourceMultiSel();
        this.save = new core_1.EventEmitter();
    }
    MultiSelComponent.prototype.ngOnInit = function () {
        // let csvData = '"Hello","World!"';
        // let options = {
        //   complete: (results, file) => {
        //     console.log('Parsed: ', results, file);
        //   }
        //   // Add your options here
        // };
        // this.papa.parse(csvData, options);
        this.separarData(this.value);
    };
    MultiSelComponent.prototype.separarData = function (value) {
        this.model.action = value.action;
        this.model.renderOptions = value.renderOptions;
        this.model.stepClass = value.stepClass;
        this.model.styl = value.styl;
    };
    MultiSelComponent.prototype.onClick = function (action) {
        var aux = new SentActionPatchDeposit();
        aux.entity = this.rowData;
        aux.option = action;
        this.save.emit(aux);
    };
    // LOAD CSV FILE FROM INPUT
    MultiSelComponent.prototype.fileChangeListener = function ($event) {
        var _this = this;
        var files = $event.srcElement.files;
        if (files !== null && files !== undefined && files.length > 0) {
            this.selectedCSVFileName = files[0].name;
            var reader_1 = new FileReader();
            reader_1.readAsText(files[0], 'utf-8');
            reader_1.onload = function (e) {
                var csv = reader_1.result;
                var results = _this.papa.parse(csv, {
                    header: false,
                    encoding: "utf-8"
                });
                // VALIDATE PARSED CSV FILE
                if (results !== null && results !== undefined && results.data !== null &&
                    results.data !== undefined && results.data.length > 0 && results.errors.length === 0) {
                    _this.isCSV_Valid = true;
                    // PERFORM OPERATIONS ON PARSED CSV
                    var aux = new SentActionPatchDeposit();
                    aux.csvTableHeader = results.data[0];
                    aux.csvTableData = __spreadArrays(results.data.slice(1, results.data.length));
                    //
                    aux.entity = _this.rowData;
                    aux.option = "FILE UPLOAD";
                    _this.save.emit(aux);
                    //
                    //this.filterCreditMovements(csvTableData);
                    //this.filterDebitMovements(csvTableData);
                }
                else {
                    for (var i = 0; i < results.errors.length; i++) {
                        console.log('Error Parsing CSV File: ', results.errors[i].message);
                    }
                }
            };
        }
        else {
            console.log('No File Selected');
        }
    };
    __decorate([
        core_1.Input()
    ], MultiSelComponent.prototype, "value");
    __decorate([
        core_1.Input()
    ], MultiSelComponent.prototype, "rowData");
    __decorate([
        core_1.Output()
    ], MultiSelComponent.prototype, "save");
    MultiSelComponent = __decorate([
        core_1.Component({
            selector: 'app-multi-sel',
            templateUrl: './multi-sel.component.html',
            styleUrls: ['./multi-sel.component.scss']
        })
    ], MultiSelComponent);
    return MultiSelComponent;
}());
exports.MultiSelComponent = MultiSelComponent;
var ResourceMultiSel = /** @class */ (function () {
    function ResourceMultiSel() {
    }
    return ResourceMultiSel;
}());
exports.ResourceMultiSel = ResourceMultiSel;
var SentActionPatchDeposit = /** @class */ (function () {
    function SentActionPatchDeposit() {
    }
    return SentActionPatchDeposit;
}());
exports.SentActionPatchDeposit = SentActionPatchDeposit;
