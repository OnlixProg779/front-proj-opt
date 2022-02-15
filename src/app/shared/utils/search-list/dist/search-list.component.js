"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchListComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var options_client_1 = require("src/app/components/users/models/options-client");
var environment_1 = require("src/environments/environment");
var check_box_view_component_1 = require("../check-box-view/check-box-view.component");
var jwt_decode_1 = require("jwt-decode");
var SearchListComponent = /** @class */ (function () {
    function SearchListComponent(modalService, formBuilder, service) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.service = service;
        this.submit = new core_1.EventEmitter();
        this.filterThrottle = new rxjs_1.Subject();
        this.filterNumber = new rxjs_1.Subject();
        this.mostrarTabla = false;
        this.optionsClient = new options_client_1.OptionsClient();
        this.initSettingsClients();
        this.createFilterSearchForm();
    }
    SearchListComponent.prototype.initSettingsClients = function () {
        var _this = this;
        this.optionsClient.settings = {
            mode: 'external',
            pager: {
                display: true,
                perPage: this.optionsClient.showPerPage
            },
            actions: {
                add: false,
                edit: false,
                "delete": false
            },
            columns: {
                Button: {
                    title: 'Add',
                    type: 'custom',
                    valuePrepareFunction: function (value, row, cell) {
                        // return `<a title="See Detail Product "href="Your api key or something/${row.Id}"> <i class="ion-edit"></i></a>`
                        return "row";
                    },
                    filter: false,
                    renderComponent: check_box_view_component_1.CheckBoxViewComponent,
                    onComponentInitFunction: function (instance) {
                        instance.eventEmit.subscribe(function (event) {
                            if (event) {
                                _this.submit.emit(instance.rowData);
                            }
                            else {
                                _this.submit.emit(null);
                            }
                        });
                    }
                },
                serie: {
                    title: '#',
                    filter: false
                },
                name: {
                    title: 'Name',
                    filter: false
                },
                instagramName: {
                    title: 'Instagram',
                    filter: false
                },
                // phone: {
                //   title: 'Phone',
                //   filter: false
                // },
                city: {
                    title: 'City',
                    filter: false
                },
                dni: {
                    title: 'Dni',
                    filter: false
                }
            }
        };
    };
    SearchListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var decoded = jwt_decode_1["default"](sessionStorage.getItem('bearerToken'));
        // throw new Error('Method not implemented.');
        if (decoded.CanAccessManage == 'true') {
            this.optionsClient.auxMediaTypeAccept = environment_1.environment.mediaTypes.client.get.accept.getAllclientToOwnerJson;
        }
        else {
            this.optionsClient.auxMediaTypeAccept = environment_1.environment.mediaTypes.client.get.accept.getAllclientToEmployeeAJson;
        }
        // this.optionsClient.active = true;
        // this.optionsClient.fields = 'type,active';
        this.initData();
        this.filterThrottle.pipe(operators_1.debounceTime(1000)).subscribe(function (input) {
            _this.submit.emit(null);
            _this.searchFilter(input, "searchQuery");
        });
        this.filterNumber.pipe(operators_1.debounceTime(1000)).subscribe(function (input) {
            _this.submit.emit(null);
            _this.searchFilter(input, "searchNumber");
        });
        this.initOnChagedData();
    };
    SearchListComponent.prototype.createFilterSearchForm = function () {
        this.filterSearchForm = this.formBuilder.group({
            searchQuery: [''],
            searchNumber: ['']
        });
    };
    SearchListComponent.prototype.searchFilter = function (action, search) {
        console.log(search);
        console.log(action);
        if (action == 'button' && search == 'button') {
            this.optionsClient.searchQuery = this.filterSearchForm.controls['searchQuery'].value;
            this.optionsClient.serie = this.filterSearchForm.controls['searchNumber'].value;
            this.initData();
        }
        else if (search == 'searchQuery') {
            this.optionsClient.searchQuery = action;
            this.optionsClient.serie = null;
            this.initData();
        }
        else if (search == 'searchNumber') {
            this.optionsClient.searchQuery = null;
            this.optionsClient.serie = action;
            this.initData();
        }
    };
    SearchListComponent.prototype.vaciarInputQuery = function () {
        this.filterSearchForm.controls['searchQuery'].setValue("");
    };
    SearchListComponent.prototype.vaciarInputNumber = function () {
        this.filterSearchForm.controls['searchNumber'].setValue("");
    };
    SearchListComponent.prototype.initData = function () {
        var _this = this;
        var params = new http_1.HttpParams();
        if ((this.optionsClient.searchQuery == null || this.optionsClient.searchQuery == '') && (this.optionsClient.serie == null)) {
            this.mostrarTabla = false;
            this.optionsClient.source.empty();
            return;
        }
        else {
            if (this.optionsClient.searchQuery != null) {
                params = params.append('SearchQuery', this.optionsClient.searchQuery);
            }
            if (this.optionsClient.serie != null) {
                params = params.append('Serie', this.optionsClient.serie);
            }
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
                    _this.mostrarTabla = true;
                    _this.optionsClient.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsClient.totalCount = _this.optionsClient.totalCount['totalCount'];
                }
                else {
                    _this.optionsClient.source.load(result.body);
                    _this.mostrarTabla = true;
                    _this.optionsClient.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsClient.totalCount = _this.optionsClient.totalCount['totalCount'];
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    SearchListComponent.prototype.initOnChagedData = function () {
        var _this = this;
        this.optionsClient.source.onChanged().subscribe(function (change) {
            if (change.action === 'page') {
                _this.pageChange(change.paging.page);
            }
        });
    };
    SearchListComponent.prototype.pageChange = function (pageIndex) {
        var _this = this;
        var getNew = pageIndex * this.optionsClient.showPerPage;
        if (getNew >= this.optionsClient.source.count() && getNew < this.optionsClient.totalCount) {
            this.optionsClient.currentPage = this.optionsClient.currentPage + 1;
            var params = new http_1.HttpParams();
            if ((this.optionsClient.searchQuery == null || this.optionsClient.searchQuery == '') && (this.optionsClient.serie == null)) {
                this.mostrarTabla = false;
                this.optionsClient.source.empty();
                return;
            }
            else {
                if (this.optionsClient.searchQuery != null) {
                    params = params.append('SearchQuery', this.optionsClient.searchQuery);
                }
                if (this.optionsClient.serie != null) {
                    params = params.append('Serie', this.optionsClient.serie);
                }
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
    SearchListComponent.prototype.createClientModal = function (content) {
        var _this = this;
        // aqui se abre el modal
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
            .result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    SearchListComponent.prototype.getDismissReason = function (reason) {
        console.log(reason);
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else if (reason == 'Cross click') {
            return 'Cross click';
        }
        else {
            return "with: " + reason;
        }
    };
    SearchListComponent.prototype.responseNewClient = function (responseClient) {
        if (responseClient.clientId) {
            this.submit.emit(responseClient);
            this.modalService.dismissAll();
        }
    };
    __decorate([
        core_1.Output()
    ], SearchListComponent.prototype, "submit");
    SearchListComponent = __decorate([
        core_2.Component({
            selector: 'app-search-list',
            templateUrl: './search-list.component.html',
            styleUrls: ['./search-list.component.scss']
        })
    ], SearchListComponent);
    return SearchListComponent;
}());
exports.SearchListComponent = SearchListComponent;
