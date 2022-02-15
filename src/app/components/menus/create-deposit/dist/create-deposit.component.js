"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateDepositComponent = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var CreateDepositComponent = /** @class */ (function () {
    function CreateDepositComponent(router, service, activatedRouter) {
        var _this = this;
        this.router = router;
        this.service = service;
        this.renderValues = {
            renderValue: 'Deposit Add',
            clientId: '',
            renderAction: 'Add new deposit'
        };
        activatedRouter.params.subscribe(function (params) {
            _this.renderValues.clientId = params.clientId;
            console.log(_this.renderValues.clientId);
        });
    }
    CreateDepositComponent.prototype.save = function (depositCreateDto) {
        var _this = this;
        if (depositCreateDto.bankAccountId) {
            if (this.renderValues.clientId == '' ||
                this.renderValues.clientId == null ||
                this.renderValues.clientId == 'undefined') {
                this.renderValues.clientId = depositCreateDto.clientId;
            }
            console.log(depositCreateDto);
            this.service
                .addCreditMovement(depositCreateDto.bankAccountId, depositCreateDto, environment_1.environment.mediaTypes.creditMovement.post.ContentType.postJson)
                .subscribe(function () {
                _this.router.navigate(['/clients/bills/', _this.renderValues.clientId]);
            });
        }
        else {
        }
    };
    CreateDepositComponent.prototype.ngOnInit = function () { };
    CreateDepositComponent = __decorate([
        core_1.Component({
            selector: 'app-create-deposit',
            templateUrl: './create-deposit.component.html',
            styleUrls: ['./create-deposit.component.scss']
        })
    ], CreateDepositComponent);
    return CreateDepositComponent;
}());
exports.CreateDepositComponent = CreateDepositComponent;
