"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateClientComponent = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var uuid_1 = require("uuid");
var CreateClientComponent = /** @class */ (function () {
    function CreateClientComponent(router, service) {
        this.router = router;
        this.service = service;
        this.renderValue = 'Client Add';
        this.clientResponse = new core_1.EventEmitter();
    }
    CreateClientComponent.prototype.save = function (client) {
        var _this = this;
        if (client.firstName) {
            client.clientId = uuid_1.v4();
            if (!client.password) {
                client.password = uuid_1.v4() + '@none.com';
            }
            this.service
                .addClient(client, environment_1.environment.mediaTypes.client.post.ContentType.postJson)
                .subscribe(function (result) {
                console.log(result);
                if (result.status == 201) {
                    if (_this.callType === 'modal') {
                        console.log(result.body);
                        _this.clientResponse.emit(result.body);
                    }
                    else {
                        _this.router.navigate(['/clients/list-client']);
                    }
                }
            }, function (err) {
                console.warn(err);
            });
        }
    };
    CreateClientComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input()
    ], CreateClientComponent.prototype, "callType");
    __decorate([
        core_1.Output()
    ], CreateClientComponent.prototype, "clientResponse");
    CreateClientComponent = __decorate([
        core_1.Component({
            selector: 'app-create-client',
            templateUrl: './create-client.component.html',
            styleUrls: ['./create-client.component.scss']
        })
    ], CreateClientComponent);
    return CreateClientComponent;
}());
exports.CreateClientComponent = CreateClientComponent;
