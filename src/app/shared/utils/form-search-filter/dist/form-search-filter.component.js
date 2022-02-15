"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FormSearchFilterComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var FormSearchFilterComponent = /** @class */ (function () {
    function FormSearchFilterComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.filterThrottle = new rxjs_1.Subject();
        this.filterNumber = new rxjs_1.Subject();
        this.submit = new core_1.EventEmitter();
        this.submitNumber = new core_1.EventEmitter();
        this.createFilterSearchForm();
    }
    FormSearchFilterComponent.prototype.createFilterSearchForm = function () {
        this.filterSearchForm = this.formBuilder.group({
            searchQuery: [''],
            searchNumber: ['']
        });
    };
    FormSearchFilterComponent.prototype.searchFilter = function (action, search) {
        console.log(search);
        if (action == 'button' && search == 'button') {
            this.searchQuery = this.filterSearchForm.controls['searchQuery'].value;
            this.searchNumber = this.filterSearchForm.controls['searchNumber'].value;
            if (this.searchQuery) {
                this.submit.emit(this.searchQuery);
            }
            else {
                this.submitNumber.emit(this.searchNumber);
            }
        }
        else if (search == 'searchQuery') {
            this.submit.emit(action);
        }
        else if (search == 'searchNumber') {
            console.log("Entro");
            this.submitNumber.emit(action);
        }
    };
    FormSearchFilterComponent.prototype.vaciarInputQuery = function () {
        this.filterSearchForm.controls['searchQuery'].setValue("");
    };
    FormSearchFilterComponent.prototype.vaciarInputNumber = function () {
        this.filterSearchForm.controls['searchNumber'].setValue("");
    };
    FormSearchFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filterThrottle.pipe(operators_1.debounceTime(1000)).subscribe(function (input) {
            _this.submit.emit(null);
            _this.searchFilter(input, "searchQuery");
        });
        this.filterNumber.pipe(operators_1.debounceTime(1000)).subscribe(function (input) {
            _this.submitNumber.emit(null);
            _this.searchFilter(input, "searchNumber");
        });
    };
    __decorate([
        core_1.Output()
    ], FormSearchFilterComponent.prototype, "submit");
    __decorate([
        core_1.Output()
    ], FormSearchFilterComponent.prototype, "submitNumber");
    FormSearchFilterComponent = __decorate([
        core_1.Component({
            selector: 'app-form-search-filter',
            templateUrl: './form-search-filter.component.html',
            styleUrls: ['./form-search-filter.component.scss']
        })
    ], FormSearchFilterComponent);
    return FormSearchFilterComponent;
}());
exports.FormSearchFilterComponent = FormSearchFilterComponent;
