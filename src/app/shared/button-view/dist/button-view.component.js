"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ButtonViewComponent = void 0;
var core_1 = require("@angular/core");
var ButtonViewComponent = /** @class */ (function () {
    function ButtonViewComponent() {
        this.renderValue = 'NULL';
        this.step = "bg-primary";
        this.styl = "";
        this.save = new core_1.EventEmitter();
    }
    ButtonViewComponent.prototype.ngOnInit = function () {
        this.separarData(this.value);
    };
    ButtonViewComponent.prototype.onClick = function () {
        this.save.emit(this.rowData);
    };
    ButtonViewComponent.prototype.separarData = function (value) {
        if (typeof value == 'string') {
            var aux = JSON.parse(value);
            this.renderValue = Object.values(aux)[0];
            this.step = Object.values(aux)[1];
            this.styl = Object.values(aux)[2];
        }
        else {
            this.renderValue = value;
        }
    };
    __decorate([
        core_1.Input()
    ], ButtonViewComponent.prototype, "value");
    __decorate([
        core_1.Input()
    ], ButtonViewComponent.prototype, "rowData");
    __decorate([
        core_1.Output()
    ], ButtonViewComponent.prototype, "save");
    ButtonViewComponent = __decorate([
        core_1.Component({
            selector: 'app-button-view',
            templateUrl: './button-view.component.html',
            styleUrls: ['./button-view.component.scss']
        })
    ], ButtonViewComponent);
    return ButtonViewComponent;
}());
exports.ButtonViewComponent = ButtonViewComponent;
