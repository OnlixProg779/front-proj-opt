"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ng2_smart_table_1 = require("ng2-smart-table");
var users_routing_module_1 = require("./users-routing.module");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var address_client_component_1 = require("./address-client/address-client.component");
var bill_client_component_1 = require("./bill-client/bill-client.component");
var update_client_component_1 = require("./update-client/update-client.component");
var shared_module_1 = require("src/app/shared/shared.module");
var angular_count_to_1 = require("angular-count-to");
var form_deposit_component_1 = require("./form-deposit/form-deposit.component");
var sales_module_1 = require("../sales/sales.module");
var menus_module_1 = require("../menus/menus.module");
var products_module_1 = require("../products/products.module");
var invoice_module_1 = require("../invoice/invoice.module");
var purchases_module_1 = require("../purchases/purchases.module");
// MATERIAL
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        core_1.NgModule({
            declarations: [
                address_client_component_1.AddressClientComponent,
                bill_client_component_1.BillClientComponent,
                update_client_component_1.UpdateClientComponent,
                form_deposit_component_1.FormDepositComponent
            ],
            imports: [
                common_1.CommonModule,
                ng_bootstrap_1.NgbModule,
                shared_module_1.SharedModule,
                angular_count_to_1.CountToModule,
                ng2_smart_table_1.Ng2SmartTableModule,
                forms_1.ReactiveFormsModule,
                users_routing_module_1.UsersRoutingModule,
                sales_module_1.SalesModule,
                purchases_module_1.PurchasesModule,
                menus_module_1.MenusModule,
                products_module_1.ProductsModule,
                invoice_module_1.InvoiceModule
                // MATERIAL
            ],
            exports: []
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
