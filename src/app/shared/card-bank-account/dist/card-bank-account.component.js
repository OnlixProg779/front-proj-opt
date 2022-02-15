"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CardBankAccountComponent = void 0;
var core_1 = require("@angular/core");
var CardBankAccountComponent = /** @class */ (function () {
    function CardBankAccountComponent() {
        this.address = new core_1.EventEmitter();
    }
    CardBankAccountComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], CardBankAccountComponent.prototype, "bankSelected");
    __decorate([
        core_1.Input()
    ], CardBankAccountComponent.prototype, "title");
    __decorate([
        core_1.Output()
    ], CardBankAccountComponent.prototype, "address");
    CardBankAccountComponent = __decorate([
        core_1.Component({
            selector: 'app-card-bank-account',
            templateUrl: './card-bank-account.component.html',
            styleUrls: ['./card-bank-account.component.scss']
        })
    ], CardBankAccountComponent);
    return CardBankAccountComponent;
}());
exports.CardBankAccountComponent = CardBankAccountComponent;
