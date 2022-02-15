"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CheckBoxViewComponent = void 0;
var core_1 = require("@angular/core");
var CheckBoxViewComponent = /** @class */ (function () {
    function CheckBoxViewComponent() {
        // @Output() save: EventEmitter<any> = new EventEmitter();
        this.eventEmit = new core_1.EventEmitter();
    }
    CheckBoxViewComponent.prototype.ngOnInit = function () {
    };
    CheckBoxViewComponent.prototype.onCheckboxChange = function (event) {
        //   this.save.emit(this.rowData);
        this.eventEmit.emit(event.target.checked);
    };
    __decorate([
        core_1.Input()
    ], CheckBoxViewComponent.prototype, "value");
    __decorate([
        core_1.Input()
    ], CheckBoxViewComponent.prototype, "rowData");
    __decorate([
        core_1.Output()
    ], CheckBoxViewComponent.prototype, "eventEmit");
    CheckBoxViewComponent = __decorate([
        core_1.Component({
            selector: 'app-check-box-view',
            templateUrl: './check-box-view.component.html',
            styleUrls: ['./check-box-view.component.scss']
        })
    ], CheckBoxViewComponent);
    return CheckBoxViewComponent;
}());
exports.CheckBoxViewComponent = CheckBoxViewComponent;
