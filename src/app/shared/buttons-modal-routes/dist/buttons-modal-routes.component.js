"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PropertiesButton = exports.ButtonsModalRoutesComponent = void 0;
var core_1 = require("@angular/core");
var ButtonsModalRoutesComponent = /** @class */ (function () {
    function ButtonsModalRoutesComponent() {
    }
    ButtonsModalRoutesComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], ButtonsModalRoutesComponent.prototype, "properties");
    __decorate([
        core_1.Input()
    ], ButtonsModalRoutesComponent.prototype, "modal");
    ButtonsModalRoutesComponent = __decorate([
        core_1.Component({
            selector: 'app-buttons-modal-routes',
            templateUrl: './buttons-modal-routes.component.html',
            styleUrls: ['./buttons-modal-routes.component.scss']
        })
    ], ButtonsModalRoutesComponent);
    return ButtonsModalRoutesComponent;
}());
exports.ButtonsModalRoutesComponent = ButtonsModalRoutesComponent;
var PropertiesButton = /** @class */ (function () {
    function PropertiesButton(number, tittle, classNg, route, icon, iconClass, style) {
        this.number = number;
        this.tittle = tittle;
        this.classNg = classNg;
        this.route = route;
        this.icon = icon;
        this.iconClass = iconClass;
        this.style = style;
    }
    return PropertiesButton;
}());
exports.PropertiesButton = PropertiesButton;
