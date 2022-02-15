"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MenusModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
var menus_routing_module_1 = require("./menus-routing.module");
var list_deposit_component_1 = require("./list-deposit/list-deposit.component");
var create_deposit_component_1 = require("./create-deposit/create-deposit.component");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ng2_smart_table_1 = require("ng2-smart-table");
var shared_module_1 = require("src/app/shared/shared.module");
var update_deposit_component_1 = require("./update-deposit/update-deposit.component");
var forms_2 = require("@angular/forms");
var credit_movement_form_component_1 = require("./credit-movement-form/credit-movement-form.component");
var list_credit_movements_generic_component_1 = require("./list-credit-movements-generic/list-credit-movements-generic.component");
var upload_credit_movements_imported_component_1 = require("./upload-credit-movements-imported/upload-credit-movements-imported.component");
var MenusModule = /** @class */ (function () {
    function MenusModule() {
    }
    MenusModule = __decorate([
        core_1.NgModule({
            declarations: [list_deposit_component_1.ListDepositComponent,
                create_deposit_component_1.CreateDepositComponent,
                update_deposit_component_1.UpdateDepositComponent,
                credit_movement_form_component_1.CreditMovementFormComponent,
                list_credit_movements_generic_component_1.ListCreditMovementsGenericComponent,
                upload_credit_movements_imported_component_1.UploadCreditMovementsImportedComponent],
            imports: [
                common_1.CommonModule,
                menus_routing_module_1.MenusRoutingModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule,
                ng_bootstrap_1.NgbModule,
                ng2_smart_table_1.Ng2SmartTableModule,
                forms_2.FormsModule
            ],
            exports: [
                list_deposit_component_1.ListDepositComponent, update_deposit_component_1.UpdateDepositComponent
            ]
        })
    ], MenusModule);
    return MenusModule;
}());
exports.MenusModule = MenusModule;
