"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DepositService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var API_URL = environment_1.environment.apiURL + '/api/clients/';
var httpOptions = {
    headers: new http_1.HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
    })
};
var DepositService = /** @class */ (function () {
    function DepositService(http) {
        this.http = http;
    }
    DepositService.prototype.geAllDeposits = function (pageNumber, pageSize, searchQuery, accept) {
        var headers;
        this.eTag = localStorage.getItem('If-None-Match-get-all-deposits');
        var params = new http_1.HttpParams();
        params = params.append('PageNumber', pageNumber.toString());
        params = params.append('PageSize', pageSize.toString());
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + accept,
            'If-None-Match': "\"" + this.eTag + "\""
        });
        if (searchQuery) {
            params = params.append('SearchQuery', searchQuery);
        }
        return this.http
            .get(API_URL + "AllDeposits", {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        })
            .pipe(operators_1.tap(function (resp) {
            if (resp.status == 200) {
                //   this.eTag = JSON.parse(resp.headers.get("ETag"));
                //    localStorage.setItem('If-None-Match-get-deposits', this.eTag);
            }
        }), operators_1.catchError(this.handleError));
    };
    DepositService.prototype.getAllDepositsOfClient = function (pageNumber, pageSize, searchQuery, accept, clientId) {
        var headers;
        var params = new http_1.HttpParams();
        params = params.append('PageNumber', pageNumber.toString());
        params = params.append('PageSize', pageSize.toString());
        this.eTag = localStorage.getItem('If-None-Match-get-deposits');
        //   console.log(this.eTag);
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + accept,
            'If-None-Match': "\"" + this.eTag + "\""
        });
        if (searchQuery) {
            params = params.append('SearchQuery', searchQuery);
        }
        return this.http
            .get("" + API_URL + clientId + "/Deposit", {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        })
            .pipe(operators_1.tap(function (resp) {
            if (resp.status == 200) {
                //   this.eTag = JSON.parse(resp.headers.get("ETag"));
                //    localStorage.setItem('If-None-Match-get-deposits', this.eTag);
                //    almacenamiento en cache: https://es.coredump.biz/questions/49797910/angular-5-caching-http-service-api-calls
            }
        }), operators_1.catchError(this.handleError));
    };
    DepositService.prototype.getDeposit = function (clientId, depositId) {
        var headers;
        this.eTag = localStorage.getItem('If-None-Match-get-deposits');
        //   console.log(this.eTag);
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "application/json",
            'If-None-Match': "\"" + this.eTag + "\""
        });
        return this.http.get("" + API_URL + clientId + "/Deposit/" + depositId, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // Inicia lo necesario para enviar imagenes al servidor.
    DepositService.prototype.addDeposit = function (clientId, entity) {
        var formData = this.initFormDataCreate(entity);
        // console.log(formData);
        return this.http.post("" + API_URL + clientId + "/Deposit", formData);
    };
    DepositService.prototype.initFormDataCreate = function (entity) {
        var formData = new FormData();
        if (entity.bank) {
            formData.append('bank', entity.bank);
        }
        if (entity.image) {
            formData.append('image', entity.image);
        }
        if (entity.nRef) {
            formData.append('nRef', entity.nRef);
        }
        if (entity.verified) {
            formData.append('verified', entity.verified);
        }
        if (entity.userVerified) {
            formData.append('userVerified', entity.userVerified);
        }
        if (entity.amount) {
            formData.append('amount', entity.amount.toString());
        }
        return formData;
    };
    DepositService.prototype.updateDeposit = function (clientId, entity) {
        var httpOpt = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'multipart/form-data; boundary',
                Accept: 'application/json'
            })
        };
        var formData = this.initFormDataUpdate(entity);
        return this.http.put("" + API_URL + clientId + "/Deposit/" + entity.depositId, formData);
    };
    DepositService.prototype.initFormDataUpdate = function (entity) {
        var formData = new FormData();
        if (entity.depositId) {
            formData.append('depositId', entity.depositId);
        }
        if (entity.clientId) {
            formData.append('clientId', entity.clientId);
        }
        if (entity.active) {
            formData.append('active', 'true');
        }
        else {
            formData.append('active', 'false');
        }
        if (entity.bank) {
            formData.append('bank', entity.bank);
        }
        if (entity.image) {
            formData.append('image', entity.image);
        }
        if (entity.nRef) {
            formData.append('nRef', entity.nRef);
        }
        if (entity.verified) {
            formData.append('verified', entity.verified);
        }
        if (entity.userVerified) {
            formData.append('userVerified', entity.userVerified);
        }
        if (entity.amount) {
            formData.append('amount', entity.amount.toString());
        }
        return formData;
    };
    DepositService.prototype.deleteDeposit = function (clientId, entityId, vendor) {
        var httpOptionsPatch = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json-patch+json',
                Accept: 'application/json'
            })
        };
        var active = [
            {
                path: '/Active',
                op: 'replace',
                value: false
            },
            {
                path: '/Verified',
                op: 'replace',
                value: "FALSE"
            },
            {
                path: '/UserVerified',
                op: 'replace',
                value: vendor
            },
        ];
        return this.http.patch("" + API_URL + clientId + "/Deposit/" + entityId, active, httpOptionsPatch);
    };
    DepositService.prototype.restoreDeposit = function (clientId, entityId, vendor) {
        var httpOptionsPatch = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json-patch+json',
                Accept: 'application/json'
            })
        };
        var active = [
            {
                path: '/Active',
                op: 'replace',
                value: true
            },
            {
                path: '/Verified',
                op: 'replace',
                value: "FALSE"
            },
            {
                path: '/UserVerified',
                op: 'replace',
                value: vendor
            },
        ];
        return this.http.patch("" + API_URL + clientId + "/Deposit/" + entityId, active, httpOptionsPatch);
    };
    DepositService.prototype.verifiedDeposit = function (clientId, entityId, vendor) {
        var httpOptionsPatch = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json-patch+json',
                Accept: 'application/json'
            })
        };
        var active = [
            {
                path: '/Active',
                op: 'replace',
                value: true
            },
            {
                path: '/Verified',
                op: 'replace',
                value: "TRUE"
            },
            {
                path: '/UserVerified',
                op: 'replace',
                value: vendor
            },
        ];
        return this.http.patch("" + API_URL + clientId + "/Deposit/" + entityId, active, httpOptionsPatch);
    };
    DepositService.prototype.unverifiedDeposit = function (clientId, entityId, vendor) {
        var httpOptionsPatch = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json-patch+json',
                Accept: 'application/json'
            })
        };
        var active = [
            {
                path: '/Active',
                op: 'replace',
                value: true
            },
            {
                path: '/Verified',
                op: 'replace',
                value: "FALSE"
            },
            {
                path: '/UserVerified',
                op: 'replace',
                value: vendor
            },
        ];
        return this.http.patch("" + API_URL + clientId + "/Deposit/" + entityId, active, httpOptionsPatch);
    };
    DepositService.prototype.notFoundDeposit = function (clientId, entityId, vendor) {
        var httpOptionsPatch = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json-patch+json',
                Accept: 'application/json'
            })
        };
        var active = [
            {
                path: '/Active',
                op: 'replace',
                value: false
            },
            {
                path: '/Verified',
                op: 'replace',
                value: "TRUE"
            },
            {
                path: '/UserVerified',
                op: 'replace',
                value: vendor
            },
        ];
        return this.http.patch("" + API_URL + clientId + "/Deposit/" + entityId, active, httpOptionsPatch);
    };
    // ERROR
    DepositService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('(Handle Error en deposit.service) An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error("Backend returned code " + error.status + " " + error.statusText + ", " +
                ("body was: " + error.error));
        }
        // Return an observable with a user-facing error message.
        return rxjs_1.throwError('Something bad happened; please try again later.');
    };
    DepositService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DepositService);
    return DepositService;
}());
exports.DepositService = DepositService;
