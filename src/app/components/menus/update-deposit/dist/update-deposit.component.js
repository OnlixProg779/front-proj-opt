"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateDepositComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var options_credit_movement_1 = require("../models/options-credit-movement");
var UpdateDepositComponent = /** @class */ (function () {
    function UpdateDepositComponent(activatedRoute, router, service) {
        var _this = this;
        this.router = router;
        this.service = service;
        this.optionsCreditMovement = new options_credit_movement_1.OptionsCreditMovement();
        this.renderValues = {
            renderValue: 'Deposit Update',
            clientId: '',
            renderAction: 'Update deposit'
        };
        this.creditMovementId = null;
        activatedRoute.params.subscribe(function (params) {
            _this.renderValues.clientId = params.clientId;
            _this.optionsCreditMovement.auxMediaTypeAccept = environment_1.environment.mediaTypes.creditMovement.getUnique.accept.getJson;
            _this.creditMovementId = params.creditMovementId;
            _this.initDataCreditMovement();
        });
    }
    UpdateDepositComponent.prototype.ngOnInit = function () { };
    UpdateDepositComponent.prototype.initDataCreditMovement = function () {
        var _this = this;
        var params = new http_1.HttpParams();
        if (this.optionsCreditMovement.fields != null) {
            params = params.append('Fields', this.optionsCreditMovement.fields);
        }
        this.service
            .getUniqueCreditMovements(this.creditMovementId, params, this.optionsCreditMovement.auxMediaTypeAccept)
            .subscribe(function (result) {
            if (!result) {
                return;
            }
            if (result.status == 200) {
                var deposit = null;
                if (_this.optionsCreditMovement.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                    deposit = result.body.value;
                }
                else {
                    deposit = result.body;
                }
                _this.modelo = deposit;
                _this.modelo.creditMovementsId = _this.creditMovementId;
            }
        }, function (err) {
            console.warn(err);
            _this.router.navigate['/deposits/list-deposit'];
        });
    };
    UpdateDepositComponent.prototype.save = function (deposit) {
        var _this = this;
        if (deposit.bankAccountId) {
            deposit.active = this.modelo.active;
            console.log(deposit);
            this.service
                .putCreditMovement(deposit.bankAccountId, this.creditMovementId, deposit, null, environment_1.environment.mediaTypes.creditMovement.put.ContentType.putJson)
                .subscribe(function (result) {
                console.log(result);
                if (result.status == 201) {
                    _this.router.navigate(['/clients/bills/', _this.renderValues.clientId]);
                }
            }, function (err) {
                console.warn(err);
            });
        }
    };
    UpdateDepositComponent = __decorate([
        core_1.Component({
            selector: 'app-update-deposit',
            templateUrl: './update-deposit.component.html',
            styleUrls: ['./update-deposit.component.scss']
        })
    ], UpdateDepositComponent);
    return UpdateDepositComponent;
}());
exports.UpdateDepositComponent = UpdateDepositComponent;
