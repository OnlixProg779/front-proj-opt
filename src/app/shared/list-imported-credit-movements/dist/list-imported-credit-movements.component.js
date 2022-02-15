"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListImportedCreditMovementsComponent = void 0;
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var options_credit_movements_imported_1 = require("src/app/components/menus/models/CreditMovementImported/options-credit-movements-imported");
var options_credit_movement_1 = require("src/app/components/menus/models/options-credit-movement");
var environment_1 = require("src/environments/environment");
var button_view_component_1 = require("../button-view/button-view.component");
var multi_sel_component_1 = require("../multi-sel/multi-sel.component");
var check_box_view_component_1 = require("../utils/check-box-view/check-box-view.component");
var ListImportedCreditMovementsComponent = /** @class */ (function () {
    function ListImportedCreditMovementsComponent(creditMovementsService, modalService) {
        this.creditMovementsService = creditMovementsService;
        this.modalService = modalService;
        this.bankAccountId = null;
        this.submitCMISelected = new core_1.EventEmitter();
        this.filterAll = false;
        this.stringActive = 'Active (Yes)';
        this.stringVerified = 'Verified (All)';
        // filterActive: boolean = false;
        this.showVerified = null;
        this.optionsCreditMovementsImported = new options_credit_movements_imported_1.OptionsCreditMovementsImported();
        this.creditMovementsImported = null;
        this.creditMovementVerified = null;
        this.optionsCreditMovement = new options_credit_movement_1.OptionsCreditMovement();
        console.log(this.columnSelect);
    }
    ListImportedCreditMovementsComponent.prototype.ngOnInit = function () {
        if (this.columnSelect == 'YES') {
            this.initSettingsCreditMovementsImportedSelect();
        }
        else {
            this.initSettingsCreditMovementsImported();
        }
        this.optionsCreditMovementsImported.auxMediaTypeAccept = environment_1.environment.mediaTypes.creditMovementImported.get.accept.getAllJson;
        this.optionsCreditMovementsImported.orderBy = 'date desc';
        this.optionsCreditMovementsImported.active = true;
        if (this.showVerified != null) {
            this.optionsCreditMovementsImported.verified = this.showVerified;
        }
        this.initDataCreditMovementsImported();
        this.initOnChagedData();
    };
    ListImportedCreditMovementsComponent.prototype.initOnChagedData = function () {
        var _this = this;
        this.optionsCreditMovementsImported.source.onChanged().subscribe(function (change) {
            if (change.action === 'page') {
                _this.pageChangeCreditMovementsImported(change.paging.page);
            }
        });
    };
    ListImportedCreditMovementsComponent.prototype.ngOnChanges = function (changes) {
        console.log(changes);
        if (!changes.bankAccountId.firstChange) {
            if (changes.bankAccountId.previousValue != changes.bankAccountId.currentValue) {
                if (this.columnSelect == 'YES') {
                    this.initSettingsCreditMovementsImportedSelect();
                }
                else {
                    this.initSettingsCreditMovementsImported();
                }
                this.initDataCreditMovementsImported();
            }
        }
    };
    ListImportedCreditMovementsComponent.prototype.initSettingsCreditMovementsImported = function () {
        var _this = this;
        this.optionsCreditMovementsImported.settings = {
            mode: 'inline',
            actions: {
                add: false,
                edit: false,
                "delete": false
            },
            pager: {
                display: true,
                perPage: this.optionsCreditMovementsImported.showPerPage
            },
            columns: {
                date: {
                    title: 'date',
                    filter: false,
                    type: 'custom',
                    valuePrepareFunction: function (value, row, cell) {
                        // DATA FROM HERE GOES TO renderComponent
                        //return "this.roles";
                        var sentData = {
                            renderValue: "",
                            step: "",
                            styl: ""
                        };
                        if (row.active > 0) {
                            sentData.renderValue = new common_1.DatePipe('en-US').transform(value, 'd/MMM/yyyy');
                            sentData.step = 'btn btn-outline';
                            sentData.styl = 'line-height: 1;text-align: center;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 90%;cursor: auto;';
                        }
                        else {
                            sentData.renderValue = new common_1.DatePipe('en-US').transform(value, 'd/MMM/yyyy');
                            sentData.step = 'btn btn-outline';
                            sentData.styl = 'background-color: red;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        return JSON.stringify(sentData);
                    },
                    renderComponent: button_view_component_1.ButtonViewComponent
                },
                office: {
                    title: 'office',
                    filter: false
                },
                document: {
                    title: 'document',
                    filter: false
                },
                description: {
                    title: 'description',
                    filter: false
                },
                value: {
                    title: 'value',
                    filter: false
                },
                verified: {
                    title: 'verified',
                    filter: false,
                    type: 'custom',
                    valuePrepareFunction: function (value, row, cell) {
                        var sentData = new multi_sel_component_1.ResourceMultiSel();
                        sentData.action = [];
                        sentData.styl = [];
                        sentData.stepClass = [];
                        if (value) {
                            sentData.action.push('VIEW');
                            sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');
                            sentData.stepClass.push('bg-secondary btn btn-outline-secondary-2x');
                        }
                        else {
                            sentData.action.push('NONE');
                            sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;cursor: pointer;');
                            sentData.stepClass.push('btn btn-outline');
                        }
                        return sentData;
                    },
                    renderComponent: multi_sel_component_1.MultiSelComponent,
                    onComponentInitFunction: function (instance) {
                        instance.save.subscribe(function (item) {
                            // console.log(item)     
                            _this.viewModalCreditMovementVerified(item);
                        });
                    }
                },
                active: {
                    title: 'Status',
                    filter: false,
                    type: 'custom',
                    editable: false,
                    valuePrepareFunction: function (value, row, cell) {
                        var sentData = {
                            renderValue: "",
                            step: "",
                            styl: ""
                        };
                        if (row.active) {
                            sentData.renderValue = "";
                            sentData.step = 'btn btn-outline';
                            sentData.styl = 'background-color: #81ba00;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 1rem;padding: 0.4em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        else {
                            sentData.renderValue = "";
                            sentData.step = 'btn btn-outline';
                            sentData.styl = 'background-color: red;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 1rem;padding: 0.4em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        return JSON.stringify(sentData);
                    },
                    renderComponent: button_view_component_1.ButtonViewComponent
                }
            }
        };
    };
    ListImportedCreditMovementsComponent.prototype.viewModalCreditMovementVerified = function (item) {
        var _this = this;
        this.creditMovementsImported = item.entity;
        // console.log(item.entity);
        if (this.creditMovementsImported != null) {
            this.optionsCreditMovement.auxMediaTypeAccept = environment_1.environment.mediaTypes.creditMovement.getUnique.accept.getJson;
            this.optionsCreditMovement.creditMovementsImportedId = this.creditMovementsImported.creditMovementsImportedId;
            var params = new http_1.HttpParams();
            if (this.optionsCreditMovement.creditMovementsImportedId != null) {
                params = params.append('CreditMovementsImportedId', this.optionsCreditMovement.creditMovementsImportedId);
            }
            if (this.optionsCreditMovement.orderBy != null) {
                params = params.append('OrderBy', this.optionsCreditMovement.orderBy);
            }
            if (this.optionsCreditMovement.fields != null) {
                params = params.append('Fields', this.optionsCreditMovement.fields);
            }
            params = params.append('PageNumber', this.optionsCreditMovement.currentPage.toString());
            params = params.append('PageSize', this.optionsCreditMovement.pageSize.toString());
            this.creditMovementsService
                .getAllCreditMovements(params, this.optionsCreditMovement.auxMediaTypeAccept)
                .subscribe(function (result) {
                if (!result) {
                    return;
                }
                if (result.status == 200) {
                    if (_this.optionsCreditMovement.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                        if (result.body.value.length == 1) {
                            _this.creditMovementVerified = result.body.value[0];
                            _this.optionsCreditMovement.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                            _this.optionsCreditMovement.totalCount = _this.optionsCreditMovement.totalCount['totalCount'];
                            _this.openModal(_this.contenidoDelModal, null, null);
                        }
                        else {
                            console.warn("Hay un arror, esta consulta a devuelto mas de un resultado");
                        }
                    }
                    else {
                        // console.log(result.body);
                        if (result.body.length == 1) {
                            _this.creditMovementVerified = result.body[0];
                            _this.optionsCreditMovement.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                            _this.optionsCreditMovement.totalCount = _this.optionsCreditMovement.totalCount['totalCount'];
                            _this.openModal(_this.contenidoDelModal, null, null);
                        }
                        else {
                            console.warn("Hay un arror, esta consulta a devuelto mas de un resultado");
                        }
                    }
                }
            }, function (err) {
                console.warn(err);
            });
        }
    };
    ListImportedCreditMovementsComponent.prototype.openModal = function (content, entity, button) {
        var _this = this;
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
            .result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason, entity, button);
        });
    };
    ListImportedCreditMovementsComponent.prototype.getDismissReason = function (reason, entity, button) {
        console.log(reason);
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else if (reason == 'accept' && button == 'edit deposit') {
            // this.deleteDeposit(entity);
        }
        else if (reason == 'accept' && button == 'VERIFI') {
            // this.verifiedDeposit(entity);
        }
        else {
            return "with: " + reason;
        }
    };
    ListImportedCreditMovementsComponent.prototype.initSettingsCreditMovementsImportedSelect = function () {
        var _this = this;
        console.log("Entro aqui");
        this.optionsCreditMovementsImported.settings = {
            mode: 'inline',
            actions: {
                add: false,
                edit: false,
                "delete": false
            },
            pager: {
                display: true,
                perPage: this.optionsCreditMovementsImported.showPerPage
            },
            columns: {
                Button: {
                    title: 'Select',
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
                                _this.submitCMISelected.emit(instance.rowData);
                            }
                            else {
                                _this.submitCMISelected.emit(null);
                            }
                        });
                    }
                },
                date: {
                    title: 'date',
                    filter: false,
                    type: 'custom',
                    valuePrepareFunction: function (value, row, cell) {
                        // DATA FROM HERE GOES TO renderComponent
                        //return "this.roles";
                        var sentData = {
                            renderValue: "",
                            step: "",
                            styl: ""
                        };
                        if (row.active > 0) {
                            sentData.renderValue = new common_1.DatePipe('en-US').transform(value, 'd/MMM/yyyy');
                            sentData.step = 'btn btn-outline';
                            sentData.styl = 'line-height: 1;text-align: center;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 90%;cursor: auto;';
                        }
                        else {
                            sentData.renderValue = new common_1.DatePipe('en-US').transform(value, 'd/MMM/yyyy');
                            sentData.step = 'btn btn-outline';
                            sentData.styl = 'background-color: red;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        return JSON.stringify(sentData);
                    },
                    renderComponent: button_view_component_1.ButtonViewComponent
                },
                office: {
                    title: 'office',
                    filter: false
                },
                document: {
                    title: 'document',
                    filter: false
                },
                description: {
                    title: 'description',
                    filter: false
                },
                value: {
                    title: 'value',
                    filter: false
                },
                verified: {
                    title: 'verified',
                    filter: false,
                    type: 'custom',
                    valuePrepareFunction: function (value, row, cell) {
                        var sentData = new multi_sel_component_1.ResourceMultiSel();
                        sentData.action = [];
                        sentData.styl = [];
                        sentData.stepClass = [];
                        if (value) {
                            sentData.action.push('VIEW');
                            sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');
                            sentData.stepClass.push('bg-secondary btn btn-outline-secondary-2x');
                        }
                        else {
                            sentData.action.push('NONE');
                            sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;cursor: pointer;');
                            sentData.stepClass.push('btn btn-outline');
                        }
                        return sentData;
                    },
                    renderComponent: multi_sel_component_1.MultiSelComponent,
                    onComponentInitFunction: function (instance) {
                        instance.save.subscribe(function (item) {
                            _this.viewModalCreditMovementVerified(item);
                        });
                    }
                },
                active: {
                    title: 'Status',
                    filter: false,
                    type: 'custom',
                    editable: false,
                    valuePrepareFunction: function (value, row, cell) {
                        var sentData = {
                            renderValue: "",
                            step: "",
                            styl: ""
                        };
                        if (row.active) {
                            sentData.renderValue = "";
                            sentData.step = 'btn btn-outline';
                            sentData.styl = 'background-color: #81ba00;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 1rem;padding: 0.4em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        else {
                            sentData.renderValue = "";
                            sentData.step = 'btn btn-outline';
                            sentData.styl = 'background-color: red;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 1rem;padding: 0.4em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        return JSON.stringify(sentData);
                    },
                    renderComponent: button_view_component_1.ButtonViewComponent
                }
            }
        };
    };
    ListImportedCreditMovementsComponent.prototype.initDataCreditMovementsImported = function () {
        var _this = this;
        var params = new http_1.HttpParams();
        if (this.optionsCreditMovementsImported.searchQuery != null) {
            params = params.append('SearchQuery', this.optionsCreditMovementsImported.searchQuery);
        }
        if (this.optionsCreditMovementsImported.date != null) {
            params = params.append('Date', this.optionsCreditMovementsImported.date.toString());
        }
        if (this.optionsCreditMovementsImported.office != null) {
            params = params.append('Office', this.optionsCreditMovementsImported.office);
        }
        if (this.optionsCreditMovementsImported.description != null) {
            params = params.append('Description', this.optionsCreditMovementsImported.description);
        }
        if (this.optionsCreditMovementsImported.value != null) {
            params = params.append('Value', this.optionsCreditMovementsImported.value);
        }
        if (this.optionsCreditMovementsImported.verified != null) {
            params = params.append('Verified', this.optionsCreditMovementsImported.verified);
        }
        if (this.optionsCreditMovementsImported.document != null) {
            params = params.append('Document', this.optionsCreditMovementsImported.document);
        }
        // if (this.optionsCreditMovementsImported.bankIdReference != null) {
        //   params = params.append('BankIdReference', this.optionsCreditMovementsImported.bankIdReference);
        // }
        if (this.optionsCreditMovementsImported.active != null) {
            params = params.append('Active', this.optionsCreditMovementsImported.active);
        }
        if (this.optionsCreditMovementsImported.orderBy != null) {
            params = params.append('OrderBy', this.optionsCreditMovementsImported.orderBy);
        }
        if (this.optionsCreditMovementsImported.fields != null) {
            params = params.append('Fields', this.optionsCreditMovementsImported.fields);
        }
        params = params.append('PageNumber', this.optionsCreditMovementsImported.currentPage.toString());
        params = params.append('PageSize', this.optionsCreditMovementsImported.pageSize.toString());
        this.creditMovementsService
            .getAllCreditMovementsImported(this.bankAccountId, params, this.optionsCreditMovementsImported.auxMediaTypeAccept)
            .subscribe(function (result) {
            if (!result) {
                return;
            }
            if (result.status == 200) {
                if (_this.optionsCreditMovementsImported.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                    _this.optionsCreditMovementsImported.source.load(result.body.value);
                    _this.optionsCreditMovementsImported.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsCreditMovementsImported.totalCount = _this.optionsCreditMovementsImported.totalCount['totalCount'];
                }
                else {
                    _this.optionsCreditMovementsImported.source.load(result.body);
                    _this.optionsCreditMovementsImported.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsCreditMovementsImported.totalCount = _this.optionsCreditMovementsImported.totalCount['totalCount'];
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    ListImportedCreditMovementsComponent.prototype.pageChangeCreditMovementsImported = function (pageIndex) {
        var _this = this;
        var getNew = pageIndex * this.optionsCreditMovementsImported.showPerPage;
        if (getNew >= this.optionsCreditMovementsImported.source.count() && getNew < this.optionsCreditMovementsImported.totalCount) {
            this.optionsCreditMovementsImported.currentPage = this.optionsCreditMovementsImported.currentPage + 1;
            var params = new http_1.HttpParams();
            if (this.optionsCreditMovementsImported.searchQuery != null) {
                params = params.append('SearchQuery', this.optionsCreditMovementsImported.searchQuery);
            }
            if (this.optionsCreditMovementsImported.date != null) {
                params = params.append('Date', this.optionsCreditMovementsImported.date.toString());
            }
            if (this.optionsCreditMovementsImported.office != null) {
                params = params.append('Office', this.optionsCreditMovementsImported.office);
            }
            if (this.optionsCreditMovementsImported.description != null) {
                params = params.append('Description', this.optionsCreditMovementsImported.description);
            }
            if (this.optionsCreditMovementsImported.value != null) {
                params = params.append('Value', this.optionsCreditMovementsImported.value);
            }
            if (this.optionsCreditMovementsImported.verified != null) {
                params = params.append('Verified', this.optionsCreditMovementsImported.verified);
            }
            if (this.optionsCreditMovementsImported.document != null) {
                params = params.append('Document', this.optionsCreditMovementsImported.document);
            }
            if (this.optionsCreditMovementsImported.bankIdReference != null) {
                params = params.append('BankIdReference', this.optionsCreditMovementsImported.bankIdReference);
            }
            if (this.optionsCreditMovementsImported.active != null) {
                params = params.append('Active', this.optionsCreditMovementsImported.active);
            }
            if (this.optionsCreditMovementsImported.orderBy != null) {
                params = params.append('OrderBy', this.optionsCreditMovementsImported.orderBy);
            }
            if (this.optionsCreditMovementsImported.fields != null) {
                params = params.append('Fields', this.optionsCreditMovementsImported.fields);
            }
            params = params.append('PageNumber', this.optionsCreditMovementsImported.currentPage.toString());
            params = params.append('PageSize', this.optionsCreditMovementsImported.pageSize.toString());
            this.creditMovementsService
                .getAllCreditMovementsImported(this.bankAccountId, params, this.optionsCreditMovementsImported.auxMediaTypeAccept)
                .subscribe(function (result) {
                if (!result) {
                    return;
                }
                if (result.status == 200) {
                    if (_this.optionsCreditMovementsImported.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                        result.body.value.forEach(function (element) {
                            _this.optionsCreditMovementsImported.source.add(element);
                        });
                    }
                    else {
                        result.body.forEach(function (element) {
                            _this.optionsCreditMovementsImported.source.add(element);
                        });
                    }
                }
            }, function (err) {
                console.warn(err);
            });
        }
    };
    ListImportedCreditMovementsComponent.prototype.clickAll = function () {
        if (this.filterAll == false) {
            this.filterAll = true;
            this.optionsCreditMovementsImported.active = null;
            this.optionsCreditMovementsImported.verified = null;
            this.stringActive = 'Active (All)';
            this.stringVerified = 'Verified (All)';
        }
    };
    ListImportedCreditMovementsComponent.prototype.clickVerifie = function () {
        this.filterAll = false;
        this.optionsCreditMovementsImported.verified = !this.optionsCreditMovementsImported.verified;
        if (this.optionsCreditMovementsImported.verified) {
            this.stringVerified = 'Verified (Yes)';
        }
        else {
            this.stringVerified = 'Verified (No)';
        }
    };
    ListImportedCreditMovementsComponent.prototype.clickActive = function () {
        this.filterAll = false;
        this.optionsCreditMovementsImported.active = !this.optionsCreditMovementsImported.active;
        if (this.optionsCreditMovementsImported.active) {
            this.stringActive = 'Active (YES)';
        }
        else {
            this.stringActive = 'Active (No)';
        }
    };
    __decorate([
        core_1.Input()
    ], ListImportedCreditMovementsComponent.prototype, "bankAccountId");
    __decorate([
        core_1.Input()
    ], ListImportedCreditMovementsComponent.prototype, "columnSelect");
    __decorate([
        core_1.Output()
    ], ListImportedCreditMovementsComponent.prototype, "submitCMISelected");
    __decorate([
        core_1.Input()
    ], ListImportedCreditMovementsComponent.prototype, "stringVerified");
    __decorate([
        core_1.Input()
    ], ListImportedCreditMovementsComponent.prototype, "showVerified");
    __decorate([
        core_1.ViewChild('content', { static: false })
    ], ListImportedCreditMovementsComponent.prototype, "contenidoDelModal");
    ListImportedCreditMovementsComponent = __decorate([
        core_1.Component({
            selector: 'app-list-imported-credit-movements',
            templateUrl: './list-imported-credit-movements.component.html',
            styleUrls: ['./list-imported-credit-movements.component.scss']
        })
    ], ListImportedCreditMovementsComponent);
    return ListImportedCreditMovementsComponent;
}());
exports.ListImportedCreditMovementsComponent = ListImportedCreditMovementsComponent;
