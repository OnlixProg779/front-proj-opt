"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var dashboard_module_1 = require("./components/dashboard/dashboard.module");
var shared_module_1 = require("./shared/shared.module");
var products_module_1 = require("./components/products/products.module");
var sales_module_1 = require("./components/sales/sales.module");
var coupons_module_1 = require("./components/coupons/coupons.module");
var pages_module_1 = require("./components/pages/pages.module");
var media_module_1 = require("./components/media/media.module");
var menus_module_1 = require("./components/menus/menus.module");
var vendors_module_1 = require("./components/vendors/vendors.module");
var users_module_1 = require("./components/users/users.module");
var localization_module_1 = require("./components/localization/localization.module");
var invoice_module_1 = require("./components/invoice/invoice.module");
var setting_module_1 = require("./components/setting/setting.module");
;
var reports_module_1 = require("./components/reports/reports.module");
var auth_module_1 = require("./components/auth/auth.module");
var http_interceptor_model_1 = require("./shared/service/http-interceptor.model");
var ngx_image_compress_1 = require("ngx-image-compress");
var purchases_module_1 = require("./components/purchases/purchases.module");
var agency_module_1 = require("./components/agency/agency.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
            ],
            imports: [
                animations_1.BrowserAnimationsModule,
                platform_browser_1.BrowserModule.withServerTransition({ appId: 'serverApp' }),
                app_routing_module_1.AppRoutingModule,
                dashboard_module_1.DashboardModule,
                invoice_module_1.InvoiceModule,
                setting_module_1.SettingModule,
                reports_module_1.ReportsModule,
                auth_module_1.AuthModule,
                shared_module_1.SharedModule,
                localization_module_1.LocalizationModule,
                products_module_1.ProductsModule,
                sales_module_1.SalesModule,
                vendors_module_1.VendorsModule,
                coupons_module_1.CouponsModule,
                pages_module_1.PagesModule,
                media_module_1.MediaModule,
                menus_module_1.MenusModule,
                users_module_1.UsersModule,
                http_interceptor_model_1.HttpInterceptorModule,
                purchases_module_1.PurchasesModule,
                agency_module_1.AgencyModule
            ],
            providers: [ngx_image_compress_1.NgxImageCompressService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
