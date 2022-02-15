"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GenerateModalButtonsRouteService = void 0;
var core_1 = require("@angular/core");
var buttons_modal_routes_component_1 = require("./buttons-modal-routes.component");
var rxjs_1 = require("rxjs");
var GenerateModalButtonsRouteService = /** @class */ (function () {
    function GenerateModalButtonsRouteService() {
    }
    GenerateModalButtonsRouteService.prototype.generateRoutesBootomsAfterReceivedBox = function (receivedBoxId, clientIdByDto) {
        this.AFTER_RECEIVED_BOX_ROUTES = [
            new buttons_modal_routes_component_1.PropertiesButton('1', //number
            'Add Products', //Tittle
            'bg-danger card-body', //classNg
            '/postbox/received/' + receivedBoxId + '/products/clients-add-product', //route
            'box', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('2', //number
            'Stay here', //Tittle
            'bg-primary card-body', //classNg
            '/postbox/receive-order/' + clientIdByDto, //route
            'hash', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('3', //number
            'New order Empy', //Tittle
            'bg-secondary card-body', //classNg
            '/postbox/receive-order/' + clientIdByDto, //route
            'archive', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('4', //number
            'Client Profile', //Tittle
            'bg-info card-body', //classNg
            '/clients/bills/' + clientIdByDto, //route
            'user', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('5', //number
            'Dashboard', //Tittle
            'bg-info card-body', //classNg
            '/dashboard/default', //route
            'home', //icon
            'font-danger', //iconClass
            '' // style
            )
        ];
        var routesAfterReceivedBox = new rxjs_1.BehaviorSubject(this.AFTER_RECEIVED_BOX_ROUTES);
        return routesAfterReceivedBox;
    };
    GenerateModalButtonsRouteService.prototype.generateRoutesBootomsAfterPurchase = function (clientId, orderId) {
        this.AFTER_PURCHASE_ROUTES = [
            new buttons_modal_routes_component_1.PropertiesButton('1', //number
            'Add Products', //Tittle
            'bg-danger card-body', //classNg
            '/purchases/' + orderId + '/products/add-product', //route
            'box', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('2', //number
            'Stay here', //Tittle
            'bg-primary card-body', //classNg
            '/purchases/create-purchase/' + clientId, //route
            'hash', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('3', //number
            'New Purchase', //Tittle
            'bg-secondary card-body', //classNg
            '/purchases/create-purchase/' + undefined, //route
            'archive', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('4', //number
            'Client Profile', //Tittle
            'bg-info card-body', //classNg
            '/clients/bills/' + clientId, //route
            'user', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('5', //number
            'Dashboard', //Tittle
            'bg-info card-body', //classNg
            '/dashboard/default', //route
            'home', //icon
            'font-danger', //iconClass
            '' // style
            )
        ];
        var routesAfterOrder = new rxjs_1.BehaviorSubject(this.AFTER_PURCHASE_ROUTES);
        return routesAfterOrder;
    };
    // Quedarme Aqui, Agregar nueva orden, Home, Profile Cliente 
    GenerateModalButtonsRouteService.prototype.generateRoutesBootomsAfterProduct = function (clientId, receivedBoxId) {
        this.AFTER_PRODUCT_ROUTES = [
            new buttons_modal_routes_component_1.PropertiesButton('1', //number
            'Add more products', //Tittle
            'bg-danger card-body', //classNg
            '/orders/received/' + receivedBoxId + '/products/clients-add-product', //route
            'hash', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('2', //number
            'New Receive (Same client)', //Tittle
            'bg-primary card-body', //classNg
            '/orders/receive-order/' + clientId, //route
            'archive', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('3', //number
            'New Receive', //Tittle
            'bg-secondary card-body', //classNg
            '/orders/receive-order/undefined', //route
            'archive', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('4', //number
            'Client Profile', //Tittle
            'bg-info card-body', //classNg
            '/clients/bills/' + clientId, //route
            'user', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('5', //number
            'Dashboard', //Tittle
            'bg-info card-body', //classNg
            '/dashboard/default', //route
            'home', //icon
            'font-danger', //iconClass
            '' // style
            )
        ];
        var routesAfterProducts = new rxjs_1.BehaviorSubject(this.AFTER_PRODUCT_ROUTES);
        return routesAfterProducts;
    };
    //HOME - Nueva Guia - Lista de guias
    GenerateModalButtonsRouteService.prototype.generateRoutesBootomsAfterGuide = function () {
        this.AFTER_GUIDE_ROUTES = [
            new buttons_modal_routes_component_1.PropertiesButton('1', //number
            'New Guide', //Tittle
            'bg-secondary card-body', //classNg
            '/guides/create-guide', //route
            'archive', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('2', //number
            'Guides List', //Tittle
            'bg-primary card-body', //classNg
            '/guides/list-guide', //route
            'archive', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('2', //number
            'Dashboard', //Tittle
            'bg-info card-body', //classNg
            '/dashboard/default', //route
            'home', //icon
            'font-danger', //iconClass
            '' // style
            )
        ];
        var routesAfterGuide = new rxjs_1.BehaviorSubject(this.AFTER_GUIDE_ROUTES);
        return routesAfterGuide;
    };
    GenerateModalButtonsRouteService.prototype.generateRoutesBootomsAfterOrderProduct = function (clientId, orderId) {
        this.AFTER_ORDER_PRODUCT_ROUTES = [
            new buttons_modal_routes_component_1.PropertiesButton('1', //number
            'Add more products', //Tittle
            'bg-danger card-body', //classNg
            '/purchases/' + orderId + '/products/add-product', //route
            'hash', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('2', //number
            'New Purchase (Same client)', //Tittle
            'bg-primary card-body', //classNg
            '/purchases/create-purchase/' + clientId, //route
            'archive', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('3', //number
            'New Purchase', //Tittle
            'bg-secondary card-body', //classNg
            '/purchases/create-purchase/undefined', //route
            'archive', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('4', //number
            'Client Profile', //Tittle
            'bg-info card-body', //classNg
            '/clients/bills/' + clientId, //route
            'user', //icon
            'font-danger', //iconClass
            '' // style
            ),
            new buttons_modal_routes_component_1.PropertiesButton('5', //number
            'Dashboard', //Tittle
            'bg-info card-body', //classNg
            '/dashboard/default', //route
            'home', //icon
            'font-danger', //iconClass
            '' // style
            )
        ];
        var routesAfterProducts = new rxjs_1.BehaviorSubject(this.AFTER_ORDER_PRODUCT_ROUTES);
        return routesAfterProducts;
    };
    GenerateModalButtonsRouteService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], GenerateModalButtonsRouteService);
    return GenerateModalButtonsRouteService;
}());
exports.GenerateModalButtonsRouteService = GenerateModalButtonsRouteService;
