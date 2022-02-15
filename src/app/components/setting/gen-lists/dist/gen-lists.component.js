"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GenListsComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var button_view_component_1 = require("src/app/shared/button-view/button-view.component");
var environment_1 = require("src/environments/environment");
var options_order_state_1 = require("../../purchases/models/OrderState/options-order-state");
var options_type_post_box_1 = require("../../users/models/PostBox/options-type-post-box");
var options_account_types_1 = require("../models/AccountType/options-account-types");
var options_bank_1 = require("../models/Bank/options-bank");
var bank_account_for_create_dto_1 = require("../models/BankAccounts/bank-account-for-create-dto");
var options_bank_account_1 = require("../models/BankAccounts/options-bank-account");
var options_credit_movement_status_1 = require("../models/CreditMovementStatus/options-credit-movement-status");
var options_credit_reason_1 = require("../models/CreditReason/options-credit-reason");
var options_debit_movement_status_1 = require("../models/DebitMovementStatus/options-debit-movement-status");
var options_debit_reason_1 = require("../models/DebitReason/options-debit-reason");
var GenListsComponent = /** @class */ (function () {
    function GenListsComponent(menusServices) {
        this.menusServices = menusServices;
        this.optionsBanks = new options_bank_1.OptionsBank();
        this.optionsBankAccounts = new options_bank_account_1.OptionsBankAccount();
        this.optionsDebitReason = new options_debit_reason_1.OptionsDebitReason();
        this.optionsAccountTypes = new options_account_types_1.OptionsAccountTypes();
        this.optionsCreditReason = new options_credit_reason_1.OptionsCreditReason();
        this.optionsDebitMovementStatus = new options_debit_movement_status_1.OptionsDebitMovementStatus();
        this.optionsCreditMovementStatus = new options_credit_movement_status_1.OptionsCreditMovementStatus();
        this.optionsTypePostBox = new options_type_post_box_1.OptionsTypePostBox();
        this.optionsOrderState = new options_order_state_1.OptionsOrderState();
        this.initSettingsAccountTypes();
        this.initSettingsBanks();
        this.initSettingsCreditMovementStatus();
        this.initSettingsCreditReason();
        this.initSettingsDebitMovementStatus();
        this.initSettingsDebitReason();
        this.initSettingsBankAccount();
        this.initSettingsTypePostBox();
        this.initSettingsOrderState();
    }
    GenListsComponent.prototype.ngOnInit = function () {
        this.optionsAccountTypes.auxMediaTypeAccept = environment_1.environment.mediaTypes.accountType.get.accept.getAllJson;
        // this.optionsAccountTypes.active = true;
        // this.optionsAccountTypes.fields = 'type,active';
        this.initDataAccountTypes();
        this.optionsBanks.auxMediaTypeAccept = environment_1.environment.mediaTypes.bank.get.accept.getAllJson;
        // this.optionsBanks.active = true;
        // this.optionsBanks.fields = 'type,active';
        this.initDataBanks();
        this.optionsDebitReason.auxMediaTypeAccept = environment_1.environment.mediaTypes.debitReason.get.accept.getAllJson;
        // this.optionsDebitReason.active = true;
        // this.optionsDebitReason.fields = 'type,active';
        this.initDataDebitReasons();
        this.optionsCreditReason.auxMediaTypeAccept = environment_1.environment.mediaTypes.creditReason.get.accept.getAllJson;
        // this.optionsCreditReason.active = true;
        // this.optionsCreditReason.fields = 'type,active';
        this.initDataCreditReasons();
        this.optionsDebitMovementStatus.auxMediaTypeAccept = environment_1.environment.mediaTypes.debitMovementStatus.get.accept.getAllJson;
        // this.optionsDebitMovementStatus.active = true;
        // this.optionsDebitMovementStatus.fields = 'type,active';
        this.initDataDebitMovementStatus();
        this.optionsCreditMovementStatus.auxMediaTypeAccept = environment_1.environment.mediaTypes.creditMovementStatus.get.accept.getAllJson;
        // this.optionsCreditMovementStatus.active = true;
        // this.optionsCreditMovementStatus.fields = 'type,active';
        this.initDataCreditMovementStatus();
        this.optionsBankAccounts.auxMediaTypeAccept = environment_1.environment.mediaTypes.bankAccounts.get.accept.getAllJson;
        // this.optionsCreditMovementStatus.active = true;
        // this.optionsCreditMovementStatus.fields = 'type,active';
        this.initDataBankAccount();
        this.optionsTypePostBox.auxMediaTypeAccept = environment_1.environment.mediaTypes.typePostBox.get.accept.getAllJson;
        // this.optionsCreditReason.active = true;
        // this.optionsCreditReason.fields = 'type,active';
        this.initDataTypePostBox();
        this.optionsOrderState.auxMediaTypeAccept = environment_1.environment.mediaTypes.orderState.get.accept.getAllJson;
        // this.optionsCreditReason.active = true;
        // this.optionsCreditReason.fields = 'type,active';
        this.initDataOrderState();
        this.initOnChagedData();
    };
    GenListsComponent.prototype.initOnChagedData = function () {
        var _this = this;
        this.optionsAccountTypes.source.onChanged().subscribe(function (change) {
            if (change.action === 'page') {
                _this.pageChangeAccountTypes(change.paging.page);
            }
        });
        this.optionsBanks.source.onChanged().subscribe(function (change) {
            if (change.action === 'page') {
                _this.pageChangeBanks(change.paging.page);
            }
        });
        this.optionsBankAccounts.source.onChanged().subscribe(function (change) {
            if (change.action === 'page') {
                _this.pageChangeBankAccount(change.paging.page);
            }
        });
        this.optionsCreditMovementStatus.source.onChanged().subscribe(function (change) {
            if (change.action === 'page') {
                _this.pageChangeCreditMovementStatus(change.paging.page);
            }
        });
        this.optionsCreditReason.source.onChanged().subscribe(function (change) {
            if (change.action === 'page') {
                _this.pageChangeCreditReason(change.paging.page);
            }
        });
        this.optionsDebitMovementStatus.source.onChanged().subscribe(function (change) {
            if (change.action === 'page') {
                _this.pageChangeDebitMovementStatus(change.paging.page);
            }
        });
        this.optionsDebitReason.source.onChanged().subscribe(function (change) {
            if (change.action === 'page') {
                _this.pageChangeDebitReason(change.paging.page);
            }
        });
        this.optionsTypePostBox.source.onChanged().subscribe(function (change) {
            if (change.action === 'page') {
                _this.pageChangeTypePostBox(change.paging.page);
            }
        });
        this.optionsOrderState.source.onChanged().subscribe(function (change) {
            if (change.action === 'page') {
                _this.pageChangeOrderState(change.paging.page);
            }
        });
    };
    //DebitMovementStatus
    GenListsComponent.prototype.initSettingsDebitMovementStatus = function () {
        this.optionsDebitMovementStatus.settings = {
            mode: 'inline',
            "delete": {
                confirmDelete: true
            },
            add: {
                confirmCreate: true
            },
            edit: {
                confirmSave: true
            },
            actions: {
                add: true,
                edit: true,
                "delete": true
            },
            pager: {
                display: true,
                perPage: this.optionsDebitMovementStatus.showPerPage
            },
            columns: {
                status: {
                    title: 'Description',
                    filter: false
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
    GenListsComponent.prototype.initDataDebitMovementStatus = function () {
        var _this = this;
        var params = new http_1.HttpParams();
        if (this.optionsDebitMovementStatus.searchQuery != null) {
            params = params.append('SearchQuery', this.optionsDebitMovementStatus.searchQuery);
        }
        if (this.optionsDebitMovementStatus.active != null) {
            params = params.append('Active', this.optionsDebitMovementStatus.active);
        }
        if (this.optionsDebitMovementStatus.orderBy != null) {
            params = params.append('OrderBy', this.optionsDebitMovementStatus.orderBy);
        }
        if (this.optionsDebitMovementStatus.fields != null) {
            params = params.append('Fields', this.optionsDebitMovementStatus.fields);
        }
        params = params.append('PageNumber', this.optionsDebitMovementStatus.currentPage.toString());
        params = params.append('PageSize', this.optionsDebitMovementStatus.pageSize.toString());
        this.menusServices
            .getAllDebitMovementStatus(params, this.optionsDebitMovementStatus.auxMediaTypeAccept)
            .subscribe(function (result) {
            if (!result) {
                return;
            }
            if (result.status == 200) {
                if (_this.optionsDebitMovementStatus.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                    _this.optionsDebitMovementStatus.source.load(result.body.value);
                    _this.optionsDebitMovementStatus.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsDebitMovementStatus.totalCount = _this.optionsDebitMovementStatus.totalCount['totalCount'];
                }
                else {
                    _this.optionsDebitMovementStatus.source.load(result.body);
                    _this.optionsDebitMovementStatus.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsDebitMovementStatus.totalCount = _this.optionsDebitMovementStatus.totalCount['totalCount'];
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    GenListsComponent.prototype.onDeleteConfirmDebitMovementStatus = function (event) {
        var _this = this;
        var act = null;
        if (event.data.active == true) {
            act = 'delete';
        }
        else {
            act = 'restore';
        }
        if (window.confirm("Are you sure you want to " + act + "?")) {
            var params = new http_1.HttpParams();
            params = params.append('act', act);
            this.menusServices.putDeleteOrRestoreDebitMovementStatus(event.data.debitMovementStatusId, params, environment_1.environment.mediaTypes.debitMovementStatus.put.ContentType.putJson)
                .subscribe(function (result) {
                if (result.status == 200) {
                    _this.optionsDebitMovementStatus.source.getAll().then(function (x) {
                        var aux = x.find(function (element) { return element.debitMovementStatusId == event.data.debitMovementStatusId; });
                        aux.active = !aux.active;
                        _this.optionsDebitMovementStatus.source.load(x);
                    });
                }
            }, function (err) {
                console.warn(err);
                event.confirm.reject();
            });
        }
        else {
            event.confirm.reject();
        }
    };
    GenListsComponent.prototype.onUpdateConfirmDebitMovementStatus = function (event) {
        var toPatch = [
            {
                path: '/Status',
                op: 'replace',
                value: event.newData.status
            },
        ];
        console.log(event.data);
        if (window.confirm('Are you sure you want to save?')) {
            this.menusServices.patchDebitMovementStatus(toPatch, event.data.debitMovementStatusId, environment_1.environment.mediaTypes.debitMovementStatus.patch.ContentType.patchJson)
                .subscribe(function (result) {
                console.log(result);
                if (result.status == 201) {
                    console.log("entro aqi");
                    event.confirm.resolve(event.newData);
                }
            }, function (err) {
                console.warn(err);
                event.confirm.reject();
            });
        }
        else {
            event.confirm.reject();
        }
    };
    GenListsComponent.prototype.onCreateConfirmDebitMovementStatus = function (event) {
        console.log(event);
        var entityCreate = event.newData;
        console.log(entityCreate);
        this.menusServices
            .addDebitMovementStatus(entityCreate, environment_1.environment.mediaTypes.debitMovementStatus.post.ContentType.postJson)
            .subscribe(function (result) {
            console.log(result);
            if (result.status == 201) {
                console.log("entro aqi");
                event.confirm.resolve(result.body);
            }
        }, function (err) {
            console.warn(err);
            event.confirm.reject();
        });
    };
    GenListsComponent.prototype.pageChangeDebitMovementStatus = function (pageIndex) {
        var _this = this;
        var getNew = pageIndex * this.optionsDebitMovementStatus.showPerPage;
        if (getNew >= this.optionsDebitMovementStatus.source.count() && getNew < this.optionsDebitMovementStatus.totalCount) {
            this.optionsDebitMovementStatus.currentPage = this.optionsDebitMovementStatus.currentPage + 1;
            var params = new http_1.HttpParams();
            if (this.optionsDebitMovementStatus.searchQuery != null) {
                params = params.append('SearchQuery', this.optionsDebitMovementStatus.searchQuery);
            }
            if (this.optionsDebitMovementStatus.active != null) {
                params = params.append('Active', this.optionsDebitMovementStatus.active);
            }
            if (this.optionsDebitMovementStatus.orderBy != null) {
                params = params.append('OrderBy', this.optionsDebitMovementStatus.orderBy);
            }
            if (this.optionsDebitMovementStatus.fields != null) {
                params = params.append('Fields', this.optionsDebitMovementStatus.fields);
            }
            params = params.append('PageNumber', this.optionsDebitMovementStatus.currentPage.toString());
            params = params.append('PageSize', this.optionsDebitMovementStatus.pageSize.toString());
            this.menusServices
                .getAllDebitMovementStatus(params, this.optionsDebitMovementStatus.auxMediaTypeAccept)
                .subscribe(function (result) {
                if (!result) {
                    return;
                }
                if (result.status == 200) {
                    if (_this.optionsDebitMovementStatus.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                        // this.optionsDebitMovementStatus.source.load(result.body.value);
                        result.body.value.forEach(function (element) {
                            _this.optionsDebitMovementStatus.source.add(element);
                        });
                    }
                    else {
                        // this.optionsDebitMovementStatus.source.load(result.body);
                        result.body.forEach(function (element) {
                            _this.optionsDebitMovementStatus.source.add(element);
                        });
                    }
                }
            }, function (err) {
                console.warn(err);
            });
        }
    };
    //CreditMovementStatus
    GenListsComponent.prototype.initSettingsCreditMovementStatus = function () {
        this.optionsCreditMovementStatus.settings = {
            mode: 'inline',
            "delete": {
                confirmDelete: true
            },
            add: {
                confirmCreate: true
            },
            edit: {
                confirmSave: true
            },
            actions: {
                add: true,
                edit: true,
                "delete": true
            },
            pager: {
                display: true,
                perPage: this.optionsCreditMovementStatus.showPerPage
            },
            columns: {
                status: {
                    title: 'Description',
                    filter: false
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
    GenListsComponent.prototype.initDataCreditMovementStatus = function () {
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
                    _this.optionsCreditMovementStatus.source.load(result.body.value);
                    _this.optionsCreditMovementStatus.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsCreditMovementStatus.totalCount = _this.optionsCreditMovementStatus.totalCount['totalCount'];
                }
                else {
                    _this.optionsCreditMovementStatus.source.load(result.body);
                    _this.optionsCreditMovementStatus.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsCreditMovementStatus.totalCount = _this.optionsCreditMovementStatus.totalCount['totalCount'];
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    GenListsComponent.prototype.onDeleteConfirmCreditMovementStatus = function (event) {
        var _this = this;
        var act = null;
        if (event.data.active == true) {
            act = 'delete';
        }
        else {
            act = 'restore';
        }
        if (window.confirm("Are you sure you want to " + act + "?")) {
            var params = new http_1.HttpParams();
            params = params.append('act', act);
            this.menusServices.putDeleteOrRestoreCreditMovementStatus(event.data.creditMovementStatusId, params, environment_1.environment.mediaTypes.creditMovementStatus.put.ContentType.putJson)
                .subscribe(function (result) {
                if (result.status == 200) {
                    _this.optionsCreditMovementStatus.source.getAll().then(function (x) {
                        var aux = x.find(function (element) { return element.creditMovementStatusId == event.data.creditMovementStatusId; });
                        aux.active = !aux.active;
                        _this.optionsCreditMovementStatus.source.load(x);
                    });
                }
            }, function (err) {
                console.warn(err);
                event.confirm.reject();
            });
        }
        else {
            event.confirm.reject();
        }
    };
    GenListsComponent.prototype.onUpdateConfirmCreditMovementStatus = function (event) {
        console.log(event);
        var toPatch = [
            {
                path: '/Status',
                op: 'replace',
                value: event.newData.status
            },
        ];
        if (window.confirm('Are you sure you want to save?')) {
            this.menusServices.patchCreditMovementStatus(toPatch, event.data.creditMovementStatusId, environment_1.environment.mediaTypes.creditMovementStatus.patch.ContentType.patchJson)
                .subscribe(function (result) {
                console.log(result);
                if (result.status == 201) {
                    console.log("entro aqi");
                    event.confirm.resolve(event.newData);
                }
            }, function (err) {
                console.warn(err);
                event.confirm.reject();
            });
        }
        else {
            event.confirm.reject();
        }
    };
    GenListsComponent.prototype.onCreateConfirmCreditMovementStatus = function (event) {
        console.log(event);
        var entityCreate = event.newData;
        console.log(entityCreate);
        this.menusServices
            .addCreditMovementStatus(entityCreate, environment_1.environment.mediaTypes.creditMovementStatus.post.ContentType.postJson)
            .subscribe(function (result) {
            console.log(result);
            if (result.status == 201) {
                console.log("entro aqi");
                event.confirm.resolve(result.body);
            }
        }, function (err) {
            console.warn(err);
            event.confirm.reject();
        });
    };
    GenListsComponent.prototype.pageChangeCreditMovementStatus = function (pageIndex) {
        var _this = this;
        var getNew = pageIndex * this.optionsCreditMovementStatus.showPerPage;
        if (getNew >= this.optionsCreditMovementStatus.source.count() && getNew < this.optionsCreditMovementStatus.totalCount) {
            this.optionsCreditMovementStatus.currentPage = this.optionsCreditMovementStatus.currentPage + 1;
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
                        // this.optionsCreditMovementStatus.source.load(result.body.value);
                        result.body.value.forEach(function (element) {
                            _this.optionsCreditMovementStatus.source.add(element);
                        });
                    }
                    else {
                        // this.optionsCreditMovementStatus.source.load(result.body);
                        result.body.forEach(function (element) {
                            _this.optionsCreditMovementStatus.source.add(element);
                        });
                    }
                }
            }, function (err) {
                console.warn(err);
            });
        }
    };
    //DebitReason
    GenListsComponent.prototype.initSettingsDebitReason = function () {
        this.optionsDebitReason.settings = {
            mode: 'inline',
            "delete": {
                confirmDelete: true
            },
            add: {
                confirmCreate: true
            },
            edit: {
                confirmSave: true
            },
            actions: {
                add: true,
                edit: true,
                "delete": true
            },
            pager: {
                display: true,
                perPage: this.optionsDebitReason.showPerPage
            },
            columns: {
                reason: {
                    title: 'Reason',
                    filter: false
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
    GenListsComponent.prototype.initDataDebitReasons = function () {
        var _this = this;
        var params = new http_1.HttpParams();
        if (this.optionsDebitReason.searchQuery != null) {
            params = params.append('SearchQuery', this.optionsDebitReason.searchQuery);
        }
        if (this.optionsDebitReason.active != null) {
            params = params.append('Active', this.optionsDebitReason.active);
        }
        if (this.optionsDebitReason.orderBy != null) {
            params = params.append('OrderBy', this.optionsDebitReason.orderBy);
        }
        if (this.optionsDebitReason.fields != null) {
            params = params.append('Fields', this.optionsDebitReason.fields);
        }
        params = params.append('PageNumber', this.optionsDebitReason.currentPage.toString());
        params = params.append('PageSize', this.optionsDebitReason.pageSize.toString());
        this.menusServices
            .getAllDebitReasons(params, this.optionsDebitReason.auxMediaTypeAccept)
            .subscribe(function (result) {
            if (!result) {
                return;
            }
            if (result.status == 200) {
                if (_this.optionsDebitReason.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                    _this.optionsDebitReason.source.load(result.body.value);
                    _this.optionsDebitReason.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsDebitReason.totalCount = _this.optionsDebitReason.totalCount['totalCount'];
                }
                else {
                    _this.optionsDebitReason.source.load(result.body);
                    _this.optionsDebitReason.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsDebitReason.totalCount = _this.optionsDebitReason.totalCount['totalCount'];
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    GenListsComponent.prototype.onDeleteConfirmDebitReason = function (event) {
        var _this = this;
        var act = null;
        if (event.data.active == true) {
            act = 'delete';
        }
        else {
            act = 'restore';
        }
        if (window.confirm("Are you sure you want to " + act + "?")) {
            var params = new http_1.HttpParams();
            params = params.append('act', act);
            this.menusServices.putDeleteOrRestoreDebitReason(event.data.debitReasonId, params, environment_1.environment.mediaTypes.debitReason.put.ContentType.putJson)
                .subscribe(function (result) {
                if (result.status == 200) {
                    _this.optionsDebitReason.source.getAll().then(function (x) {
                        var aux = x.find(function (element) { return element.debitReasonId == event.data.debitReasonId; });
                        aux.active = !aux.active;
                        _this.optionsDebitReason.source.load(x);
                    });
                }
            }, function (err) {
                console.warn(err);
                event.confirm.reject();
            });
        }
        else {
            event.confirm.reject();
        }
    };
    GenListsComponent.prototype.onUpdateConfirmDebitReason = function (event) {
        console.log(event);
        var toPatch = [
            {
                path: '/Reason',
                op: 'replace',
                value: event.newData.reason
            },
        ];
        if (window.confirm('Are you sure you want to save?')) {
            this.menusServices.patchDebitReason(toPatch, event.data.debitReasonId, environment_1.environment.mediaTypes.debitReason.patch.ContentType.patchJson)
                .subscribe(function (result) {
                console.log(result);
                if (result.status == 201) {
                    console.log("entro aqi");
                    event.confirm.resolve(event.newData);
                }
            }, function (err) {
                console.warn(err);
                event.confirm.reject();
            });
        }
        else {
            event.confirm.reject();
        }
    };
    GenListsComponent.prototype.onCreateConfirmDebitReason = function (event) {
        console.log(event);
        var entityCreate = event.newData;
        console.log(entityCreate);
        this.menusServices
            .addDebitReason(entityCreate, environment_1.environment.mediaTypes.debitReason.post.ContentType.postJson)
            .subscribe(function (result) {
            console.log(result);
            if (result.status == 201) {
                console.log("entro aqi");
                event.confirm.resolve(result.body);
            }
        }, function (err) {
            console.warn(err);
            event.confirm.reject();
        });
    };
    GenListsComponent.prototype.pageChangeDebitReason = function (pageIndex) {
        var _this = this;
        var getNew = pageIndex * this.optionsDebitReason.showPerPage;
        if (getNew >= this.optionsDebitReason.source.count() && getNew < this.optionsDebitReason.totalCount) {
            this.optionsDebitReason.currentPage = this.optionsDebitReason.currentPage + 1;
            var params = new http_1.HttpParams();
            if (this.optionsDebitReason.searchQuery != null) {
                params = params.append('SearchQuery', this.optionsDebitReason.searchQuery);
            }
            if (this.optionsDebitReason.active != null) {
                params = params.append('Active', this.optionsDebitReason.active);
            }
            if (this.optionsDebitReason.orderBy != null) {
                params = params.append('OrderBy', this.optionsDebitReason.orderBy);
            }
            if (this.optionsDebitReason.fields != null) {
                params = params.append('Fields', this.optionsDebitReason.fields);
            }
            params = params.append('PageNumber', this.optionsDebitReason.currentPage.toString());
            params = params.append('PageSize', this.optionsDebitReason.pageSize.toString());
            this.menusServices
                .getAllDebitReasons(params, this.optionsDebitReason.auxMediaTypeAccept)
                .subscribe(function (result) {
                if (!result) {
                    return;
                }
                if (result.status == 200) {
                    if (_this.optionsDebitReason.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                        // this.optionsDebitReason.source.load(result.body.value);
                        result.body.value.forEach(function (element) {
                            _this.optionsDebitReason.source.add(element);
                        });
                    }
                    else {
                        // this.optionsDebitReason.source.load(result.body);
                        result.body.forEach(function (element) {
                            _this.optionsDebitReason.source.add(element);
                        });
                    }
                }
            }, function (err) {
                console.warn(err);
            });
        }
    };
    //CreditReason
    GenListsComponent.prototype.initSettingsCreditReason = function () {
        this.optionsCreditReason.settings = {
            mode: 'inline',
            "delete": {
                confirmDelete: true
            },
            add: {
                confirmCreate: true
            },
            edit: {
                confirmSave: true
            },
            actions: {
                add: true,
                edit: true,
                "delete": true
            },
            pager: {
                display: true,
                perPage: this.optionsCreditReason.showPerPage
            },
            columns: {
                reason: {
                    title: 'Reason',
                    filter: false
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
    GenListsComponent.prototype.initDataCreditReasons = function () {
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
                    _this.optionsCreditReason.source.load(result.body.value);
                    _this.optionsCreditReason.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsCreditReason.totalCount = _this.optionsCreditReason.totalCount['totalCount'];
                }
                else {
                    _this.optionsCreditReason.source.load(result.body);
                    _this.optionsCreditReason.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsCreditReason.totalCount = _this.optionsCreditReason.totalCount['totalCount'];
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    GenListsComponent.prototype.onDeleteConfirmCreditReason = function (event) {
        var _this = this;
        var act = null;
        if (event.data.active == true) {
            act = 'delete';
        }
        else {
            act = 'restore';
        }
        if (window.confirm("Are you sure you want to " + act + "?")) {
            var params = new http_1.HttpParams();
            params = params.append('act', act);
            this.menusServices.putDeleteOrRestoreCreditReason(event.data.creditReasonId, params, environment_1.environment.mediaTypes.creditReason.put.ContentType.putJson)
                .subscribe(function (result) {
                if (result.status == 200) {
                    _this.optionsCreditReason.source.getAll().then(function (x) {
                        var aux = x.find(function (element) { return element.creditReasonId == event.data.creditReasonId; });
                        aux.active = !aux.active;
                        _this.optionsCreditReason.source.load(x);
                    });
                }
            }, function (err) {
                console.warn(err);
                event.confirm.reject();
            });
        }
        else {
            event.confirm.reject();
        }
    };
    GenListsComponent.prototype.onUpdateConfirmCreditReason = function (event) {
        console.log(event);
        var toPatch = [
            {
                path: '/Reason',
                op: 'replace',
                value: event.newData.reason
            },
        ];
        if (window.confirm('Are you sure you want to save?')) {
            this.menusServices.patchCreditReason(toPatch, event.data.creditReasonId, environment_1.environment.mediaTypes.creditReason.patch.ContentType.patchJson)
                .subscribe(function (result) {
                console.log(result);
                if (result.status == 201) {
                    console.log("entro aqi");
                    event.confirm.resolve(event.newData);
                }
            }, function (err) {
                console.warn(err);
                event.confirm.reject();
            });
        }
        else {
            event.confirm.reject();
        }
    };
    GenListsComponent.prototype.onCreateConfirmCreditReason = function (event) {
        console.log(event);
        var entityCreate = event.newData;
        console.log(entityCreate);
        this.menusServices
            .addCreditReason(entityCreate, environment_1.environment.mediaTypes.creditReason.post.ContentType.postJson)
            .subscribe(function (result) {
            console.log(result);
            if (result.status == 201) {
                console.log("entro aqi");
                event.confirm.resolve(result.body);
            }
        }, function (err) {
            console.warn(err);
            event.confirm.reject();
        });
    };
    GenListsComponent.prototype.pageChangeCreditReason = function (pageIndex) {
        var _this = this;
        var getNew = pageIndex * this.optionsCreditReason.showPerPage;
        if (getNew >= this.optionsCreditReason.source.count() && getNew < this.optionsCreditReason.totalCount) {
            this.optionsCreditReason.currentPage = this.optionsCreditReason.currentPage + 1;
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
                        // this.optionsCreditReason.source.load(result.body.value);
                        result.body.value.forEach(function (element) {
                            _this.optionsCreditReason.source.add(element);
                        });
                    }
                    else {
                        // this.optionsCreditReason.source.load(result.body);
                        result.body.forEach(function (element) {
                            _this.optionsCreditReason.source.add(element);
                        });
                    }
                }
            }, function (err) {
                console.warn(err);
            });
        }
    };
    // Banks
    GenListsComponent.prototype.initSettingsBanks = function () {
        this.optionsBanks.settings = {
            mode: 'inline',
            "delete": {
                confirmDelete: true
            },
            add: {
                confirmCreate: true
            },
            edit: {
                confirmSave: true
            },
            actions: {
                add: true,
                edit: true,
                "delete": true
            },
            pager: {
                display: true,
                perPage: this.optionsBanks.showPerPage
            },
            columns: {
                bank1: {
                    title: 'Banks',
                    filter: false
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
    GenListsComponent.prototype.initDataBanks = function () {
        var _this = this;
        var params = new http_1.HttpParams();
        if (this.optionsBanks.searchQuery != null) {
            params = params.append('SearchQuery', this.optionsBanks.searchQuery);
        }
        if (this.optionsBanks.active != null) {
            params = params.append('Active', this.optionsBanks.active);
        }
        if (this.optionsBanks.orderBy != null) {
            params = params.append('OrderBy', this.optionsBanks.orderBy);
        }
        if (this.optionsBanks.fields != null) {
            params = params.append('Fields', this.optionsBanks.fields);
        }
        params = params.append('PageNumber', this.optionsBanks.currentPage.toString());
        params = params.append('PageSize', this.optionsBanks.pageSize.toString());
        this.menusServices
            .getAllBanks(params, this.optionsBanks.auxMediaTypeAccept)
            .subscribe(function (result) {
            if (!result) {
                return;
            }
            if (result.status == 200) {
                if (_this.optionsBanks.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                    _this.optionsBanks.source.load(result.body.value);
                    _this.optionsBanks.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsBanks.totalCount = _this.optionsBanks.totalCount['totalCount'];
                    _this.getBanks();
                }
                else {
                    _this.optionsBanks.source.load(result.body);
                    _this.optionsBanks.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsBanks.totalCount = _this.optionsBanks.totalCount['totalCount'];
                    _this.getBanks();
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    GenListsComponent.prototype.onDeleteConfirmBanks = function (event) {
        var _this = this;
        var act = null;
        if (event.data.active == true) {
            act = 'delete';
        }
        else {
            act = 'restore';
        }
        if (window.confirm("Are you sure you want to " + act + "?")) {
            var params = new http_1.HttpParams();
            params = params.append('act', act);
            this.menusServices.putDeleteOrRestoreBank(event.data.bankId, params, environment_1.environment.mediaTypes.bank.put.ContentType.putJson)
                .subscribe(function (result) {
                if (result.status == 200) {
                    _this.optionsBanks.source.getAll().then(function (x) {
                        var aux = x.find(function (element) { return element.bankId == event.data.bankId; });
                        aux.active = !aux.active;
                        _this.optionsBanks.source.load(x);
                        _this.getBanks();
                    });
                }
            }, function (err) {
                console.warn(err);
                event.confirm.reject();
            });
        }
        else {
            event.confirm.reject();
        }
    };
    GenListsComponent.prototype.onUpdateConfirmBanks = function (event) {
        var _this = this;
        console.log(event);
        var toPatch = [
            {
                path: '/Bank1',
                op: 'replace',
                value: event.newData.bank1
            },
        ];
        if (window.confirm('Are you sure you want to save?')) {
            this.menusServices.patchBank(toPatch, event.data.bankId, environment_1.environment.mediaTypes.bank.patch.ContentType.patchJson)
                .subscribe(function (result) {
                console.log(result);
                if (result.status == 201) {
                    console.log("entro aqi");
                    event.confirm.resolve(event.newData);
                    _this.getBanks();
                }
            }, function (err) {
                console.warn(err);
                event.confirm.reject();
            });
        }
        else {
            event.confirm.reject();
        }
    };
    GenListsComponent.prototype.onCreateConfirmBanks = function (event) {
        var _this = this;
        console.log(event);
        var entityCreate = event.newData;
        console.log(entityCreate);
        this.menusServices
            .addBank(entityCreate, environment_1.environment.mediaTypes.bank.post.ContentType.postJson)
            .subscribe(function (result) {
            console.log(result);
            if (result.status == 201) {
                console.log("entro aqi");
                event.confirm.resolve(result.body);
                _this.getBanks();
            }
        }, function (err) {
            console.warn(err);
            event.confirm.reject();
        });
    };
    GenListsComponent.prototype.pageChangeBanks = function (pageIndex) {
        var _this = this;
        var getNew = pageIndex * this.optionsBanks.showPerPage;
        if (getNew >= this.optionsBanks.source.count() && getNew < this.optionsBanks.totalCount) {
            this.optionsBanks.currentPage = this.optionsBanks.currentPage + 1;
            var params = new http_1.HttpParams();
            if (this.optionsBanks.searchQuery != null) {
                params = params.append('SearchQuery', this.optionsBanks.searchQuery);
            }
            if (this.optionsBanks.active != null) {
                params = params.append('Active', this.optionsBanks.active);
            }
            if (this.optionsBanks.orderBy != null) {
                params = params.append('OrderBy', this.optionsBanks.orderBy);
            }
            if (this.optionsBanks.fields != null) {
                params = params.append('Fields', this.optionsBanks.fields);
            }
            params = params.append('PageNumber', this.optionsBanks.currentPage.toString());
            params = params.append('PageSize', this.optionsBanks.pageSize.toString());
            this.menusServices
                .getAllBanks(params, this.optionsBanks.auxMediaTypeAccept)
                .subscribe(function (result) {
                if (!result) {
                    return;
                }
                if (result.status == 200) {
                    if (_this.optionsBanks.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                        // this.optionsBanks.source.load(result.body.value);
                        result.body.value.forEach(function (element) {
                            _this.optionsBanks.source.add(element);
                        });
                        _this.getBanks();
                    }
                    else {
                        // this.optionsBanks.source.load(result.body);
                        result.body.forEach(function (element) {
                            _this.optionsBanks.source.add(element);
                        });
                        _this.getBanks();
                    }
                }
            }, function (err) {
                console.warn(err);
            });
        }
    };
    // AccountTypes
    GenListsComponent.prototype.initSettingsAccountTypes = function () {
        this.optionsAccountTypes.settings = {
            mode: 'inline',
            "delete": {
                confirmDelete: true
            },
            add: {
                confirmCreate: true
            },
            edit: {
                confirmSave: true
            },
            actions: {
                add: true,
                edit: true,
                "delete": true
            },
            pager: {
                display: true,
                perPage: this.optionsAccountTypes.showPerPage
            },
            columns: {
                type: {
                    title: 'Account Types',
                    filter: false
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
    GenListsComponent.prototype.initDataAccountTypes = function () {
        var _this = this;
        var params = new http_1.HttpParams();
        if (this.optionsAccountTypes.searchQuery != null) {
            params = params.append('SearchQuery', this.optionsAccountTypes.searchQuery);
        }
        if (this.optionsAccountTypes.active != null) {
            params = params.append('Active', this.optionsAccountTypes.active);
        }
        if (this.optionsAccountTypes.orderBy != null) {
            params = params.append('OrderBy', this.optionsAccountTypes.orderBy);
        }
        if (this.optionsAccountTypes.fields != null) {
            params = params.append('Fields', this.optionsAccountTypes.fields);
        }
        params = params.append('PageNumber', this.optionsAccountTypes.currentPage.toString());
        params = params.append('PageSize', this.optionsAccountTypes.pageSize.toString());
        this.menusServices
            .getAllOAccountTypes(params, this.optionsAccountTypes.auxMediaTypeAccept)
            .subscribe(function (result) {
            if (!result) {
                return;
            }
            if (result.status == 200) {
                if (_this.optionsAccountTypes.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                    _this.optionsAccountTypes.source.load(result.body.value);
                    _this.optionsAccountTypes.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsAccountTypes.totalCount = _this.optionsAccountTypes.totalCount['totalCount'];
                    _this.getAccountTypes();
                }
                else {
                    _this.optionsAccountTypes.source.load(result.body);
                    _this.optionsAccountTypes.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsAccountTypes.totalCount = _this.optionsAccountTypes.totalCount['totalCount'];
                    _this.getAccountTypes();
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    GenListsComponent.prototype.onDeleteConfirmAccountTypes = function (event) {
        var _this = this;
        var act = null;
        if (event.data.active == true) {
            act = 'delete';
        }
        else {
            act = 'restore';
        }
        if (window.confirm("Are you sure you want to " + act + "?")) {
            var params = new http_1.HttpParams();
            params = params.append('act', act);
            this.menusServices.putDeleteOrRestoreAccountType(event.data.accountTypeId, params, environment_1.environment.mediaTypes.accountType.put.ContentType.putJson)
                .subscribe(function (result) {
                if (result.status == 200) {
                    _this.optionsAccountTypes.source.getAll().then(function (x) {
                        var aux = x.find(function (element) { return element.accountTypeId == event.data.accountTypeId; });
                        aux.active = !aux.active;
                        _this.optionsAccountTypes.source.load(x);
                        _this.getAccountTypes();
                    });
                }
            }, function (err) {
                console.warn(err);
                event.confirm.reject();
            });
        }
        else {
            event.confirm.reject();
        }
    };
    GenListsComponent.prototype.onUpdateConfirmAccountTypes = function (event) {
        var _this = this;
        console.log(event);
        var toPatch = [
            {
                path: '/Type',
                op: 'replace',
                value: event.newData.type
            },
        ];
        if (window.confirm('Are you sure you want to save?')) {
            this.menusServices.patchAccountType(toPatch, event.data.accountTypeId, environment_1.environment.mediaTypes.accountType.patch.ContentType.patchJson)
                .subscribe(function (result) {
                console.log(result);
                if (result.status == 201) {
                    console.log("entro aqi");
                    event.confirm.resolve(event.newData);
                    _this.getAccountTypes();
                }
            }, function (err) {
                console.warn(err);
                event.confirm.reject();
            });
        }
        else {
            event.confirm.reject();
        }
    };
    GenListsComponent.prototype.onCreateConfirmAccountTypes = function (event) {
        var _this = this;
        console.log(event);
        var entityCreate = event.newData;
        console.log(entityCreate);
        this.menusServices
            .addAccountType(entityCreate, environment_1.environment.mediaTypes.accountType.post.ContentType.postJson)
            .subscribe(function (result) {
            console.log(result);
            if (result.status == 201) {
                console.log("entro aqi");
                event.confirm.resolve(result.body);
                _this.getAccountTypes();
            }
        }, function (err) {
            console.warn(err);
            event.confirm.reject();
        });
    };
    GenListsComponent.prototype.pageChangeAccountTypes = function (pageIndex) {
        var _this = this;
        var getNew = pageIndex * this.optionsAccountTypes.showPerPage;
        if (getNew >= this.optionsAccountTypes.source.count() && getNew < this.optionsAccountTypes.totalCount) {
            this.optionsAccountTypes.currentPage = this.optionsAccountTypes.currentPage + 1;
            var params = new http_1.HttpParams();
            if (this.optionsAccountTypes.searchQuery != null) {
                params = params.append('SearchQuery', this.optionsAccountTypes.searchQuery);
            }
            if (this.optionsAccountTypes.active != null) {
                params = params.append('Active', this.optionsAccountTypes.active);
            }
            if (this.optionsAccountTypes.orderBy != null) {
                params = params.append('OrderBy', this.optionsAccountTypes.orderBy);
            }
            if (this.optionsAccountTypes.fields != null) {
                params = params.append('Fields', this.optionsAccountTypes.fields);
            }
            params = params.append('PageNumber', this.optionsAccountTypes.currentPage.toString());
            params = params.append('PageSize', this.optionsAccountTypes.pageSize.toString());
            this.menusServices
                .getAllOAccountTypes(params, this.optionsAccountTypes.auxMediaTypeAccept)
                .subscribe(function (result) {
                if (!result) {
                    return;
                }
                if (result.status == 200) {
                    if (_this.optionsAccountTypes.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                        // this.optionsAccountTypes.source.load(result.body.value);
                        result.body.value.forEach(function (element) {
                            _this.optionsAccountTypes.source.add(element);
                        });
                        _this.getAccountTypes();
                    }
                    else {
                        // this.optionsAccountTypes.source.load(result.body);
                        result.body.forEach(function (element) {
                            _this.optionsAccountTypes.source.add(element);
                        });
                        _this.getAccountTypes();
                    }
                }
            }, function (err) {
                console.warn(err);
            });
        }
    };
    // BankAccount
    GenListsComponent.prototype.initSettingsBankAccount = function () {
        this.optionsBankAccounts.settings = {
            mode: 'inline',
            "delete": {
                confirmDelete: true
            },
            add: {
                confirmCreate: true
            },
            edit: {
                confirmSave: true
            },
            actions: {
                add: true,
                edit: true,
                "delete": true
            },
            pager: {
                display: true,
                perPage: this.optionsBankAccounts.showPerPage
            },
            columns: {
                accountAlias: {
                    title: 'accountAlias',
                    filter: false
                },
                accountNumber: {
                    title: 'accountNumber',
                    filter: false
                },
                accountOwner: {
                    title: 'accountOwner',
                    filter: false
                },
                dniAccountOwner: {
                    title: 'dniAccountOwner',
                    filter: false
                },
                accountType: {
                    title: 'accountType',
                    filter: false,
                    editor: {
                        type: 'list',
                        config: {
                            list: []
                        }
                    },
                    valuePrepareFunction: function (value, row, cell) {
                        return value.type;
                    }
                },
                bank: {
                    title: 'bank',
                    filter: false,
                    editor: {
                        type: 'list',
                        config: {
                            list: []
                        }
                    },
                    valuePrepareFunction: function (value, row, cell) {
                        return value.bank1;
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
    GenListsComponent.prototype.getAccountTypes = function () {
        var selectListAccountTypes = [];
        this.optionsAccountTypes.source.getAll().then(function (x) {
            x.forEach(function (element) {
                if (element.active == true)
                    selectListAccountTypes.push({ value: element.accountTypeId, title: element.type });
            });
        });
        var newSettings = this.optionsBankAccounts.settings;
        try {
            newSettings.columns.accountType.editor.config.list = selectListAccountTypes;
        }
        catch (error) {
        }
        this.optionsBankAccounts.settings = Object.assign({}, newSettings);
    };
    GenListsComponent.prototype.getBanks = function () {
        var selectListBanks = [];
        this.optionsBanks.source.getAll().then(function (x) {
            x.forEach(function (element) {
                if (element.active == true)
                    selectListBanks.push({ value: element.bankId, title: element.bank1 });
            });
        });
        var newSettings = this.optionsBankAccounts.settings;
        try {
            newSettings.columns.bank.editor.config.list = selectListBanks;
        }
        catch (error) {
        }
        this.optionsBankAccounts.settings = Object.assign({}, newSettings);
    };
    GenListsComponent.prototype.initDataBankAccount = function () {
        var _this = this;
        var params = new http_1.HttpParams();
        if (this.optionsBankAccounts.searchQuery != null) {
            params = params.append('SearchQuery', this.optionsBankAccounts.searchQuery);
        }
        if (this.optionsBankAccounts.accountNumber != null) {
            params = params.append('AccountNumber', this.optionsBankAccounts.accountNumber);
        }
        if (this.optionsBankAccounts.accountAlias != null) {
            params = params.append('AccountAlias', this.optionsBankAccounts.accountAlias);
        }
        if (this.optionsBankAccounts.employeeReferenceId != null) {
            params = params.append('EmployeeReferenceId', this.optionsBankAccounts.employeeReferenceId);
        }
        if (this.optionsBankAccounts.accountOwner != null) {
            params = params.append('AccountOwner', this.optionsBankAccounts.accountOwner);
        }
        if (this.optionsBankAccounts.dniAccountOwner != null) {
            params = params.append('DniAccountOwner', this.optionsBankAccounts.dniAccountOwner);
        }
        if (this.optionsBankAccounts.accountTypeId != null) {
            params = params.append('AccountTypeId', this.optionsBankAccounts.accountTypeId);
        }
        if (this.optionsBankAccounts.bankId != null) {
            params = params.append('BankId', this.optionsBankAccounts.bankId);
        }
        if (this.optionsBankAccounts.active != null) {
            params = params.append('Active', this.optionsBankAccounts.active);
        }
        if (this.optionsBankAccounts.orderBy != null) {
            params = params.append('OrderBy', this.optionsBankAccounts.orderBy);
        }
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
                    _this.optionsBankAccounts.source.load(result.body.value);
                    _this.optionsBankAccounts.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsBankAccounts.totalCount = _this.optionsBankAccounts.totalCount['totalCount'];
                }
                else {
                    _this.optionsBankAccounts.source.load(result.body);
                    _this.optionsBankAccounts.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsBankAccounts.totalCount = _this.optionsBankAccounts.totalCount['totalCount'];
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    GenListsComponent.prototype.onDeleteConfirmBankAccount = function (event) {
        var _this = this;
        var act = null;
        if (event.data.active == true) {
            act = 'delete';
        }
        else {
            act = 'restore';
        }
        if (window.confirm("Are you sure you want to " + act + "?")) {
            var params = new http_1.HttpParams();
            params = params.append('act', act);
            this.menusServices.putDeleteOrRestoreBankAccount(event.data.bankAccountId, params, environment_1.environment.mediaTypes.bankAccounts.put.ContentType.putJson)
                .subscribe(function (result) {
                if (result.status == 200) {
                    _this.optionsBankAccounts.source.getAll().then(function (x) {
                        var aux = x.find(function (element) { return element.bankAccountId == event.data.bankAccountId; });
                        aux.active = !aux.active;
                        _this.optionsBankAccounts.source.load(x);
                    });
                }
            }, function (err) {
                console.warn(err);
                event.confirm.reject();
            });
        }
        else {
            event.confirm.reject();
        }
    };
    GenListsComponent.prototype.onUpdateConfirmBankAccount = function (event) {
        console.log(event);
        var toPatch = [];
        if (event.newData.accountAlias) {
            toPatch.push({
                path: '/accountAlias',
                op: 'replace',
                value: event.newData.accountAlias
            });
        }
        if (event.newData.accountNumber) {
            toPatch.push({
                path: '/accountNumber',
                op: 'replace',
                value: event.newData.accountNumber
            });
        }
        if (event.newData.accountOwner) {
            toPatch.push({
                path: '/accountOwner',
                op: 'replace',
                value: event.newData.accountOwner
            });
        }
        if (event.newData.dniAccountOwner) {
            toPatch.push({
                path: '/dniAccountOwner',
                op: 'replace',
                value: event.newData.dniAccountOwner
            });
        }
        if (event.newData.accountType) {
            toPatch.push({
                path: '/accountTypeId',
                op: 'replace',
                value: event.newData.accountType
            });
        }
        if (event.newData.bank) {
            toPatch.push({
                path: '/bankId',
                op: 'replace',
                value: event.newData.bank
            });
        }
        if (window.confirm('Are you sure you want to save?')) {
            this.menusServices.patchBankAccount(toPatch, event.data.bankAccountId, environment_1.environment.mediaTypes.bankAccounts.patch.ContentType.patchJson)
                .subscribe(function (result) {
                console.log(result);
                if (result.status == 201) {
                    console.log("entro aqi");
                    event.confirm.resolve(event.newData);
                }
            }, function (err) {
                console.warn(err);
                event.confirm.reject();
            });
        }
        else {
            event.confirm.reject();
        }
    };
    GenListsComponent.prototype.onCreateConfirmBankAccount = function (event) {
        var _this = this;
        console.log(event);
        var entityCreate = new bank_account_for_create_dto_1.BankAccountForCreateDto();
        entityCreate.accountAlias = event.newData.accountAlias;
        entityCreate.accountNumber = event.newData.accountNumber;
        entityCreate.accountOwner = event.newData.accountOwner;
        entityCreate.accountTypeId = event.newData.accountType;
        entityCreate.bankId = event.newData.bank;
        entityCreate.dniAccountOwner = event.newData.dniAccountOwner;
        this.menusServices
            .addBankAccount(entityCreate, environment_1.environment.mediaTypes.bankAccounts.post.ContentType.postJson)
            .subscribe(function (result) {
            console.log(result);
            if (result.status == 201) {
                console.log("entro aqi");
                // event.confirm.resolve(result.body);
                // event.confirm.reject();
                _this.initSettingsBankAccount();
                _this.initDataBankAccount();
                _this.getBanks();
                _this.getAccountTypes();
            }
        }, function (err) {
            console.warn(err);
            event.confirm.reject();
        });
    };
    GenListsComponent.prototype.pageChangeBankAccount = function (pageIndex) {
        var _this = this;
        var getNew = pageIndex * this.optionsBankAccounts.showPerPage;
        if (getNew >= this.optionsBankAccounts.source.count() && getNew < this.optionsBankAccounts.totalCount) {
            this.optionsBankAccounts.currentPage = this.optionsBankAccounts.currentPage + 1;
            var params = new http_1.HttpParams();
            if (this.optionsBankAccounts.searchQuery != null) {
                params = params.append('SearchQuery', this.optionsBankAccounts.searchQuery);
            }
            if (this.optionsBankAccounts.accountNumber != null) {
                params = params.append('AccountNumber', this.optionsBankAccounts.accountNumber);
            }
            if (this.optionsBankAccounts.accountAlias != null) {
                params = params.append('AccountAlias', this.optionsBankAccounts.accountAlias);
            }
            if (this.optionsBankAccounts.employeeReferenceId != null) {
                params = params.append('EmployeeReferenceId', this.optionsBankAccounts.employeeReferenceId);
            }
            if (this.optionsBankAccounts.accountOwner != null) {
                params = params.append('AccountOwner', this.optionsBankAccounts.accountOwner);
            }
            if (this.optionsBankAccounts.dniAccountOwner != null) {
                params = params.append('DniAccountOwner', this.optionsBankAccounts.dniAccountOwner);
            }
            if (this.optionsBankAccounts.accountTypeId != null) {
                params = params.append('AccountTypeId', this.optionsBankAccounts.accountTypeId);
            }
            if (this.optionsBankAccounts.bankId != null) {
                params = params.append('BankId', this.optionsBankAccounts.bankId);
            }
            if (this.optionsBankAccounts.active != null) {
                params = params.append('Active', this.optionsBankAccounts.active);
            }
            if (this.optionsBankAccounts.orderBy != null) {
                params = params.append('OrderBy', this.optionsBankAccounts.orderBy);
            }
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
                        // this.optionsBankAccounts.source.load(result.body.value);
                        result.body.value.forEach(function (element) {
                            _this.optionsBankAccounts.source.add(element);
                        });
                    }
                    else {
                        //this.optionsBankAccounts.source.load(result.body);
                        result.body.forEach(function (element) {
                            _this.optionsBankAccounts.source.add(element);
                        });
                    }
                }
            }, function (err) {
                console.warn(err);
            });
        }
    };
    // Type Post Box
    GenListsComponent.prototype.initSettingsTypePostBox = function () {
        this.optionsTypePostBox.settings = {
            mode: 'inline',
            "delete": {
                confirmDelete: true
            },
            add: {
                confirmCreate: true
            },
            edit: {
                confirmSave: true
            },
            actions: {
                add: true,
                edit: true,
                "delete": true
            },
            pager: {
                display: true,
                perPage: this.optionsTypePostBox.showPerPage
            },
            columns: {
                name: {
                    title: 'Name',
                    filter: false
                },
                value: {
                    title: 'Value',
                    filter: false
                },
                description: {
                    title: 'Description',
                    filter: false
                },
                details: {
                    title: 'Details',
                    filter: false
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
    GenListsComponent.prototype.initDataTypePostBox = function () {
        var _this = this;
        var params = new http_1.HttpParams();
        if (this.optionsTypePostBox.searchQuery != null) {
            params = params.append('SearchQuery', this.optionsTypePostBox.searchQuery);
        }
        if (this.optionsTypePostBox.active != null) {
            params = params.append('Active', this.optionsTypePostBox.active);
        }
        if (this.optionsTypePostBox.name != null) {
            params = params.append('Name', this.optionsTypePostBox.name);
        }
        if (this.optionsTypePostBox.orderBy != null) {
            params = params.append('OrderBy', this.optionsTypePostBox.orderBy);
        }
        if (this.optionsTypePostBox.fields != null) {
            params = params.append('Fields', this.optionsTypePostBox.fields);
        }
        params = params.append('PageNumber', this.optionsTypePostBox.currentPage.toString());
        params = params.append('PageSize', this.optionsTypePostBox.pageSize.toString());
        this.menusServices
            .getAllTypePostBoxs(params, this.optionsTypePostBox.auxMediaTypeAccept)
            .subscribe(function (result) {
            if (!result) {
                return;
            }
            if (result.status == 200) {
                if (_this.optionsTypePostBox.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                    _this.optionsTypePostBox.source.load(result.body.value);
                    _this.optionsTypePostBox.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsTypePostBox.totalCount = _this.optionsTypePostBox.totalCount['totalCount'];
                }
                else {
                    _this.optionsTypePostBox.source.load(result.body);
                    _this.optionsTypePostBox.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsTypePostBox.totalCount = _this.optionsTypePostBox.totalCount['totalCount'];
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    GenListsComponent.prototype.pageChangeTypePostBox = function (pageIndex) {
        var _this = this;
        var getNew = pageIndex * this.optionsCreditReason.showPerPage;
        if (getNew >= this.optionsCreditReason.source.count() && getNew < this.optionsCreditReason.totalCount) {
            this.optionsCreditReason.currentPage = this.optionsCreditReason.currentPage + 1;
            var params = new http_1.HttpParams();
            if (this.optionsTypePostBox.searchQuery != null) {
                params = params.append('SearchQuery', this.optionsTypePostBox.searchQuery);
            }
            if (this.optionsTypePostBox.active != null) {
                params = params.append('Active', this.optionsTypePostBox.active);
            }
            if (this.optionsTypePostBox.name != null) {
                params = params.append('Name', this.optionsTypePostBox.name);
            }
            if (this.optionsTypePostBox.orderBy != null) {
                params = params.append('OrderBy', this.optionsTypePostBox.orderBy);
            }
            if (this.optionsTypePostBox.fields != null) {
                params = params.append('Fields', this.optionsTypePostBox.fields);
            }
            params = params.append('PageNumber', this.optionsTypePostBox.currentPage.toString());
            params = params.append('PageSize', this.optionsTypePostBox.pageSize.toString());
            this.menusServices
                .getAllTypePostBoxs(params, this.optionsTypePostBox.auxMediaTypeAccept)
                .subscribe(function (result) {
                if (!result) {
                    return;
                }
                if (result.status == 200) {
                    if (_this.optionsTypePostBox.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                        result.body.value.forEach(function (element) {
                            _this.optionsTypePostBox.source.add(element);
                        });
                    }
                    else {
                        result.body.forEach(function (element) {
                            _this.optionsTypePostBox.source.add(element);
                        });
                    }
                }
            }, function (err) {
                console.warn(err);
            });
        }
    };
    GenListsComponent.prototype.onCreateConfirmTypePostBox = function (event) {
    };
    GenListsComponent.prototype.onDeleteConfirmTypePostBox = function (event) {
    };
    GenListsComponent.prototype.onUpdateConfirmTypePostBox = function (event) {
    };
    // ORDER STATE
    GenListsComponent.prototype.initSettingsOrderState = function () {
    };
    GenListsComponent.prototype.initDataOrderState = function () {
    };
    GenListsComponent.prototype.pageChangeOrderState = function (pageIndex) {
    };
    GenListsComponent.prototype.onCreateConfirmOrderState = function (event) {
    };
    GenListsComponent.prototype.onDeleteConfirmOrderState = function (event) {
    };
    GenListsComponent.prototype.onUpdateConfirmOrderState = function (event) {
    };
    GenListsComponent = __decorate([
        core_1.Component({
            selector: 'app-gen-lists',
            templateUrl: './gen-lists.component.html',
            styleUrls: ['./gen-lists.component.scss']
        })
    ], GenListsComponent);
    return GenListsComponent;
}());
exports.GenListsComponent = GenListsComponent;
