"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AutoFocusInvalidInputDirective = void 0;
var core_1 = require("@angular/core");
var AutoFocusInvalidInputDirective = /** @class */ (function () {
    function AutoFocusInvalidInputDirective(el) {
        this.el = el;
    }
    AutoFocusInvalidInputDirective.prototype.onFormSubmit = function () {
        var invalidInputControl = this.el.nativeElement.querySelector('.ng-invalid');
        if (invalidInputControl) {
            // invalidInputControl.classList.add('ng-touched');
            // invalidInputControl.classList.remove('ng-untouched');
            invalidInputControl.focus();
            // invalidInputControl.removeClass('ng-untouched');
            // invalidInputControl.addClass('ng-touched');
        }
    };
    __decorate([
        core_1.HostListener('submit')
    ], AutoFocusInvalidInputDirective.prototype, "onFormSubmit");
    AutoFocusInvalidInputDirective = __decorate([
        core_1.Directive({
            selector: '[appAutoFocusInvalidInput]'
        })
    ], AutoFocusInvalidInputDirective);
    return AutoFocusInvalidInputDirective;
}());
exports.AutoFocusInvalidInputDirective = AutoFocusInvalidInputDirective;
