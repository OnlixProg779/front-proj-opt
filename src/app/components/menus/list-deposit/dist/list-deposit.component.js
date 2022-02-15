"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListDepositComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var rxjs_1 = require("rxjs");
var environment_1 = require("src/environments/environment");
var options_credit_movement_1 = require("../models/options-credit-movement");
var ListDepositComponent = /** @class */ (function () {
    //entity: DepositUpdateDto;
    function ListDepositComponent(modalService, service, router, activatedRouter) {
        var _this = this;
        this.modalService = modalService;
        this.service = service;
        this.router = router;
        this.optionsCreditMovement = new options_credit_movement_1.OptionsCreditMovement();
        this.columnSelect = "YES";
        this.showTableCreditMovementImported = true;
        this.modalUp = {
            status: '',
            actionModal: '',
            title: '',
            titleButton: ''
        };
        this.creditMovementsImported = null;
        this.showCreditMovementImport = false;
        this.showMsgNoMatchValues = false;
        activatedRouter.params.subscribe(function (params) {
            if (params.clientId !== undefined) {
                console.log(params.clientId);
                _this.optionsCreditMovement.clientId = params.clientId;
            }
            _this.optionsCreditMovement.pageSize = 45;
            _this.optionsCreditMovement.showPerPage = 15;
            _this.optionsCreditMovement.auxMediaTypeAccept = environment_1.environment.mediaTypes.creditMovement.get.accept.getAllJson;
            _this.optionsCreditMovement.orderBy = "DepositDate desc";
            // this.optionsDebitReason.active = true;
            // this.optionsDebitReason.fields = 'type,active';
            _this.allCreditMovements();
        });
    }
    ListDepositComponent.prototype.allCreditMovements = function () {
        var _this = this;
        var params = new http_1.HttpParams();
        if (this.optionsCreditMovement.searchQuery != null) {
            params = params.append('SearchQuery', this.optionsCreditMovement.searchQuery);
        }
        if (this.optionsCreditMovement.depositDate != null) {
            params = params.append('DepositDate', this.optionsCreditMovement.depositDate.toString());
        }
        if (this.optionsCreditMovement.document != null) {
            params = params.append('Document', this.optionsCreditMovement.document);
        }
        if (this.optionsCreditMovement.value != null) {
            params = params.append('Value', this.optionsCreditMovement.value);
        }
        if (this.optionsCreditMovement.creditReasonId != null) {
            params = params.append('CreditReasonId', this.optionsCreditMovement.creditReasonId);
        }
        if (this.optionsCreditMovement.bankAccountId != null) {
            params = params.append('BankAccountId', this.optionsCreditMovement.bankAccountId);
        }
        if (this.optionsCreditMovement.creditMovementStatusId != null) {
            params = params.append('CreditMovementStatusId', this.optionsCreditMovement.creditMovementStatusId);
        }
        if (this.optionsCreditMovement.creditMovementsImportedId != null) {
            params = params.append('CreditMovementsImportedId', this.optionsCreditMovement.creditMovementsImportedId);
        }
        if (this.optionsCreditMovement.clientId != null) {
            params = params.append('ClientId', this.optionsCreditMovement.clientId);
        }
        if (this.optionsCreditMovement.active != null) {
            params = params.append('Active', this.optionsCreditMovement.active);
        }
        if (this.optionsCreditMovement.orderBy != null) {
            params = params.append('OrderBy', this.optionsCreditMovement.orderBy);
        }
        if (this.optionsCreditMovement.fields != null) {
            params = params.append('Fields', this.optionsCreditMovement.fields);
        }
        params = params.append('PageNumber', this.optionsCreditMovement.currentPage.toString());
        params = params.append('PageSize', this.optionsCreditMovement.pageSize.toString());
        this.service
            .getAllCreditMovements(params, this.optionsCreditMovement.auxMediaTypeAccept)
            .subscribe(function (result) {
            if (!result) {
                return;
            }
            if (result.status == 200) {
                if (_this.optionsCreditMovement.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                    _this.optionsCreditMovement.source.load(result.body.value);
                    _this.optionsCreditMovement.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsCreditMovement.totalCount = _this.optionsCreditMovement.totalCount['totalCount'];
                }
                else {
                    _this.optionsCreditMovement.source.load(result.body);
                    console.log(JSON.parse(result.headers.get('X-Pagination')));
                    _this.optionsCreditMovement.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsCreditMovement.totalCount = _this.optionsCreditMovement.totalCount['totalCount'];
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    ListDepositComponent.prototype.initOnChagedData = function () {
        var _this = this;
        this.optionsCreditMovement.source.onChanged().subscribe(function (change) {
            if (change.action === 'page') {
                _this.nextPage(change.paging.page);
            }
        });
    };
    ListDepositComponent.prototype.nextPage = function (pageIndex) {
        var _this = this;
        var getNew = pageIndex * this.optionsCreditMovement.showPerPage;
        if (getNew >= this.optionsCreditMovement.source.count() && getNew < this.optionsCreditMovement.totalCount) {
            this.optionsCreditMovement.currentPage = this.optionsCreditMovement.currentPage + 1;
            var params = new http_1.HttpParams();
            if (this.optionsCreditMovement.searchQuery != null) {
                params = params.append('SearchQuery', this.optionsCreditMovement.searchQuery);
            }
            if (this.optionsCreditMovement.depositDate != null) {
                params = params.append('DepositDate', this.optionsCreditMovement.depositDate.toString());
            }
            if (this.optionsCreditMovement.document != null) {
                params = params.append('Document', this.optionsCreditMovement.document);
            }
            if (this.optionsCreditMovement.value != null) {
                params = params.append('Value', this.optionsCreditMovement.value);
            }
            if (this.optionsCreditMovement.creditReasonId != null) {
                params = params.append('CreditReasonId', this.optionsCreditMovement.creditReasonId);
            }
            if (this.optionsCreditMovement.creditMovementStatusId != null) {
                params = params.append('CreditMovementStatusId', this.optionsCreditMovement.creditMovementStatusId);
            }
            if (this.optionsCreditMovement.creditMovementsImportedId != null) {
                params = params.append('CreditMovementsImportedId', this.optionsCreditMovement.creditMovementsImportedId);
            }
            if (this.optionsCreditMovement.clientId != null) {
                params = params.append('ClientId', this.optionsCreditMovement.clientId);
            }
            if (this.optionsCreditMovement.active != null) {
                params = params.append('Active', this.optionsCreditMovement.active);
            }
            if (this.optionsCreditMovement.orderBy != null) {
                params = params.append('OrderBy', this.optionsCreditMovement.orderBy);
            }
            if (this.optionsCreditMovement.fields != null) {
                params = params.append('Fields', this.optionsCreditMovement.fields);
            }
            params = params.append('PageNumber', this.optionsCreditMovement.currentPage.toString());
            params = params.append('PageSize', this.optionsCreditMovement.pageSize.toString());
            this.service
                .getAllCreditMovements(params, this.optionsCreditMovement.auxMediaTypeAccept)
                .subscribe(function (result) {
                if (!result) {
                    return;
                }
                if (result.status == 200) {
                    if (_this.optionsCreditMovement.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                        result.body.value.forEach(function (element) {
                            _this.optionsCreditMovement.source.add(element);
                        });
                    }
                    else {
                        result.body.forEach(function (element) {
                            _this.optionsCreditMovement.source.add(element);
                        });
                    }
                }
            }, function (err) {
                console.warn(err);
            });
        }
    };
    ListDepositComponent.prototype.onEdit = function (entity, content) {
        var _this = this;
        if (entity.active) {
            if (entity.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.pendingReview) {
                this.router.navigate([
                    '/deposits/update-deposit/' + entity.creditMovementsId + '/' + entity.client.clientId,
                ]);
            }
            else {
                this.modalUp.actionModal = 'MODIFY';
                this.modalUp.status = 'already verified';
                this.modalUp.title = 'Not possible';
                this.modalUp.titleButton = '';
                this.modalService
                    .open(content, { ariaLabelledBy: 'modal-basic-title' })
                    .result.then(function (result) {
                    _this.closeResult = "Closed with: " + result;
                }, function (reason) {
                    _this.closeResult = "Dismissed " + _this.getDismissReason(reason, null, null);
                });
            }
        }
        else {
            this.modalUp.actionModal = 'MODIFY';
            this.modalUp.status = 'Deleted.!';
            this.modalUp.title = 'Not possible';
            this.modalUp.titleButton = '';
            this.modalService
                .open(content, { ariaLabelledBy: 'modal-basic-title' })
                .result.then(function (result) {
                _this.closeResult = "Closed with: " + result;
            }, function (reason) {
                _this.closeResult = "Dismissed " + _this.getDismissReason(reason, null, null);
            });
        }
    };
    ListDepositComponent.prototype.getDismissReason = function (reason, entity, button) {
        // console.log(reason);
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else if (reason == 'accept' && button == 'DELETE') {
            this.deleteOrRestoreDeposit(entity);
        }
        else if (reason == 'accept' && button == 'VERIFI') {
            this.verifiedDeposit(entity, this.creditMovementsImported);
        }
        else if (reason == 'accept' && button == 'RESTORE') {
            this.deleteOrRestoreDeposit(entity);
        }
        else if (reason == 'accept' && button == 'NOT FOUND') {
            this.notFoundDeposit(entity);
        }
        else if (reason == 'accept' && button == 'TO BE VERIFIED') {
            this.unverifiedDeposit(entity);
        }
        else {
            this.showMsgNoMatchValues = false;
            this.showTableCreditMovementImported = true;
            this.showCreditMovementImport = false;
            return "with: " + reason;
        }
    };
    ListDepositComponent.prototype.onDelete = function (entity, content) {
        var _this = this;
        this.modalUp.actionModal = 'DELETE';
        if (entity.active) {
            if (this.canDelete(entity)) {
                this.modalUp.titleButton = 'DELETE';
                this.modalUp.title = 'WARNING';
            }
            else {
                this.modalUp.status = 'already verified';
                this.modalUp.title = 'Not possible';
                this.modalUp.titleButton = '';
            }
        }
        else {
            this.modalUp.status = 'been removed before.!';
            this.modalUp.title = 'Not possible';
            this.modalUp.titleButton = '';
        }
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title' })
            .result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason, entity, _this.modalUp.actionModal);
        });
    };
    ListDepositComponent.prototype.onVerified = function (item, content) {
        var _this = this;
        // console.log(item)
        if (item.option == 'VERIFIED') {
            console.log(" Se puede verificar ?");
            if (this.canVerifiOrNotFund(item.entity)) {
                console.log(" Si se puede verificar.!");
                var ids = [];
                ids.push(item.entity.creditMovementsId);
                console.log(" Se puede verificar automaticamente?");
                this.cantVerifiAuto(ids).subscribe(function (resp) {
                    if (resp == false) {
                        console.log(" No se puede verificar automaticamente, abriremos el menú manual");
                        _this.creditMovementToVerifi = item.entity;
                        // console.log(this.creditMovementToVerifi.bankAccount.bankAccountId);
                        _this.modalUp.status = '';
                        _this.modalUp.actionModal = 'VERIFI';
                        _this.modalUp.title = 'VERIFI';
                        _this.modalUp.titleButton = 'VERIFI';
                    }
                    else {
                        console.log(" Si se pudo verificar automaticamente");
                        _this.modalUp.status = 'Verified Automatically';
                        _this.modalUp.title = 'VERIFIED OK.!';
                        _this.modalUp.titleButton = '';
                    }
                });
            }
            else {
                this.modalUp.status = '';
                this.modalUp.title = 'Not possible';
                this.modalUp.titleButton = '';
            }
        }
        else if (item.option == 'UNVERIFIED') {
            if (this.canUnverified(item.entity)) {
                this.modalUp.status = '';
                this.modalUp.actionModal = 'TO BE VERIFIED';
                this.modalUp.title = 'TO BE VERIFIED';
                this.modalUp.titleButton = 'TO BE VERIFIED';
            }
            else {
                this.modalUp.status = '';
                this.modalUp.title = 'Not possible';
                this.modalUp.titleButton = '';
            }
        }
        else if (item.option == 'NOT FOUND') {
            if (this.canVerifiOrNotFund(item.entity)) {
                this.modalUp.status = '';
                this.modalUp.actionModal = 'NOT FOUND';
                this.modalUp.title = 'NOT FOUND';
                this.modalUp.titleButton = 'NOT FOUND';
            }
            else {
                this.modalUp.status = '';
                this.modalUp.title = 'Not possible';
                this.modalUp.titleButton = '';
            }
        }
        else if (item.option == 'UNVERIFIED (NF)') {
            if (this.canUnverifiedNF(item.entity)) {
                this.modalUp.status = '';
                this.modalUp.actionModal = 'TO BE VERIFIED';
                this.modalUp.title = 'TO BE VERIFIED';
                this.modalUp.titleButton = 'TO BE VERIFIED';
            }
            else {
                this.modalUp.status = '';
                this.modalUp.title = 'Not possible';
                this.modalUp.titleButton = '';
            }
        }
        else if (item.option == 'RESTORE') {
            if (this.canRestore(item.entity)) {
                this.modalUp.status = '';
                this.modalUp.actionModal = 'RESTORE';
                this.modalUp.title = 'RESTORE';
                this.modalUp.titleButton = 'RESTORE';
            }
            else {
                this.modalUp.status = '';
                this.modalUp.title = 'Not possible';
                this.modalUp.titleButton = '';
            }
        }
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
            .result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason, item.entity, _this.modalUp.actionModal);
        });
    };
    ListDepositComponent.prototype.creditMovementImportedSelected = function (entity) {
        this.creditMovementsImported = entity;
        // this.creditMovementToVerifi con this.creditMovementsImported
        if (this.creditMovementsImported != null) {
            console.log("Entro aqui");
            if (this.creditMovementToVerifi.value == this.creditMovementsImported.value) {
                this.showCreditMovementImport = true;
                this.showTableCreditMovementImported = false;
            }
            else {
                console.log("Los valores entre las 2 transacciones no coinciden");
                this.showMsgNoMatchValues = true;
                this.showTableCreditMovementImported = false;
                this.creditMovementsImported = null;
            }
        }
        else {
            console.log("Entro aqui");
            this.showCreditMovementImport = false;
        }
    };
    ListDepositComponent.prototype.changeCreditMovementImportedRow = function () {
        this.creditMovementsImported = null;
        this.showCreditMovementImport = false;
        this.showTableCreditMovementImported = true;
        this.showMsgNoMatchValues = false;
    };
    ListDepositComponent.prototype.canVerifiOrNotFund = function (entity) {
        if (entity.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.pendingReview) {
            return true;
        }
        return false;
    };
    ListDepositComponent.prototype.canUnverified = function (entity) {
        // console.log(entity);
        if (entity.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.payVerified) {
            return true;
        }
        return false;
    };
    ListDepositComponent.prototype.canUnverifiedNF = function (entity) {
        // console.log(entity);
        if (entity.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.payNotFound) {
            return true;
        }
        return false;
    };
    ListDepositComponent.prototype.canRestore = function (entity) {
        if (entity.active == false && entity.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.pendingReview) {
            return true;
        }
        return false;
    };
    ListDepositComponent.prototype.canDelete = function (entity) {
        if (entity.active == true && entity.creditMovementStatus.creditMovementStatusId == environment_1.environment.tuplas.creditMovementStatus.pendingReview) {
            return true;
        }
        return false;
    };
    ListDepositComponent.prototype.ngOnInit = function () {
        this.initOnChagedData();
    };
    ListDepositComponent.prototype.deleteOrRestoreDeposit = function (entity) {
        var _this = this;
        var act = null;
        if (entity.active == true) {
            act = 'delete';
        }
        else {
            act = 'restore';
        }
        var vendor = act + " by: " + localStorage.getItem('nombre_sing_in');
        var params = new http_1.HttpParams();
        params = params.append('act', act);
        params = params.append('vendor', vendor);
        this.service.putDeleteOrRestoreCreditMovement(entity.bankAccount.bankAccountId, entity.creditMovementsId, params, environment_1.environment.mediaTypes.creditMovement.putDelete.ContentType.putJson)
            .subscribe(function (result) {
            if (result.status == 200) {
                _this.localDataSourceEditRow(entity, vendor, act.toUpperCase());
            }
        }, function (err) {
            console.warn(err);
            // event.confirm.reject();
        });
    };
    ListDepositComponent.prototype.verifiedDeposit = function (entity, creditMovementsImported) {
        var _this = this;
        var vendor = "Verify by: " + localStorage.getItem('nombre_sing_in');
        var toPatch = [];
        entity.creditMovementStatus.creditMovementStatusId = environment_1.environment.tuplas.creditMovementStatus.payVerified;
        entity.creditMovementsImported = creditMovementsImported;
        if (entity.value == entity.creditMovementsImported.value) {
            toPatch.push({
                path: '/verifiedType',
                op: 'replace',
                value: vendor
            });
            toPatch.push({
                path: '/creditMovementsImportedId',
                op: 'replace',
                value: entity.creditMovementsImported.creditMovementsImportedId
            });
            toPatch.push({
                path: '/creditMovementStatusId',
                op: 'replace',
                value: entity.creditMovementStatus.creditMovementStatusId
            });
            this.service.patchCreditMovement(entity.bankAccount.bankAccountId, entity.creditMovementsId, toPatch, environment_1.environment.mediaTypes.creditMovement.patch.ContentType.patchJson)
                .subscribe(function (result) {
                console.log(result);
                if (result.status == 201) {
                    console.log("entro aqi");
                    _this.localDataSourceEditRow(entity, vendor, "VERIFI");
                    _this.creditMovementsImported = null;
                    _this.showMsgNoMatchValues = false;
                    _this.showTableCreditMovementImported = true;
                    _this.showCreditMovementImport = false;
                }
            }, function (err) {
                console.warn(err);
                _this.creditMovementsImported = null;
            });
        }
        else {
            console.log("Los valores entre las 2 transacciones no coinciden");
        }
    };
    ListDepositComponent.prototype.unverifiedDeposit = function (entity) {
        var _this = this;
        var vendor = "Unverified by: " + localStorage.getItem('nombre_sing_in');
        var toPatch = [];
        entity.creditMovementStatus.creditMovementStatusId = environment_1.environment.tuplas.creditMovementStatus.pendingReview;
        // entity.creditMovementsImported = null;
        toPatch.push({
            path: '/verifiedType',
            op: 'replace',
            value: vendor
        });
        toPatch.push({
            path: '/creditMovementsImportedId',
            op: 'replace',
            value: null
        });
        toPatch.push({
            path: '/creditMovementStatusId',
            op: 'replace',
            value: entity.creditMovementStatus.creditMovementStatusId
        });
        this.service.patchCreditMovement(entity.bankAccount.bankAccountId, entity.creditMovementsId, toPatch, environment_1.environment.mediaTypes.creditMovement.patch.ContentType.patchJson)
            .subscribe(function (result) {
            console.log(result);
            if (result.status == 201) {
                console.log("entro aqi");
                _this.localDataSourceEditRow(entity, vendor, "TO BE VERIFIED");
            }
        }, function (err) {
            console.warn(err);
        });
    };
    ListDepositComponent.prototype.notFoundDeposit = function (entity) {
        var _this = this;
        var vendor = "Not found by: " + localStorage.getItem('nombre_sing_in');
        var toPatch = [];
        entity.creditMovementStatus.creditMovementStatusId = environment_1.environment.tuplas.creditMovementStatus.payNotFound;
        toPatch.push({
            path: '/verifiedType',
            op: 'replace',
            value: vendor
        });
        toPatch.push({
            path: '/creditMovementStatusId',
            op: 'replace',
            value: entity.creditMovementStatus.creditMovementStatusId
        });
        this.service.patchCreditMovement(entity.bankAccount.bankAccountId, entity.creditMovementsId, toPatch, environment_1.environment.mediaTypes.creditMovement.patch.ContentType.patchJson)
            .subscribe(function (result) {
            console.log(result);
            if (result.status == 201) {
                console.log("entro aqi");
                _this.localDataSourceEditRow(entity, vendor, "NOT FOUND");
            }
        }, function (err) {
            console.warn(err);
        });
    };
    ListDepositComponent.prototype.localDataSourceEditRow = function (entity, vendor, action) {
        var _this = this;
        this.optionsCreditMovement.source.getAll().then(function (x) {
            var aux = x.find(function (element) { return element.creditMovementsId == entity.creditMovementsId; });
            if (action == "DELETE") {
                aux.active = false;
                aux.verifiedType = vendor;
                _this.optionsCreditMovement.source.load(x);
            }
            if (action == "RESTORE") {
                aux.active = true;
                aux.verifiedType = vendor;
                _this.optionsCreditMovement.source.load(x);
            }
            if (action == "VERIFI") {
                aux.creditMovementsImported.creditMovementsImportedId = entity.creditMovementsImported.creditMovementsImportedId;
                aux.creditMovementStatus.creditMovementStatusId = entity.creditMovementStatus.creditMovementStatusId;
                aux.verifiedType = vendor;
                _this.optionsCreditMovement.source.load(x);
            }
            if (action == "NOT FOUND") {
                aux.creditMovementStatus.creditMovementStatusId = entity.creditMovementStatus.creditMovementStatusId;
                aux.verifiedType = vendor;
                _this.optionsCreditMovement.source.load(x);
            }
            if (action == "TO BE VERIFIED") {
                aux.creditMovementsImported = entity.creditMovementsImported;
                aux.creditMovementStatus.creditMovementStatusId = entity.creditMovementStatus.creditMovementStatusId;
                aux.verifiedType = vendor;
                _this.optionsCreditMovement.source.load(x);
            }
        });
    };
    ListDepositComponent.prototype.cantVerifiAuto = function (creditMovementIds) {
        var _this = this;
        var subject = new rxjs_1.Subject();
        if (creditMovementIds.length > 0) {
            this.service
                .verifiAutomaticallyCreditMovements(creditMovementIds, environment_1.environment.mediaTypes.creditMovement.postVerified.ContentType.postJson)
                .subscribe(function (result) {
                console.log(JSON.parse(result.body.msg));
                var aux = JSON.parse(result.body.msg);
                console.log(JSON.parse(aux.verified));
                if (aux.verified > 0) {
                    subject.next(true);
                    _this.allCreditMovements();
                }
                else {
                    console.log("Etnro aqi");
                    subject.next(false);
                }
            });
        }
        return subject.asObservable();
    };
    ListDepositComponent.prototype.searchFilters = function (optionsCreditMovement) {
        // console.log(optionsCreditMovement);
        this.allCreditMovements();
    };
    ListDepositComponent = __decorate([
        core_1.Component({
            selector: 'app-list-deposit',
            templateUrl: './list-deposit.component.html',
            styleUrls: ['./list-deposit.component.scss']
        })
    ], ListDepositComponent);
    return ListDepositComponent;
}());
exports.ListDepositComponent = ListDepositComponent;
