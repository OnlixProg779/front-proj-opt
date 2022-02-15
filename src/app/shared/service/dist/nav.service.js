"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.NavService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var windows_service_1 = require("./windows.service");
var NavService = /** @class */ (function () {
    function NavService(window) {
        this.window = window;
        this.collapseSidebar = false;
        this.MENUITEMS = [
            {
                path: '/dashboard/default', title: 'Dashboard', icon: 'home', type: 'link', badgeType: 'primary', active: false
            },
            {
                title: 'Clients', icon: 'users', type: 'sub', active: false, children: [
                    { path: '/clients/list-client', title: 'Client List', type: 'link' },
                    { path: '/clients/create-client', title: 'Create Client', type: 'link' },
                ]
            },
            {
                title: 'Products', icon: 'layers', type: 'sub', active: false, children: [
                    // {
                    // 	title: 'Physical', type: 'sub', children: [
                    // 		{ path: '/products/physical/category', title: 'Category', type: 'link' },
                    // 		{ path: '/products/physical/sub-category', title: 'Sub Category', type: 'link' },
                    // 		{ path: '/products/physical/product-list', title: 'Product List', type: 'link' },
                    // 		{ path: '/products/physical/product-detail', title: 'Product Detail', type: 'link' },
                    // 		{ path: '/products/physical/add-product', title: 'Add Product', type: 'link' },
                    // 	]
                    // },
                    // {
                    // 	title: 'digital', type: 'sub', children: [
                    // 		{ path: '/products/digital/digital-category', title: 'Category', type: 'link' },
                    // 		{ path: '/products/digital/digital-sub-category', title: 'Sub Category', type: 'link' },
                    // 		{ path: '/products/digital/digital-product-list', title: 'Product List', type: 'link' },
                    // 		{ path: '/products/digital/digital-add-product', title: 'Add Product', type: 'link' },
                    // 	]
                    // },
                    {
                        title: 'clients', type: 'sub', children: [
                            { path: '/products/clients/clients-all-products-clients', title: 'All Clients Products', type: 'link' },
                        ]
                    },
                ]
            },
            {
                title: 'Purchases', icon: 'archive', type: 'sub', active: false, children: [
                    { path: '/purchases/list-purchases', title: 'Purchase List', type: 'link' },
                    { path: '/purchases/create-purchase/undefined', title: 'Create Purchase', type: 'link' },
                ]
            },
            {
                title: 'Post Box', icon: 'package', type: 'sub', active: false, children: [
                    { path: '/postbox/orders/received', title: 'Parcels Received', type: 'link' },
                    { path: '/postbox/receive-order/undefined', title: 'Receive Parcel', type: 'link' },
                ]
            },
            // {
            // 	title: 'Coupons', icon: 'tag', type: 'sub', active: false, children: [
            // 		{ path: '/coupons/list-coupons', title: 'List Coupons', type: 'link' },
            // 		{ path: '/coupons/create-coupons', title: 'Create Coupons', type: 'link' },
            // 	]
            // },
            {
                title: 'Guides', icon: 'navigation', type: 'sub', active: false, children: [
                    { path: '/guides/list-guide', title: 'List Guide', type: 'link' },
                    { path: '/guides/create-guide', title: 'Create Guide', type: 'link' },
                ]
            },
            {
                title: 'Shipping', icon: 'truck', type: 'sub', children: [
                    { path: '/shipping/list-shippings', title: 'Shipping List', type: 'link' },
                    { path: '/shipping/create-shipping/undefined', title: 'Create Shipping', type: 'link' },
                ]
            },
            {
                title: 'Deposits', icon: 'dollar-sign', type: 'sub', active: false, children: [
                    { path: '/deposits/list-deposit', title: 'Deposit Lists', type: 'link' },
                    { path: '/deposits/create-deposit', title: 'Create Deposit', type: 'link' },
                    { path: '/deposits/upload-credmov-import', title: 'Credit Movements Imported', type: 'link' },
                ]
            },
            {
                title: 'Agency', icon: 'map-pin', type: 'sub', active: false, children: [
                    { path: '/agency/list-agencies', title: 'Agencies List', type: 'link' },
                ]
            },
            {
                title: 'Refunds', icon: 'dollar-sign', type: 'sub', active: false, children: [
                    { path: '/refunds/list-refund', title: 'Refunds Lists', type: 'link' },
                    { path: '/refunds/create-refund', title: 'Create Refunds', type: 'link' },
                ]
            },
            {
                title: 'Vendors', icon: 'user', type: 'sub', active: false, children: [
                    { path: '/vendors/list-vendors', title: 'Vendor List', type: 'link' },
                    { path: '/vendors/create-vendors', title: 'Create Vendor', type: 'link' },
                ]
            },
            // {
            // 	title: 'Localization', icon: 'chrome', type: 'sub', children: [
            // 		{ path: '/localization/translations', title: 'Translations', type: 'link' },
            // 		{ path: '/localization/currency-rates', title: 'Currency Rates', type: 'link' },
            // 		{ path: '/localization/taxes', title: 'Taxes', type: 'link' },
            // 	]
            // },
            // {
            // 	title: 'Reports', path: '/reports', icon: 'bar-chart', type: 'link', active: false
            // },
            {
                title: 'Settings', icon: 'settings', type: 'sub', children: [
                    { path: '/settings/profile', title: 'Profile', type: 'link' },
                    { path: '/settings/menus', title: 'Menus', type: 'link' },
                ]
            },
            {
                title: 'Login', path: '/auth/login', icon: 'log-in', type: 'link', active: false
            }
        ];
        // Array
        this.items = new rxjs_1.BehaviorSubject(this.MENUITEMS);
        this.onResize();
        if (this.screenWidth < 991) {
            this.collapseSidebar = true;
        }
    }
    // Windows width
    NavService.prototype.onResize = function (event) {
        this.screenWidth = window.innerWidth;
    };
    __decorate([
        core_1.HostListener("window:resize", ['$event'])
    ], NavService.prototype, "onResize");
    NavService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(0, core_1.Inject(windows_service_1.WINDOW))
    ], NavService);
    return NavService;
}());
exports.NavService = NavService;
