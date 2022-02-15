"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SecurityService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var app_user_auth_1 = require("src/app/components/auth/models/app-user-auth");
var environment_1 = require("src/environments/environment");
var API_URL = environment_1.environment.apiURL + '/api/Security/';
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
};
var SecurityService = /** @class */ (function () {
    function SecurityService(http, router) {
        this.http = http;
        this.router = router;
        // Creamos un objeto de seguridad donde se almacenará la info q nos devulva la ruta
        this.securityObject = new app_user_auth_1.AppUserAuth();
    }
    SecurityService.prototype.resetSecurityObject = function () {
        this.securityObject.userName = '';
        this.securityObject.bearerToken = '';
        this.securityObject.isAuthenticated = false;
        this.securityObject.claims = [];
    };
    SecurityService.prototype.login = function (entity) {
        var _this = this;
        this.resetSecurityObject();
        return this.http.post(API_URL + "login", entity, httpOptions)
            .pipe(operators_1.tap(function (resp) {
            Object.assign(_this.securityObject, resp);
            sessionStorage.setItem('bearerToken', _this.securityObject.bearerToken);
            localStorage.setItem('nombre_sing_in', _this.securityObject.employee.name);
            localStorage.setItem('agency_sing_in', _this.securityObject.employee.agency);
            localStorage.setItem('agency_id_sing_in', _this.securityObject.employee.agencyId);
            localStorage.setItem('employeeId_sing_in', _this.securityObject.employee.employeeId);
            localStorage.setItem('If-None-Match-get-clients', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-Address-clients', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-bill-clients', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-employees', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-order-employee', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-all-products', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-products', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-product-state', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-product-shipping', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-product-guide', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-guides', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-guide-comments', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-orders', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-order-state', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-shippings', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-shipping-states', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-all-deposits', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-deposits', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-all-refunds', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-client-refunds', "00000000000000000000");
            localStorage.setItem('If-None-Match-get-client-refund-unique', "00000000000000000000");
        }), operators_1.catchError(this.handleError));
    };
    SecurityService.prototype.logout = function () {
        console.log("entro al logout");
        this.resetSecurityObject();
        // sessionStorage.setItem('bearerToken', '');
        sessionStorage.removeItem('bearerToken');
        localStorage.removeItem('nombre_sing_in');
        localStorage.removeItem('agency_sing_in');
        localStorage.removeItem('employeeId_sing_in');
        // localStorage.clear();
    };
    SecurityService.prototype.redirectToLogin = function () {
        this.router.navigate(['/auth/login']);
    };
    SecurityService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error("SANMARSEL Backend returned code " + error.status + ", " +
                ("body was: " + error.error));
        }
        // Return an observable with a user-facing error message.
        return rxjs_1.throwError('Something bad happened; please try again later.');
    };
    SecurityService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SecurityService);
    return SecurityService;
}());
exports.SecurityService = SecurityService;
