"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListClientComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var options_client_1 = require("src/app/components/users/models/options-client");
var button_view_component_1 = require("src/app/shared/button-view/button-view.component");
var environment_1 = require("src/environments/environment");
var jwt_decode_1 = require("jwt-decode");
var ListClientComponent = /** @class */ (function () {
    function ListClientComponent(service, router) {
        this.service = service;
        this.router = router;
        //Client
        this.optionsClient = new options_client_1.OptionsClient();
        this.initSettingsClients();
    }
    ListClientComponent.prototype.initSettingsClients = function () {
        var _this = this;
        this.optionsClient.settings = {
            mode: 'external',
            pager: {
                display: true,
                perPage: this.optionsClient.showPerPage
            },
            actions: {
                add: false,
                edit: true,
                "delete": false,
                position: 'right'
            },
            columns: {
                serie: {
                    title: '#',
                    filter: false
                },
                button1: {
                    title: 'History',
                    filter: false,
                    type: 'custom',
                    valuePrepareFunction: function (value, row, cell) {
                        var sentData = {
                            renderValue: 'Profile',
                            step: 'btn btn-primary'
                        };
                        return JSON.stringify(sentData);
                    },
                    renderComponent: button_view_component_1.ButtonViewComponent,
                    onComponentInitFunction: function (instance) {
                        instance.save.subscribe(function (row) {
                            _this.router.navigate(['/clients/bills/' + row.clientId]);
                        });
                    }
                },
                name: {
                    title: 'Name',
                    filter: false
                },
                instagramName: {
                    title: 'Instagram',
                    filter: false
                },
                phone: {
                    title: 'Phone',
                    filter: false
                },
                city: {
                    title: 'City',
                    filter: false
                }
            }
        };
    };
    ListClientComponent.prototype.ngOnInit = function () {
        var decoded = jwt_decode_1["default"](sessionStorage.getItem('bearerToken'));
        // console.log(decoded)
        // throw new Error('Method not implemented.');
        if (decoded.CanAccessManage == 'true') {
            this.optionsClient.auxMediaTypeAccept = environment_1.environment.mediaTypes.client.get.accept.getAllclientToOwnerJson;
        }
        else {
            console.log("entroe aqui");
            this.optionsClient.auxMediaTypeAccept = environment_1.environment.mediaTypes.client.get.accept.getAllclientToEmployeeAJson;
        }
        this.initData();
        this.initOnChagedData();
    };
    ListClientComponent.prototype.onEdit = function (event) {
        this.router.navigate(['/clients/update-client/' + event.data.clientId]);
    };
    ListClientComponent.prototype.initData = function () {
        var _this = this;
        var params = new http_1.HttpParams();
        if (this.optionsClient.searchQuery != null) {
            params = params.append('SearchQuery', this.optionsClient.searchQuery);
        }
        if (this.optionsClient.serie != null) {
            params = params.append('Serie', this.optionsClient.serie);
        }
        if (this.optionsClient.orderBy != null) {
            params = params.append('OrderBy', this.optionsClient.orderBy);
        }
        if (this.optionsClient.fields != null) {
            params = params.append('Fields', this.optionsClient.fields);
        }
        params = params.append('PageNumber', this.optionsClient.currentPage.toString());
        params = params.append('PageSize', this.optionsClient.pageSize.toString());
        this.service
            .getAllClients(params, this.optionsClient.auxMediaTypeAccept)
            .subscribe(function (result) {
            if (!result) {
                return;
            }
            if (result.status == 200) {
                if (_this.optionsClient.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                    _this.optionsClient.source.load(result.body.value);
                    _this.optionsClient.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsClient.totalCount = _this.optionsClient.totalCount['totalCount'];
                }
                else {
                    _this.optionsClient.source.load(result.body);
                    _this.optionsClient.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsClient.totalCount = _this.optionsClient.totalCount['totalCount'];
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    ListClientComponent.prototype.initOnChagedData = function () {
        var _this = this;
        this.optionsClient.source.onChanged().subscribe(function (change) {
            if (change.action === 'page') {
                _this.pageChange(change.paging.page);
            }
        });
    };
    ListClientComponent.prototype.pageChange = function (pageIndex) {
        var _this = this;
        var getNew = pageIndex * this.optionsClient.showPerPage;
        if (getNew >= this.optionsClient.source.count() && getNew < this.optionsClient.totalCount) {
            this.optionsClient.currentPage = this.optionsClient.currentPage + 1;
            var params = new http_1.HttpParams();
            if (this.optionsClient.searchQuery != null) {
                params = params.append('SearchQuery', this.optionsClient.searchQuery);
            }
            if (this.optionsClient.serie != null) {
                params = params.append('Serie', this.optionsClient.serie);
            }
            if (this.optionsClient.orderBy != null) {
                params = params.append('OrderBy', this.optionsClient.orderBy);
            }
            if (this.optionsClient.fields != null) {
                params = params.append('Fields', this.optionsClient.fields);
            }
            params = params.append('PageNumber', this.optionsClient.currentPage.toString());
            params = params.append('PageSize', this.optionsClient.pageSize.toString());
            this.service
                .getAllClients(params, this.optionsClient.auxMediaTypeAccept)
                .subscribe(function (result) {
                if (!result) {
                    return;
                }
                if (result.status == 200) {
                    if (_this.optionsClient.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                        result.body.value.forEach(function (element) {
                            _this.optionsClient.source.add(element);
                        });
                    }
                    else {
                        result.body.forEach(function (element) {
                            _this.optionsClient.source.add(element);
                        });
                    }
                }
            }, function (err) {
                console.warn(err);
            });
        }
    };
    ListClientComponent.prototype.searchFilter = function (searchQuery) {
        if (typeof searchQuery === 'string') {
            this.optionsClient.serie = null;
            this.optionsClient.searchQuery = searchQuery;
            // aqui deberia primero buscar en la tabla, si no lo encuentra en la tabla, llamar a la base de datos
            this.initData();
        }
    };
    ListClientComponent.prototype.searchFilterNumber = function (searchNumber) {
        if (typeof searchNumber === 'string') {
            this.optionsClient.searchQuery = null;
            this.optionsClient.serie = searchNumber;
            // aqui deberia primero buscar en la tabla, si no lo encuentra en la tabla, llamar a la base de datos
            this.initData();
        }
    };
    ListClientComponent = __decorate([
        core_1.Component({
            selector: 'app-list-client',
            templateUrl: './list-client.component.html',
            styleUrls: ['./list-client.component.scss']
        })
    ], ListClientComponent);
    return ListClientComponent;
}());
exports.ListClientComponent = ListClientComponent;
