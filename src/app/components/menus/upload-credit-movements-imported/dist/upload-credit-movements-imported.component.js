"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UploadCreditMovementsImportedComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var button_view_component_1 = require("src/app/shared/button-view/button-view.component");
var multi_sel_component_1 = require("src/app/shared/multi-sel/multi-sel.component");
var environment_1 = require("src/environments/environment");
var options_bank_account_1 = require("../../setting/models/BankAccounts/options-bank-account");
var credit_movements_imported_for_create_dto_1 = require("../models/CreditMovementImported/credit-movements-imported-for-create-dto");
var UploadCreditMovementsImportedComponent = /** @class */ (function () {
    function UploadCreditMovementsImportedComponent(menusServices, creditMovementsService) {
        this.menusServices = menusServices;
        this.creditMovementsService = creditMovementsService;
        this.optionsBankAccounts = new options_bank_account_1.OptionsBankAccount();
        this.viewMovements = false;
        this.bankAccountIdSelected = null;
        this.initSettingsBankAccount();
    }
    UploadCreditMovementsImportedComponent.prototype.ngOnInit = function () {
        this.optionsBankAccounts.auxMediaTypeAccept = environment_1.environment.mediaTypes.bankAccounts.get.accept.getAllJson;
        // this.optionsCreditMovementStatus.active = true;
        // this.optionsCreditMovementStatus.fields = 'type,active';
        this.initDataBankAccount();
        this.initOnChagedData();
    };
    UploadCreditMovementsImportedComponent.prototype.initOnChagedData = function () {
        var _this = this;
        this.optionsBankAccounts.source.onChanged().subscribe(function (change) {
            if (change.action === 'page') {
                _this.pageChangeBankAccount(change.paging.page);
            }
        });
    };
    UploadCreditMovementsImportedComponent.prototype.initSettingsBankAccount = function () {
        var _this = this;
        this.optionsBankAccounts.settings = {
            mode: 'inline',
            actions: {
                add: false,
                edit: false,
                "delete": false
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
                multiple: {
                    title: 'Buttons',
                    filter: false,
                    type: 'custom',
                    valuePrepareFunction: function (value, row, cell) {
                        var sentData = new multi_sel_component_1.ResourceMultiSel();
                        sentData.action = [];
                        sentData.styl = [];
                        sentData.stepClass = [];
                        sentData.action.push('FILE UPLOAD');
                        sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');
                        sentData.stepClass.push('bg-secondary btn btn-outline-secondary-2x');
                        sentData.action.push('VIEW MOVEMENTS');
                        sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');
                        sentData.stepClass.push('bg-info btn btn-outline-info-2x');
                        return sentData;
                    },
                    renderComponent: multi_sel_component_1.MultiSelComponent,
                    onComponentInitFunction: function (instance) {
                        instance.save.subscribe(function (item) {
                            _this.goActions(item);
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
    UploadCreditMovementsImportedComponent.prototype.initDataBankAccount = function () {
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
    UploadCreditMovementsImportedComponent.prototype.pageChangeBankAccount = function (pageIndex) {
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
    UploadCreditMovementsImportedComponent.prototype.goActions = function (item) {
        if (item.option == 'FILE UPLOAD') {
            this.csvTableHeader = item.csvTableHeader;
            this.filterCreditMovements(item.csvTableData);
            this.patchBankSelected(item.entity);
            this.viewMovements = false;
            this.bankAccountIdSelected = null;
            this.title = "Upload";
        }
        else if (item.option == 'VIEW MOVEMENTS') {
            // this.optionsBankAccounts.s
            this.csvTableDataCreditMovements = null;
            this.viewMovements = true;
            this.title = "View";
            this.bankAccountIdSelected = item.entity.bankAccountId;
            this.patchBankSelected(item.entity);
            console.log(item);
        }
    };
    UploadCreditMovementsImportedComponent.prototype.patchBankSelected = function (entity) {
        this.bankSelected = entity;
        this.bankSelected.bank = entity.bank;
        this.bankSelected.accountType = entity.accountType;
    };
    UploadCreditMovementsImportedComponent.prototype.filterCreditMovements = function (csvTableData) {
        this.csvToUploadCreditMovementsImported = null;
        this.csvToUploadCreditMovementsImported = [];
        this.csvTableDataCreditMovements = null;
        this.csvTableDataCreditMovements = csvTableData.filter(function (x) { return x[5] > 0; });
        this.prepareDataToUploadCreditMovementImport(this.csvTableDataCreditMovements);
    };
    UploadCreditMovementsImportedComponent.prototype.prepareDataToUploadCreditMovementImport = function (data) {
        var _this = this;
        data.forEach(function (element) {
            var aux = new credit_movements_imported_for_create_dto_1.CreditMovementsImportedForCreateDto();
            aux.date = _this.crearDate(element[0]);
            aux.office = element[1];
            aux.document = element[2];
            aux.description = element[3];
            aux.value = element[5];
            if (aux.office.includes("BANCA M�VIL")) {
                aux.office = 'BANCA MOVIL';
            }
            _this.csvToUploadCreditMovementsImported.push(aux);
        });
        // this.uploadCreditMovementsImported(this.csvToUploadCreditMovementsImported);
    };
    UploadCreditMovementsImportedComponent.prototype.crearDate = function (responseDate) {
        if (responseDate.includes("/")) {
            var dateParts = responseDate.split("/");
        }
        else if (responseDate.includes("-")) {
            var dateParts = responseDate.split("-");
        }
        // month is 0-based, that's why we need dataParts[1] - 1
        var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        return dateObject;
    };
    UploadCreditMovementsImportedComponent.prototype.refreshData = function () {
        this.csvToUploadCreditMovementsImported = null;
        this.csvTableDataCreditMovements = null;
    };
    UploadCreditMovementsImportedComponent.prototype.UploadCreditMovementsImported = function (data) {
        var _this = this;
        console.log("aqui into");
        this.creditMovementsService
            .uploadCreditMovementsImported(data, this.bankSelected.bankAccountId, environment_1.environment.mediaTypes.creditMovementImported.post.ContentType.postJson)
            .subscribe(function (result) {
            if (result.status == 200) {
                if (result.body.msg == 'uploaded') {
                    _this.csvToUploadCreditMovementsImported = null;
                    _this.csvTableDataCreditMovements = null;
                    alert("Ok: File upload successful!");
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    UploadCreditMovementsImportedComponent.prototype.filterDebitMovements = function (csvTableData) {
        this.csvTableDataDebitMovements = csvTableData.filter(function (x) { return x[4] > 0; });
    };
    UploadCreditMovementsImportedComponent = __decorate([
        core_1.Component({
            selector: 'app-upload-credit-movements-imported',
            templateUrl: './upload-credit-movements-imported.component.html',
            styleUrls: ['./upload-credit-movements-imported.component.scss']
        })
    ], UploadCreditMovementsImportedComponent);
    return UploadCreditMovementsImportedComponent;
}());
exports.UploadCreditMovementsImportedComponent = UploadCreditMovementsImportedComponent;
