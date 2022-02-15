"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var environment_1 = require("src/environments/environment");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var API_URL = environment_1.environment.apiURL + '/api/Clients/';
var httpOptions = {
    headers: new http_1.HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
    })
};
var ClientService = /** @class */ (function () {
    function ClientService(http) {
        this.http = http;
    }
    // CLIENTS
    // GET ALL /api/Clients
    ClientService.prototype.getAllClients = function (params, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL, {
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
    // GET ID /api/Clients/{clientId}
    ClientService.prototype.getUniqueClient = function (params, clientId, auxMediaType) {
        var headers;
        var eTag;
        eTag = localStorage.getItem('If-None-Match-get------');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + auxMediaType,
            'If-None-Match': "\"" + eTag + "\""
        });
        return this.http
            .get(API_URL + clientId, {
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
    // POST /api/Clients
    ClientService.prototype.addClient = function (entity, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.post("" + API_URL, entity, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    // PUT /api/Clients/{clientId} 
    ClientService.prototype.updateClient = function (entity, auxMediaType) {
        var headers = new http_1.HttpHeaders({
            'Content-Type': auxMediaType
        });
        return this.http.put("" + API_URL + entity.clientId, entity, {
            headers: headers,
            observe: 'response',
            responseType: 'json'
        });
    };
    //ADDRESS
    ClientService.prototype.getAddressesClient = function (pageNumber, pageSize, searchQuery, accept, clientId) {
        var headers;
        var params = new http_1.HttpParams();
        params = params.append('PageNumber', pageNumber.toString());
        params = params.append('PageSize', pageSize.toString());
        this.eTag = localStorage.getItem('If-None-Match-get-Address-clients');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + accept,
            'If-None-Match': "\"" + this.eTag + "\""
        });
        if (searchQuery) {
            params = params.append('SearchQuery', searchQuery);
        }
        return this.http
            .get("" + API_URL + clientId + "/Addresses", {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        })
            .pipe(operators_1.tap(function (resp) {
            if (resp.status == 200) {
                //   this.eTag = JSON.parse(resp.headers.get("ETag"));
                // console.log(resp.status);
                //  console.log(resp.statusText);
                //    localStorage.setItem('If-None-Match-get-Address-clients', this.eTag);
                //    almacenamiento en cache: https://es.coredump.biz/questions/49797910/angular-5-caching-http-service-api-calls
            }
            //   console.log(resp);
        }), operators_1.catchError(this.handleError));
    };
    ClientService.prototype.getAddress = function (clientId, addressId) {
        return this.http.get("" + API_URL + clientId + "/Addresses/" + addressId, httpOptions);
    };
    ClientService.prototype.addAddressClient = function (clientId, entity) {
        return this.http.post("" + API_URL + clientId + "/Addresses", entity, httpOptions);
    };
    ClientService.prototype.updateAddressClient = function (clientId, entity) {
        return this.http.put("" + API_URL + clientId + "/Addresses/" + entity.addressId, entity, httpOptions);
    };
    ClientService.prototype.deleteAddressClient = function (clientId, entityId) {
        return this.http["delete"]("" + API_URL + clientId + "/Addresses/" + entityId, httpOptions);
    };
    ClientService.prototype.patchAddressClient = function (clientId, entity) {
        return this.http.patch("" + API_URL + clientId + "/Addresses/" + entity.addressId, entity, httpOptions);
    };
    //BILL CLIENT
    ClientService.prototype.getBillsOfClient = function (pageNumber, pageSize, searchQuery, accept, clientId) {
        var headers;
        var params = new http_1.HttpParams();
        params = params.append('PageNumber', pageNumber.toString());
        params = params.append('PageSize', pageSize.toString());
        this.eTag = localStorage.getItem('If-None-Match-get-bill-clients');
        headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + accept,
            'If-None-Match': "\"" + this.eTag + "\""
        });
        if (searchQuery) {
            params = params.append('SearchQuery', searchQuery);
        }
        return this.http
            .get("" + API_URL + clientId + "/BillClients", {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        })
            .pipe(operators_1.tap(function (resp) {
            if (resp.status == 200) {
                //   this.eTag = JSON.parse(resp.headers.get("ETag"));
                // console.log(resp.status);
                //  console.log(resp.statusText);
                //    localStorage.setItem('If-None-Match-get-bill-clients', this.eTag);
                //    almacenamiento en cache: https://es.coredump.biz/questions/49797910/angular-5-caching-http-service-api-calls
            }
            //   console.log(resp);
        }), operators_1.catchError(this.handleError));
    };
    ClientService.prototype.getBillClient = function (clientId, billClientId) {
        return this.http.get("" + API_URL + clientId + "/BillClients/" + billClientId, httpOptions);
    };
    // addBillOfClientt(
    //   clientId: string,
    //   entity: BillClientCreateDto
    // ): Observable<any> {
    //   return this.http.post(
    //     `${API_URL}${clientId}/BillClients`,
    //     entity,
    //     httpOptions
    //   );
    // }
    // updateBillOfClient(
    //   clientId: string,
    //   entity: BillClientUpdateDto
    // ): Observable<any> {
    //   return this.http.put(
    //     `${API_URL}${clientId}/BillClients/${entity.billClientId}`,
    //     entity,
    //     httpOptions
    //   );
    // }
    // patchBillOfClient(
    //   clientId: string,
    //   entity: BillClientUpdateDto
    // ): Observable<any> {
    //   return this.http.patch(
    //     `${API_URL}${clientId}/BillClients/${entity.billClientId}`,
    //     entity,
    //     httpOptions
    //   );
    // }
    // SALDO DE CLIENTE
    ClientService.prototype.getViewBillSaldoDto = function (params, accept, clientId) {
        this.eTag = localStorage.getItem('If-None-Match-get-bill-clients');
        var headers = new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Accept: "" + accept,
            'If-None-Match': "\"" + this.eTag + "\""
        });
        return this.http
            .get("" + API_URL + clientId + "/BillSaldo", {
            headers: headers,
            observe: 'response',
            responseType: 'json',
            params: params
        })
            .pipe(operators_1.tap(function (resp) {
            if (resp.status == 200) {
                //   this.eTag = JSON.parse(resp.headers.get("ETag"));
                // console.log(resp.status);
                //  console.log(resp.statusText);
                //    localStorage.setItem('If-None-Match-get-bill-clients', this.eTag);
                //    almacenamiento en cache: https://es.coredump.biz/questions/49797910/angular-5-caching-http-service-api-calls
            }
            //   console.log(resp);
        }), operators_1.catchError(this.handleError));
    };
    // ERROR MSG
    ClientService.prototype.handleError = function (error) {
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
    ClientService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ClientService);
    return ClientService;
}());
exports.ClientService = ClientService;
