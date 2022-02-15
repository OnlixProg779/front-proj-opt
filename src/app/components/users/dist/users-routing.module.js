"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var update_client_component_1 = require("./update-client/update-client.component");
var orders_component_1 = require("../sales/orders/orders.component");
var bill_client_component_1 = require("./bill-client/bill-client.component");
var address_client_component_1 = require("./address-client/address-client.component");
var create_client_component_1 = require("src/app/shared/utils/create-client/create-client.component");
var list_client_component_1 = require("src/app/shared/utils/list-client/list-client.component");
var routes = [
    {
        path: '',
        children: [
            {
                path: 'list-client',
                component: list_client_component_1.ListClientComponent,
                data: {
                    title: "Client List",
                    breadcrumb: "Client List"
                }
            },
            {
                path: 'create-client',
                component: create_client_component_1.CreateClientComponent,
                data: {
                    title: "Create Client",
                    breadcrumb: "Create Client"
                }
            },
            {
                path: 'update-client/:idClient',
                component: update_client_component_1.UpdateClientComponent,
                data: {
                    title: "Update Client",
                    breadcrumb: "Update Client"
                }
            },
            {
                path: 'orders/:clientId',
                component: orders_component_1.OrdersComponent,
                data: {
                    title: "Orders Client",
                    breadcrumb: "Orders Client"
                }
            },
            {
                path: 'bills/:clientId',
                component: bill_client_component_1.BillClientComponent,
                data: {
                    title: "Bills Client",
                    breadcrumb: "Bills Client"
                }
            },
            {
                path: 'addresses/:clientId',
                component: address_client_component_1.AddressClientComponent,
                data: {
                    title: "Addresses Client",
                    breadcrumb: "Addresses Client"
                }
            }
        ]
    }
];
var UsersRoutingModule = /** @class */ (function () {
    function UsersRoutingModule() {
    }
    UsersRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], UsersRoutingModule);
    return UsersRoutingModule;
}());
exports.UsersRoutingModule = UsersRoutingModule;
