"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateClientComponent = void 0;
var core_1 = require("@angular/core");
var user_create_dto_1 = require("src/app/shared/models/user-create-dto");
var app_user_claims_1 = require("../../auth/models/app-user-claims");
var uuid_1 = require("uuid");
var http_1 = require("@angular/common/http");
var options_client_1 = require("../models/options-client");
var environment_1 = require("src/environments/environment");
var jwt_decode_1 = require("jwt-decode");
var UpdateClientComponent = /** @class */ (function () {
    function UpdateClientComponent(activatedRoute, router, service) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.service = service;
        this.renderValue = 'Client Update';
        this.optionCheked = '';
        this.optionChekedGender = '';
        this.optionsClient = new options_client_1.OptionsClient();
    }
    UpdateClientComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (params) {
            var params2 = new http_1.HttpParams();
            var decoded = jwt_decode_1["default"](sessionStorage.getItem('bearerToken'));
            // throw new Error('Method not implemented.');
            if (decoded.CanAccessManage == 'true') {
                _this.optionsClient.auxMediaTypeAccept = environment_1.environment.mediaTypes.client.get.accept.getAllclientToOwnerJson;
            }
            else {
                _this.optionsClient.auxMediaTypeAccept = environment_1.environment.mediaTypes.client.get.accept.getAllclientToEmployeeAJson;
            }
            _this.service
                .getUniqueClient(params2, params.idClient, _this.optionsClient.auxMediaTypeAccept)
                .subscribe(function (result) {
                if (!result) {
                    return;
                }
                if (result.status == 200) {
                    if (_this.optionsClient.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                        _this.modelo = result.body.value;
                        _this.modelo.clientId = params.idClient;
                        _this.optionCheked = _this.modelo.type;
                        _this.optionChekedGender = _this.modelo.gender;
                    }
                    else {
                        _this.modelo = result.body;
                        _this.modelo.clientId = params.idClient;
                        _this.optionCheked = _this.modelo.type;
                        _this.optionChekedGender = _this.modelo.gender;
                    }
                }
            }, function (err) {
                console.warn(err);
                _this.router.navigate['/clients/list-client'];
            });
        });
    };
    UpdateClientComponent.prototype.save = function (client) {
        var _this = this;
        client.active = this.modelo.active;
        console.log(client);
        var clientUpdate;
        if (client.confirmPwd == client.passwordReal) {
            clientUpdate = client;
            clientUpdate.user = new user_create_dto_1.UserCreateDto();
            clientUpdate.user.userClaims.push(new app_user_claims_1.AppUserClaims());
            clientUpdate.user.userName = client.userName;
            clientUpdate.user.password = client.passwordReal;
            clientUpdate.clientId = this.modelo.clientId;
            clientUpdate.userId = this.modelo.userId;
            clientUpdate.user.active = this.modelo.user.active;
            clientUpdate.user.userId = this.modelo.user.userId;
            clientUpdate.user.userClaims[0].claimType = 'CanAccessUserCl';
            clientUpdate.user.userClaims[0].claimValue = client.claimValueClient;
            if (this.modelo.user.userClaims.length > 0) {
                clientUpdate.user.userClaims[0].claimId = this.modelo.user.userClaims[0].claimId;
                clientUpdate.user.userClaims[0].userId = this.modelo.user.userClaims[0].userId;
            }
            else {
                clientUpdate.user.userClaims[0].claimId = uuid_1.v4();
                clientUpdate.user.userClaims[0].userId = this.modelo.userId;
            }
            console.log(clientUpdate);
            this.service
                .updateClient(client, environment_1.environment.mediaTypes.client.put.ContentType.putJson)
                .subscribe(function (result) {
                console.log(result);
                if (result.status == 201) {
                    console.log("Actualizado");
                    _this.router.navigate(['/clients/list-client']);
                }
            }, function (err) {
                console.warn(err);
            });
        }
        else {
        }
    };
    UpdateClientComponent = __decorate([
        core_1.Component({
            selector: 'app-update-client',
            templateUrl: './update-client.component.html',
            styleUrls: ['./update-client.component.scss']
        })
    ], UpdateClientComponent);
    return UpdateClientComponent;
}());
exports.UpdateClientComponent = UpdateClientComponent;
