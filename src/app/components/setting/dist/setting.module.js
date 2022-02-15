"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SettingModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var setting_routing_module_1 = require("./setting-routing.module");
var profile_component_1 = require("./profile/profile.component");
var shared_module_1 = require("../../shared/shared.module");
var gen_lists_component_1 = require("./gen-lists/gen-lists.component");
var ng2_smart_table_1 = require("ng2-smart-table");
var SettingModule = /** @class */ (function () {
    function SettingModule() {
    }
    SettingModule = __decorate([
        core_1.NgModule({
            declarations: [profile_component_1.ProfileComponent, gen_lists_component_1.GenListsComponent],
            imports: [
                common_1.CommonModule,
                ng_bootstrap_1.NgbModule,
                forms_1.ReactiveFormsModule,
                setting_routing_module_1.SettingRoutingModule,
                ng2_smart_table_1.Ng2SmartTableModule,
                shared_module_1.SharedModule
            ]
        })
    ], SettingModule);
    return SettingModule;
}());
exports.SettingModule = SettingModule;
