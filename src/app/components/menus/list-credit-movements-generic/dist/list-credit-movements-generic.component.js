"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListCreditMovementsGenericComponent = void 0;
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var button_view_component_1 = require("src/app/shared/button-view/button-view.component");
var multi_sel_component_1 = require("src/app/shared/multi-sel/multi-sel.component");
var environment_1 = require("src/environments/environment");
var options_bank_account_1 = require("../../setting/models/BankAccounts/options-bank-account");
var options_credit_movement_status_1 = require("../../setting/models/CreditMovementStatus/options-credit-movement-status");
var options_credit_reason_1 = require("../../setting/models/CreditReason/options-credit-reason");
var ListCreditMovementsGenericComponent = /** @class */ (function () {
    function ListCreditMovementsGenericComponent(router, menusServices) {
        this.router = router;
        this.menusServices = menusServices;
        this.submit = new core_1.EventEmitter();
        this.update = new core_1.EventEmitter();
        this["delete"] = new core_1.EventEmitter();
        this.patchVerified = new core_1.EventEmitter();
        this.optionsCreditMovementStatus = new options_credit_movement_status_1.OptionsCreditMovementStatus();
        this.optionsCreditReason = new options_credit_reason_1.OptionsCreditReason();
        this.optionsBankAccounts = new options_bank_account_1.OptionsBankAccount();
    }
    ListCreditMovementsGenericComponent.prototype.searchData = function () {
        this.submit.emit(this.optionsCreditMovement);
    };
    ListCreditMovementsGenericComponent.prototype.onEdit = function (event) {
        this.update.emit(event.data);
    };
    ListCreditMovementsGenericComponent.prototype.onDelete = function (event) {
        this["delete"].emit(event.data);
    };
    ListCreditMovementsGenericComponent.prototype.ngOnInit = function () {
        this.inicializarTabla();
        this.optionsCreditReason.auxMediaTypeAccept = environment_1.environment.mediaTypes.creditReason.get.accept.getAllJson;
        this.optionsCreditReason.active = true;
        // this.optionsCreditReason.fields = 'type,active';
        this.initDataCreditReasons();
        this.optionsCreditMovementStatus.auxMediaTypeAccept = environment_1.environment.mediaTypes.creditMovementStatus.get.accept.getAllJson;
        this.optionsCreditMovementStatus.active = true;
        // this.optionsCreditMovementStatus.fields = 'type,active';
        this.initDataCreditMovementStatus();
        this.optionsBankAccounts.auxMediaTypeAccept = environment_1.environment.mediaTypes.bankAccounts.get.accept.getAllJson;
        // this.optionsCreditMovementStatus.active = true;
        // this.optionsCreditMovementStatus.fields = 'type,active';
        this.initDataBankAccount();
    };
    ListCreditMovementsGenericComponent.prototype.initDataBankAccount = function () {
        var _this = this;
        var params = new http_1.HttpParams();
        // if (this.optionsBankAccounts.searchQuery != null) {
        //   params = params.append('SearchQuery', this.optionsBankAccounts.searchQuery);
        // }
        // if (this.optionsBankAccounts.accountNumber != null) {
        //   params = params.append('AccountNumber', this.optionsBankAccounts.accountNumber);
        // }
        // if (this.optionsBankAccounts.accountAlias != null) {
        //   params = params.append('AccountAlias', this.optionsBankAccounts.accountAlias);
        // }
        // if (this.optionsBankAccounts.employeeReferenceId != null) {
        //   params = params.append('EmployeeReferenceId', this.optionsBankAccounts.employeeReferenceId);
        // }
        // if (this.optionsBankAccounts.accountOwner != null) {
        //   params = params.append('AccountOwner', this.optionsBankAccounts.accountOwner);
        // }
        // if (this.optionsBankAccounts.dniAccountOwner != null) {
        //   params = params.append('DniAccountOwner', this.optionsBankAccounts.dniAccountOwner);
        // }
        // if (this.optionsBankAccounts.accountTypeId != null) {
        //   params = params.append('AccountTypeId', this.optionsBankAccounts.accountTypeId);
        // }
        // if (this.optionsBankAccounts.bankId != null) {
        //   params = params.append('BankId', this.optionsBankAccounts.bankId);
        // }
        if (this.optionsBankAccounts.active != null) {
            params = params.append('Active', this.optionsBankAccounts.active);
        }
        // if (this.optionsBankAccounts.orderBy != null) {
        //   params = params.append('OrderBy', this.optionsBankAccounts.orderBy);
        // }
        if (this.optionsBankAccounts.fields != null) {
            params = params.append('Fields', this.optionsBankAccounts.fields);
        }
        params = params.append('PageNumber', this.optionsBankAccounts.currentPage.toString());
        params = params.append('PageSize', this.optionsBankAccounts.pageSize.toString());
        this.menusServices
            .getAllBankAccounts(params, this.optionsBankAccounts.auxMediaTypeAccept)
            .subscribe(function (result) {
            if (!result) {
                return;
            }
            if (result.status == 200) {
                if (_this.optionsBankAccounts.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                    _this.arrayBankAccounts = result.body.value;
                    _this.optionsBankAccounts.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsBankAccounts.totalCount = _this.optionsBankAccounts.totalCount['totalCount'];
                }
                else {
                    _this.arrayBankAccounts = result.body;
                    _this.optionsBankAccounts.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsBankAccounts.totalCount = _this.optionsBankAccounts.totalCount['totalCount'];
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    ListCreditMovementsGenericComponent.prototype.initDataCreditReasons = function () {
        var _this = this;
        var params = new http_1.HttpParams();
        if (this.optionsCreditReason.searchQuery != null) {
            params = params.append('SearchQuery', this.optionsCreditReason.searchQuery);
        }
        if (this.optionsCreditReason.active != null) {
            params = params.append('Active', this.optionsCreditReason.active);
        }
        if (this.optionsCreditReason.orderBy != null) {
            params = params.append('OrderBy', this.optionsCreditReason.orderBy);
        }
        if (this.optionsCreditReason.fields != null) {
            params = params.append('Fields', this.optionsCreditReason.fields);
        }
        params = params.append('PageNumber', this.optionsCreditReason.currentPage.toString());
        params = params.append('PageSize', this.optionsCreditReason.pageSize.toString());
        this.menusServices
            .getAllCreditReasons(params, this.optionsCreditReason.auxMediaTypeAccept)
            .subscribe(function (result) {
            if (!result) {
                return;
            }
            if (result.status == 200) {
                if (_this.optionsCreditReason.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                    _this.arrayCreditReasons = result.body.value;
                    _this.optionsCreditReason.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsCreditReason.totalCount = _this.optionsCreditReason.totalCount['totalCount'];
                }
                else {
                    _this.arrayCreditReasons = result.body;
                    _this.optionsCreditReason.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsCreditReason.totalCount = _this.optionsCreditReason.totalCount['totalCount'];
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    ListCreditMovementsGenericComponent.prototype.initDataCreditMovementStatus = function () {
        var _this = this;
        var params = new http_1.HttpParams();
        if (this.optionsCreditMovementStatus.searchQuery != null) {
            params = params.append('SearchQuery', this.optionsCreditMovementStatus.searchQuery);
        }
        if (this.optionsCreditMovementStatus.active != null) {
            params = params.append('Active', this.optionsCreditMovementStatus.active);
        }
        if (this.optionsCreditMovementStatus.orderBy != null) {
            params = params.append('OrderBy', this.optionsCreditMovementStatus.orderBy);
        }
        if (this.optionsCreditMovementStatus.fields != null) {
            params = params.append('Fields', this.optionsCreditMovementStatus.fields);
        }
        params = params.append('PageNumber', this.optionsCreditMovementStatus.currentPage.toString());
        params = params.append('PageSize', this.optionsCreditMovementStatus.pageSize.toString());
        this.menusServices
            .getAllCreditMovementStatus(params, this.optionsCreditMovementStatus.auxMediaTypeAccept)
            .subscribe(function (result) {
            if (!result) {
                return;
            }
            if (result.status == 200) {
                if (_this.optionsCreditMovementStatus.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                    _this.arrayCreditMovementStatuses = result.body.value;
                    _this.optionsCreditMovementStatus.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsCreditMovementStatus.totalCount = _this.optionsCreditMovementStatus.totalCount['totalCount'];
                }
                else {
                    _this.arrayCreditMovementStatuses = result.body;
                    _this.optionsCreditMovementStatus.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsCreditMovementStatus.totalCount = _this.optionsCreditMovementStatus.totalCount['totalCount'];
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    ListCreditMovementsGenericComponent.prototype.inicializarTabla = function () {
        var _this = this;
        this.optionsCreditMovement.settings = {
            mode: 'external',
            pager: {
                display: true,
                perPage: this.optionsCreditMovement.showPerPage
            },
            actions: {
                add: false,
                edit: true,
                "delete": true,
                position: 'right'
            },
            columns: {
                depositDate: {
                    title: 'depositDate',
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
                        if (!row.active) {
                            sentData.renderValue = new common_1.DatePipe('en-US').transform(value, 'd/MMM/yyyy');
                            sentData.step = 'btn btn-outline';
                            sentData.styl = 'background-color: red;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        else if (row.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.payVerified) {
                            sentData.renderValue = new common_1.DatePipe('en-US').transform(value, 'd/MMM/yyyy');
                            sentData.step = 'bg-success btn btn-outline';
                            sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        else if (row.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.pendingReview) {
                            sentData.renderValue = new common_1.DatePipe('en-US').transform(value, 'd/MMM/yyyy');
                            sentData.step = 'btn btn-outline bg-danger';
                            sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        else if (row.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.payNotFound) {
                            sentData.renderValue = new common_1.DatePipe('en-US').transform(value, 'd/MMM/yyyy');
                            sentData.step = 'btn btn-outline bg-dark';
                            sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        else { // ninguna de las otras 3 opciones
                            sentData.renderValue = new common_1.DatePipe('en-US').transform(value, 'd/MMM/yyyy');
                            sentData.step = 'btn btn-outline bg-info';
                            sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        return JSON.stringify(sentData);
                    },
                    renderComponent: button_view_component_1.ButtonViewComponent
                },
                registerDate: {
                    title: 'registerDate',
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
                            sentData.renderValue = new common_1.DatePipe('en-US').transform(value, 'd/MMM/yyyy, h:mm a');
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
                client: {
                    title: 'client',
                    filter: false,
                    type: 'custom',
                    valuePrepareFunction: function (value, row, cell) {
                        var sentData = {
                            renderValue: value.name,
                            step: "btn btn-outline p-1 text-capitalize text-info"
                        };
                        return JSON.stringify(sentData);
                    },
                    renderComponent: button_view_component_1.ButtonViewComponent,
                    onComponentInitFunction: function (instance) {
                        instance.save.subscribe(function (row) {
                            _this.router.navigate(['/clients/bills/' + row.client.clientId]);
                        });
                    }
                },
                bankAccount: {
                    title: 'bankAccount',
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
                        if (!row.active) {
                            sentData.renderValue = value.accountAlias;
                            sentData.step = 'btn btn-outline';
                            sentData.styl = 'background-color: red;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        else if (row.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.payVerified) {
                            sentData.renderValue = value.accountAlias;
                            sentData.step = 'bg-success btn btn-outline';
                            sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        else if (row.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.pendingReview) {
                            sentData.renderValue = value.accountAlias;
                            sentData.step = 'btn btn-outline bg-danger';
                            sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        else if (row.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.payNotFound) {
                            sentData.renderValue = value.accountAlias;
                            sentData.step = 'btn btn-outline bg-dark';
                            sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        else { // ninguna de las otras 3 opciones
                            sentData.renderValue = value.accountAlias;
                            sentData.step = 'btn btn-outline bg-info';
                            sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        // if (value.accountAlias.toLowerCase().includes("cash")) {
                        //   sentData.renderValue = value.accountAlias;
                        //   sentData.step = 'bg-info btn btn-outline';
                        //   sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        // } else {
                        //   sentData.renderValue = value.accountAlias;
                        //   sentData.step = 'bg-success btn btn-outline';
                        //   sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        // }
                        return JSON.stringify(sentData);
                    },
                    renderComponent: button_view_component_1.ButtonViewComponent
                },
                document: {
                    title: '# document',
                    filter: false
                },
                value: {
                    title: '$ value',
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
                        if (value > 0) {
                            sentData.renderValue = new common_1.CurrencyPipe('en-US').transform(value, 'USD', 'symbol');
                            sentData.step = 'btn btn-outline';
                            sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 90%;cursor: auto;';
                        }
                        else {
                            sentData.renderValue = new common_1.CurrencyPipe('en-US').transform(value, 'USD', 'symbol');
                            sentData.step = 'bg-danger btn btn-outline';
                            sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 75%;cursor: auto;';
                        }
                        return JSON.stringify(sentData);
                    },
                    renderComponent: button_view_component_1.ButtonViewComponent
                },
                image: {
                    type: 'html',
                    title: 'Image',
                    filter: false,
                    valuePrepareFunction: function (images) {
                        if (images) {
                            return "<a href=\"" + images + "\" target=\"_blank\" rel=\"noopener noreferrer\">View Image</a>";
                        }
                        else {
                            return "<h6>NONE</h6>";
                        }
                    }
                },
                creditMovementStatus: {
                    title: 'creditMovementStatus',
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
                        if (!row.active) {
                            sentData.renderValue = value.status;
                            sentData.step = 'btn btn-outline';
                            sentData.styl = 'background-color: red;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        else if (row.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.payVerified) {
                            sentData.renderValue = value.status;
                            sentData.step = 'bg-success btn btn-outline';
                            sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        else if (row.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.pendingReview) {
                            sentData.renderValue = value.status;
                            sentData.step = 'btn btn-outline bg-danger';
                            sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        else if (row.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.payNotFound) {
                            sentData.renderValue = value.status;
                            sentData.step = 'btn btn-outline bg-dark';
                            sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        else { // ninguna de las otras 3 opciones
                            sentData.renderValue = value.status;
                            sentData.step = 'btn btn-outline bg-info';
                            sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
                        }
                        return JSON.stringify(sentData);
                    },
                    renderComponent: button_view_component_1.ButtonViewComponent
                },
                verifiedType: {
                    title: 'verifiedType',
                    filter: false
                },
                multiple: {
                    title: 'Buttons',
                    filter: false,
                    type: 'custom',
                    valuePrepareFunction: function (value, row, cell) {
                        var sentData = new multi_sel_component_1.ResourceMultiSel();
                        sentData.action = [];
                        sentData.styl = [];
                        sentData.stepClass = [];
                        if (!row.active) {
                            sentData.action.push('RESTORE');
                            sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');
                            sentData.stepClass.push('bg-info btn btn-outline');
                        }
                        else if (row.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.payVerified) {
                            sentData.action.push('UNVERIFIED');
                            sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');
                            sentData.stepClass.push('btn btn-outline bg-danger');
                        }
                        else if (row.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.pendingReview) {
                            sentData.action.push('VERIFIED');
                            sentData.action.push('NOT FOUND');
                            sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');
                            sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');
                            sentData.stepClass.push('bg-success btn btn-outline');
                            sentData.stepClass.push('btn btn-outline bg-dark');
                        }
                        else if (row.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.payNotFound) {
                            sentData.action.push('UNVERIFIED (NF)');
                            sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');
                            sentData.stepClass.push('btn btn-outline bg-danger');
                        }
                        return sentData;
                    },
                    renderComponent: multi_sel_component_1.MultiSelComponent,
                    onComponentInitFunction: function (instance) {
                        instance.save.subscribe(function (item) {
                            console.log(item);
                            _this.patchVerified.emit(item);
                        });
                    }
                }
            }
        };
    };
    ListCreditMovementsGenericComponent.prototype.clickActive = function () {
        this.optionsCreditMovement.active = !this.optionsCreditMovement.active;
    };
    ListCreditMovementsGenericComponent.prototype.changeSettingsTable = function (event) {
        this.optionsCreditMovement.source.setPaging(1, this.optionsCreditMovement.showPerPage);
    };
    __decorate([
        core_1.Input()
    ], ListCreditMovementsGenericComponent.prototype, "optionsCreditMovement");
    __decorate([
        core_1.Output()
    ], ListCreditMovementsGenericComponent.prototype, "submit");
    __decorate([
        core_1.Output()
    ], ListCreditMovementsGenericComponent.prototype, "update");
    __decorate([
        core_1.Output()
    ], ListCreditMovementsGenericComponent.prototype, "delete");
    __decorate([
        core_1.Output()
    ], ListCreditMovementsGenericComponent.prototype, "patchVerified");
    ListCreditMovementsGenericComponent = __decorate([
        core_1.Component({
            selector: 'app-list-credit-movements-generic',
            templateUrl: './list-credit-movements-generic.component.html',
            styleUrls: ['./list-credit-movements-generic.component.scss']
        })
    ], ListCreditMovementsGenericComponent);
    return ListCreditMovementsGenericComponent;
}());
exports.ListCreditMovementsGenericComponent = ListCreditMovementsGenericComponent;
