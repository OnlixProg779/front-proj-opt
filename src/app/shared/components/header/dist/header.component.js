"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(navServices, service, formBuilder, serviceClient) {
        this.navServices = navServices;
        this.service = service;
        this.formBuilder = formBuilder;
        this.serviceClient = serviceClient;
        this.right_sidebar = false;
        this.open = false;
        this.openNav = false;
        this.filterThrottle = new rxjs_1.Subject();
        this.accept = 'application/json';
        this.rightSidebarEvent = new core_1.EventEmitter();
        this.createFilterSearchForm();
    }
    HeaderComponent.prototype.createFilterSearchForm = function () {
        this.filterSearchForm = this.formBuilder.group({
            searchQuery: ['']
        });
    };
    HeaderComponent.prototype.collapseSidebar = function () {
        this.open = !this.open;
        this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
    };
    HeaderComponent.prototype.right_side_bar = function () {
        this.right_sidebar = !this.right_sidebar;
        this.rightSidebarEvent.emit(this.right_sidebar);
    };
    HeaderComponent.prototype.openMobileNav = function () {
        this.openNav = !this.openNav;
    };
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filterThrottle.pipe(operators_1.debounceTime(1000)).subscribe(function (input) {
            //  this.submit.emit(null);
            _this.searchQuery = input;
            _this.searchFilter(input);
        });
    };
    HeaderComponent.prototype.searchFilter = function (action) {
        // if(action == 'button'){
        //   this.searchQuery = this.filterSearchForm.controls['searchQuery'].value
        //   this.submit.emit(this.searchQuery);
        //     }else{
        //       this.submit.emit(action);
        // }  
        var params = new http_1.HttpParams();
        if (this.searchQuery) {
            params = params.append('SearchQuery', this.searchQuery);
            // params = params.append('PageNumber',this.currentPage.toString());
            // params = params.append('PageSize',this.pageSize.toString());
            // this.serviceClient.getClients(params, this.accept)
            //   .subscribe((result: HttpResponse<any>) => {
            //     if (!result) {
            //       return;
            //     }
            //     if (result.status == 200) {
            //       this.listClients = result.body;
            //       // this.totalCount = JSON.parse(result.headers.get("X-Pagination"));
            //       // this.totalCount = this.totalCount["totalCount"];
            //     }
            //   }
            //   )
        }
    };
    HeaderComponent.prototype.logout = function () {
        this.service.logout();
    };
    __decorate([
        core_1.Output()
    ], HeaderComponent.prototype, "rightSidebarEvent");
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
