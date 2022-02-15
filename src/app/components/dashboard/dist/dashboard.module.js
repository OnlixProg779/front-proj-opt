"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var dashboard_routing_module_1 = require("./dashboard-routing.module");
var dashboard_component_1 = require("./dashboard.component");
var angular_count_to_1 = require("angular-count-to");
var ng2_charts_1 = require("ng2-charts");
var ng2_google_charts_1 = require("ng2-google-charts");
var ngx_charts_1 = require("@swimlane/ngx-charts");
var ng_chartist_1 = require("ng-chartist");
var shared_module_1 = require("../../shared/shared.module");
var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            declarations: [dashboard_component_1.DashboardComponent],
            imports: [
                common_1.CommonModule,
                dashboard_routing_module_1.DashboardRoutingModule,
                angular_count_to_1.CountToModule,
                shared_module_1.SharedModule,
                ng2_charts_1.ChartsModule,
                ng2_google_charts_1.Ng2GoogleChartsModule,
                ngx_charts_1.NgxChartsModule,
                ng_chartist_1.ChartistModule
            ]
        })
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
