"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MenusService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var http_1 = require("@angular/common/http");
var API_URL = environment_1.environment.apiURL + '/api/lists/';
var MenusService = /** @class */ (function () {
    function MenusService(http) {
        this.http = http;
    }
    // AccountType
    // get all /api/lists/AccountType
    MenusService.prototype.getAllOAccountTypes = function (params, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'AccountType/', {
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
    // get id /api/lists/AccountType/{accountTypeId}
    MenusService.prototype.getUniqueOAccountTypes = function (params, accountTypeId, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'AccountType/' + accountTypeId, {
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
    // patch /api/lists/AccountType/{accountTypeId}
    MenusService.prototype.patchAccountType = function (toPatch, accountTypeId, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.patch(API_URL + "AccountType/" + accountTypeId, toPatch, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // put /api/lists/AccountType/{accountTypeId}
    MenusService.prototype.putDeleteOrRestoreAccountType = function (accountTypeId, params, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.put(API_URL + "AccountType/" + accountTypeId, null, {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        });
    };
    // post /api/lists/AccountType
    MenusService.prototype.addAccountType = function (entity, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.post(API_URL + "AccountType", entity, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // Bank
    // get all /api/lists/Bank
    MenusService.prototype.getAllBanks = function (params, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'Bank/', {
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
    // get id /api/lists/Bank/{bankId}
    MenusService.prototype.getUniqueOBanks = function (params, bankId, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'Bank/' + bankId, {
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
    // patch /api/lists/Bank/{bankId}
    MenusService.prototype.patchBank = function (toPatch, bankId, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.patch(API_URL + "Bank/" + bankId, toPatch, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // put /api/lists/Bank/{bankId}
    MenusService.prototype.putDeleteOrRestoreBank = function (bankId, params, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.put(API_URL + "Bank/" + bankId, null, {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        });
    };
    // post /api/lists/Bank
    MenusService.prototype.addBank = function (entity, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.post(API_URL + "Bank", entity, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // CreditMovementStatus
    // get all /api/lists/CreditMovementStatus
    MenusService.prototype.getAllCreditMovementStatus = function (params, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'CreditMovementStatus/', {
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
    // get id /api/lists/CreditMovementStatus/{creditMovementStatusId}
    MenusService.prototype.getUniqueCreditMovementStatus = function (params, creditMovementStatusId, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'CreditMovementStatus/' + creditMovementStatusId, {
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
    // patch /api/lists/CreditMovementStatus/{creditMovementStatusId}
    MenusService.prototype.patchCreditMovementStatus = function (toPatch, creditMovementStatusId, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.patch(API_URL + "CreditMovementStatus/" + creditMovementStatusId, toPatch, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // put /api/lists/CreditMovementStatus/{creditMovementStatusId}
    MenusService.prototype.putDeleteOrRestoreCreditMovementStatus = function (creditMovementStatusId, params, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.put(API_URL + "CreditMovementStatus/" + creditMovementStatusId, null, {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        });
    };
    // post /api/lists/CreditMovementStatus
    MenusService.prototype.addCreditMovementStatus = function (entity, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.post(API_URL + "CreditMovementStatus", entity, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // Credit Reason
    // get all /api/lists/CreditReason
    MenusService.prototype.getAllCreditReasons = function (params, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'CreditReason/', {
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
    // get id /api/lists/CreditReason/{creditReasonId}
    MenusService.prototype.getUniqueOCreditReason = function (params, creditReasonId, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'CreditReason/' + creditReasonId, {
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
    // patch /api/lists/CreditReason/{creditReasonId}
    MenusService.prototype.patchCreditReason = function (toPatch, creditReasonId, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.patch(API_URL + "CreditReason/" + creditReasonId, toPatch, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // put /api/lists/CreditReason/{creditReasonId}
    MenusService.prototype.putDeleteOrRestoreCreditReason = function (creditReasonId, params, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.put(API_URL + "CreditReason/" + creditReasonId, null, {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        });
    };
    // post /api/lists/CreditReason
    MenusService.prototype.addCreditReason = function (entity, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.post(API_URL + "CreditReason", entity, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // DebitMovementStatus
    // get all /api/lists/DebitMovementStatus
    MenusService.prototype.getAllDebitMovementStatus = function (params, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'DebitMovementStatus/', {
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
    // get id /api/lists/DebitMovementStatus/{debitMovementStatusId}
    MenusService.prototype.getUniqueDebitMovementStatus = function (params, debitMovementStatusId, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'DebitMovementStatus/' + debitMovementStatusId, {
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
    // patch /api/lists/DebitMovementStatus/{debitMovementStatusId}
    MenusService.prototype.patchDebitMovementStatus = function (toPatch, debitMovementStatusId, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.patch(API_URL + "DebitMovementStatus/" + debitMovementStatusId, toPatch, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // put /api/lists/DebitMovementStatus/{debitMovementStatusId}
    MenusService.prototype.putDeleteOrRestoreDebitMovementStatus = function (debitMovementStatusId, params, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.put(API_URL + "DebitMovementStatus/" + debitMovementStatusId, null, {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        });
    };
    // post /api/lists/DebitMovementStatus
    MenusService.prototype.addDebitMovementStatus = function (entity, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.post(API_URL + "DebitMovementStatus", entity, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // Debit Reason
    // get all /api/lists/DebitReason
    MenusService.prototype.getAllDebitReasons = function (params, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'DebitReason/', {
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
    // get id /api/lists/DebitReason/{debitReasonId}
    MenusService.prototype.getUniqueDebitReason = function (params, debitReasonId, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'DebitReason/' + debitReasonId, {
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
    // patch /api/lists/DebitReason/{debitReasonId}
    MenusService.prototype.patchDebitReason = function (toPatch, debitReasonId, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.patch(API_URL + "DebitReason/" + debitReasonId, toPatch, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // put /api/lists/DebitReason/{debitReasonId}
    MenusService.prototype.putDeleteOrRestoreDebitReason = function (debitReasonId, params, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.put(API_URL + "DebitReason/" + debitReasonId, null, {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        });
    };
    // post /api/lists/DebitReason
    MenusService.prototype.addDebitReason = function (entity, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.post(API_URL + "DebitReason", entity, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // Bank Account
    // Get All /api/lists/BankAccount
    MenusService.prototype.getAllBankAccounts = function (params, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'BankAccount/', {
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
    // get Id /api/lists/BankAccount/{bankAccountId}
    MenusService.prototype.getUniqueBankAccount = function (params, bankAccountId, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'BankAccount/' + bankAccountId, {
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
    // Patch /api/lists/BankAccount/{bankAccountId}
    MenusService.prototype.patchBankAccount = function (toPatch, bankAccountId, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.patch(API_URL + "BankAccount/" + bankAccountId, toPatch, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // Put /api/lists/BankAccount/{bankAccountId}
    MenusService.prototype.putDeleteOrRestoreBankAccount = function (bankAccountId, params, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.put(API_URL + "BankAccount/" + bankAccountId, null, {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        });
    };
    // Post /api/lists/BankAccount/
    MenusService.prototype.addBankAccount = function (entity, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        console.log(entity);
        return this.http.post(API_URL + "BankAccount", entity, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // Credit Reason
    // get all /api/lists/TypePostBox
    MenusService.prototype.getAllTypePostBoxs = function (params, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'TypePostBox/', {
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
    // get id /api/lists/TypePostBox/{typePostBoxId}
    MenusService.prototype.getUniqueOTypePostBox = function (params, typePostBoxId, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'TypePostBox/' + typePostBoxId, {
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
    // patch /api/lists/TypePostBox/{typePostBoxId}
    MenusService.prototype.patchTypePostBox = function (toPatch, typePostBoxId, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.patch(API_URL + "TypePostBox/" + typePostBoxId, toPatch, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // put /api/lists/TypePostBox/{typePostBoxId}
    MenusService.prototype.putDeleteOrRestoreTypePostBox = function (typePostBoxId, params, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.put(API_URL + "TypePostBox/" + typePostBoxId, null, {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        });
    };
    // post /api/lists/TypePostBox
    MenusService.prototype.addTypePostBox = function (entity, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.post(API_URL + "TypePostBox", entity, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // OrderState
    // get all /api/lists/OrderState
    MenusService.prototype.getAllOrderStates = function (params, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'OrderState/', {
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
    // get id /api/lists/OrderState/{orderStateId}
    MenusService.prototype.getUniqueOrderStates = function (params, orderStateId, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + 'OrderState/' + orderStateId, {
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
    // patch /api/lists/OrderState/{orderStateId}
    MenusService.prototype.patchOrderState = function (toPatch, orderStateId, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.patch(API_URL + "OrderState/" + orderStateId, toPatch, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // put /api/lists/OrderState/{orderStateId}
    MenusService.prototype.putDeleteOrRestoreOrderState = function (orderStateId, params, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.put(API_URL + "OrderState/" + orderStateId, null, {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        });
    };
    // post /api/lists/OrderState
    MenusService.prototype.addOrderState = function (entity, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.post(API_URL + "OrderState", entity, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // ERROR
    MenusService.prototype.handleError = function (error) {
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
    MenusService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MenusService);
    return MenusService;
}());
exports.MenusService = MenusService;
