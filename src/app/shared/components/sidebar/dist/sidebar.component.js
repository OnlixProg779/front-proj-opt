"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SidebarComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(router, navServices) {
        var _this = this;
        this.router = router;
        this.navServices = navServices;
        this.nombre_sing_in = localStorage.getItem('nombre_sing_in');
        this.agency_sing_in = localStorage.getItem('agency_sing_in');
        this.navServices.items.subscribe(function (menuItems) {
            _this.menuItems = menuItems;
            _this.router.events.subscribe(function (event) {
                if (event instanceof router_1.NavigationEnd) {
                    menuItems.filter(function (items) {
                        if (items.path === event.url)
                            _this.setNavActive(items);
                        if (!items.children)
                            return false;
                        items.children.filter(function (subItems) {
                            if (subItems.path === event.url)
                                _this.setNavActive(subItems);
                            if (!subItems.children)
                                return false;
                            subItems.children.filter(function (subSubItems) {
                                if (subSubItems.path === event.url)
                                    _this.setNavActive(subSubItems);
                            });
                        });
                    });
                }
            });
        });
    }
    // Active Nave state
    SidebarComponent.prototype.setNavActive = function (item) {
        this.menuItems.filter(function (menuItem) {
            if (menuItem != item)
                menuItem.active = false;
            if (menuItem.children && menuItem.children.includes(item))
                menuItem.active = true;
            if (menuItem.children) {
                menuItem.children.filter(function (submenuItems) {
                    if (submenuItems.children && submenuItems.children.includes(item)) {
                        menuItem.active = true;
                        submenuItems.active = true;
                    }
                });
            }
        });
    };
    // Click Toggle menu
    SidebarComponent.prototype.toggletNavActive = function (item) {
        var _this = this;
        if (!item.active) {
            this.menuItems.forEach(function (a) {
                if (_this.menuItems.includes(item))
                    a.active = false;
                if (!a.children)
                    return false;
                a.children.forEach(function (b) {
                    if (a.children.includes(item)) {
                        b.active = false;
                    }
                });
            });
        }
        item.active = !item.active;
    };
    //Fileupload
    SidebarComponent.prototype.readUrl = function (event) {
        var _this = this;
        if (event.target.files.length === 0)
            return;
        //Image upload validation
        var mimeType = event.target.files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        // Image upload
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function (_event) {
            _this.url = reader.result;
        };
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.scss'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
