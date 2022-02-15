"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HttpInterceptorModule = exports.HttpRequestInterceptor = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var HttpRequestInterceptor = /** @class */ (function () {
    function HttpRequestInterceptor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    HttpRequestInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        var token = sessionStorage.getItem('bearerToken');
        if (token == '') {
            token = '0';
        }
        if (token) {
            var newReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token)
            });
            return next.handle(newReq).pipe(operators_1.map(function (event) {
                return event;
            }), operators_1.catchError(function (httpErrorResponse, _) {
                if (httpErrorResponse.status === 401 /* Unauthorized */) {
                    _this.authenticationService.redirectToLogin();
                }
                return rxjs_1.throwError(httpErrorResponse);
            }));
        }
        else {
            return next.handle(req);
        }
    };
    HttpRequestInterceptor = __decorate([
        core_1.Injectable()
    ], HttpRequestInterceptor);
    return HttpRequestInterceptor;
}());
exports.HttpRequestInterceptor = HttpRequestInterceptor;
var HttpInterceptorModule = /** @class */ (function () {
    function HttpInterceptorModule() {
    }
    HttpInterceptorModule = __decorate([
        core_1.NgModule({
            providers: [{
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: HttpRequestInterceptor,
                    multi: true
                }]
        })
    ], HttpInterceptorModule);
    return HttpInterceptorModule;
}());
exports.HttpInterceptorModule = HttpInterceptorModule;
