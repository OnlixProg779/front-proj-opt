"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreditMovementsService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var API_URL = environment_1.environment.apiURL + '/api/account/';
var CreditMovementsService = /** @class */ (function () {
    function CreditMovementsService(http) {
        this.http = http;
    }
    // GET /api/account/{bankAccountId}/CreditMovement
    CreditMovementsService.prototype.getBankAccountCreditMovements = function (bankAccountId, params, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + bankAccountId + '/CreditMovement/', {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        })
            .pipe(operators_1.tap(function (resp) {
            if (resp.status == 200) {
                //   this.eTag = JSON.parse(resp.headers.get("ETag"));
                //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
            }
        }), operators_1.catchError(this.handleError));
    };
    // GET ALL 
    CreditMovementsService.prototype.getAllCreditMovements = function (params, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'all' + '/AllCreditMovement/', {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        })
            .pipe(operators_1.tap(function (resp) {
            if (resp.status == 200) {
                //   this.eTag = JSON.parse(resp.headers.get("ETag"));
                //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
            }
        }), operators_1.catchError(this.handleError));
    };
    // POST /api/account/{bankAccountId}/CreditMovement
    CreditMovementsService.prototype.addCreditMovement = function (bankAccountId, entity, auxMediaType) {
        var formData = this.initFormDataCreate(entity);
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.post("" + API_URL + bankAccountId + "/CreditMovement", formData, {
            observe: 'response',
            responseType: 'json'
        });
    };
    CreditMovementsService.prototype.initFormDataCreate = function (entity) {
        var formData = new FormData();
        if (entity.depositDate) {
            formData.append('depositDate', entity.depositDate.toString());
        }
        if (entity.image) {
            formData.append('image', entity.image);
        }
        if (entity.document) {
            formData.append('document', entity.document);
        }
        if (entity.value) {
            formData.append('value', entity.value.toString());
        }
        if (entity.bankAccountId) {
            formData.append('bankAccountId', entity.bankAccountId);
        }
        if (entity.creditReasonId) {
            formData.append('creditReasonId', entity.creditReasonId);
        }
        if (entity.creditMovementStatusId) {
            formData.append('creditMovementStatusId', entity.creditMovementStatusId);
        }
        if (entity.clientId) {
            formData.append('clientId', entity.clientId);
        }
        return formData;
    };
    // GET ID /api/account/{bankAccountId}/CreditMovement/{creditMovementId}
    CreditMovementsService.prototype.getUniqueBankAccountCreditMovements = function (bankAccountId, creditMovementId, params, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + bankAccountId + '/CreditMovement/' + creditMovementId, {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        })
            .pipe(operators_1.tap(function (resp) {
            if (resp.status == 200) {
                //   this.eTag = JSON.parse(resp.headers.get("ETag"));
                //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
            }
        }), operators_1.catchError(this.handleError));
    };
    // GET ID UNIQUE ALL /api/account/all/AllCreditMovement/{creditMovementId}
    CreditMovementsService.prototype.getUniqueCreditMovements = function (creditMovementId, params, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'all' + '/AllCreditMovement/' + creditMovementId, {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        })
            .pipe(operators_1.tap(function (resp) {
            if (resp.status == 200) {
                //   this.eTag = JSON.parse(resp.headers.get("ETag"));
                //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
            }
        }), operators_1.catchError(this.handleError));
    };
    // POST Verifi deposit by system /api/account/all/AllCreditMovement
    CreditMovementsService.prototype.verifiAutomaticallyCreditMovements = function (ids, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.post(API_URL + "All/AllCreditMovement", ids, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    //PATCH /api/account/{bankAccountId}/CreditMovement/{creditMovementId}
    CreditMovementsService.prototype.patchCreditMovement = function (bankAccountId, creditMovementId, toPatch, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.patch("" + API_URL + bankAccountId + "/CreditMovement/" + creditMovementId, toPatch, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    //PUT (DELETE - RESTORE) /api/account/{bankAccountId}/CreditMovement/{creditMovementId}
    CreditMovementsService.prototype.putDeleteOrRestoreCreditMovement = function (bankAccountId, creditMovementId, params, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.put("" + API_URL + bankAccountId + "/CreditMovement/" + creditMovementId, null, {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        });
    };
    // PUT (UPDATE) /api/account/{bankAccountId}/CreditMovement/{creditMovementId}/updt
    CreditMovementsService.prototype.putCreditMovement = function (bankAccountId, creditMovementId, entity, params, auxMediaType) {
        var formData = this.initFormDataUpdate(entity);
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.put("" + API_URL + bankAccountId + "/CreditMovement/" + creditMovementId + "/updt", formData, {
            observe: 'response',
            responseType: 'json',
            params: params
        });
    };
    CreditMovementsService.prototype.initFormDataUpdate = function (entity) {
        var formData = new FormData();
        if (entity.depositDate) {
            formData.append('depositDate', entity.depositDate.toString());
        }
        if (entity.image) {
            formData.append('image', entity.image);
        }
        if (entity.document) {
            formData.append('document', entity.document);
        }
        if (entity.value) {
            formData.append('value', entity.value.toString());
        }
        if (entity.bankAccountId) {
            formData.append('bankAccountId', entity.bankAccountId);
        }
        if (entity.creditReasonId) {
            formData.append('creditReasonId', entity.creditReasonId);
        }
        if (entity.creditMovementStatusId) {
            formData.append('creditMovementStatusId', entity.creditMovementStatusId);
        }
        if (entity.clientId) {
            formData.append('clientId', entity.clientId);
        }
        if (entity.verifiedType) {
            formData.append('verifiedType', entity.verifiedType);
        }
        if (entity.creditMovementsImportedId) {
            formData.append('creditMovementsImportedId', entity.creditMovementsImportedId);
        }
        if (entity.active) {
            formData.append('active', 'true');
        }
        else {
            formData.append('active', 'false');
        }
        return formData;
    };
    // CREDIT MOVEMENTS IMPORTED
    // POST  /api/account/{bankReferenceId}/CreditMovementsImported
    CreditMovementsService.prototype.uploadCreditMovementsImported = function (entity, bankReferenceId, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        console.log("entreo qwq");
        return this.http.post("" + API_URL + bankReferenceId + "/CreditMovementsImported", entity, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // GET /api/account/{bankReferenceId}/CreditMovementsImported
    CreditMovementsService.prototype.getAllCreditMovementsImported = function (bankReferenceId, params, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + bankReferenceId + '/CreditMovementsImported/', {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        })
            .pipe(operators_1.tap(function (resp) {
            if (resp.status == 200) {
                //   this.eTag = JSON.parse(resp.headers.get("ETag"));
                //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
            }
        }), operators_1.catchError(this.handleError));
    };
    // GET ID /api/account/{bankReferenceId}/CreditMovementsImported/{creditMovementsImportedId}
    CreditMovementsService.prototype.getUniqueCreditMovementImported = function (params, bankReferenceId, creditMovementsImportedId, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + bankReferenceId + '/CreditMovementsImported/' + creditMovementsImportedId, {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        })
            .pipe(operators_1.tap(function (resp) {
            if (resp.status == 200) {
                //   this.eTag = JSON.parse(resp.headers.get("ETag"));
                //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
            }
        }), operators_1.catchError(this.handleError));
    };
    // PATCH /api/account/{bankReferenceId}/CreditMovementsImported/{creditMovementsImportedId}
    // ERROR
    CreditMovementsService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('(Handle Error en client.service) An error occurred:', error.error.message);
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
    CreditMovementsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CreditMovementsService);
    return CreditMovementsService;
}());
exports.CreditMovementsService = CreditMovementsService;
