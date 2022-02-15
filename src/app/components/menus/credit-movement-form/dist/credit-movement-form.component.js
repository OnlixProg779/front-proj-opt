"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreditMovementFormComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var environment_1 = require("src/environments/environment");
var options_bank_account_1 = require("../../setting/models/BankAccounts/options-bank-account");
var options_credit_reason_1 = require("../../setting/models/CreditReason/options-credit-reason");
var uuid_1 = require("uuid");
var CreditMovementFormComponent = /** @class */ (function () {
    function CreditMovementFormComponent(formBuilder, validatorService, menusServices) {
        this.formBuilder = formBuilder;
        this.validatorService = validatorService;
        this.menusServices = menusServices;
        this.object = Object;
        this.renderValues = {
            renderValue: '',
            renderAction: '',
            clientId: '',
            nameClient: ''
        };
        this.optionsBankAccounts = new options_bank_account_1.OptionsBankAccount();
        this.optionsCreditReason = new options_credit_reason_1.OptionsCreditReason();
        this.formOptionsBankAccounts = [];
        this.formOptionsCreditReason = [];
        this.clientDto = null;
        this.employeeId = localStorage.getItem('employeeId_sing_in');
        this.employeeName = localStorage.getItem('nombre_sing_in');
        this.submit = new core_1.EventEmitter();
        this.changeImage = false;
        this.fieldDocument = "# Document";
        this.optionsBankAccounts.auxMediaTypeAccept = environment_1.environment.mediaTypes.bankAccounts.get.accept.getAllJson;
        this.optionsBankAccounts.active = true;
        this.optionsBankAccounts.fields = 'BankAccountId,AccountAlias,EmployeeReferenceId';
        this.initDataBankAccount();
        this.optionsCreditReason.auxMediaTypeAccept = environment_1.environment.mediaTypes.creditReason.get.accept.getAllJson;
        this.optionsCreditReason.active = true;
        this.optionsCreditReason.fields = 'CreditReasonId,Reason';
        this.initDataCreditReasons();
    }
    CreditMovementFormComponent.prototype.ngOnInit = function () {
        this.createDepositForm();
        this.depositForm.controls['creditReasonId'].setValue(environment_1.environment.tuplas.creditReason.payId);
        if (this.modelo !== undefined) {
            console.log(this.modelo);
            this.depositForm.patchValue(this.modelo);
            this.depositForm.controls['bankAccountId'].setValue(this.modelo.bankAccount.bankAccountId);
            try {
                this.depositForm.controls['creditReasonId'].setValue(this.modelo.creditReason.creditReasonId);
            }
            catch (error) {
                console.warn(error);
            }
            this.depositForm.controls['depositDate'].setValue(this.modelo.depositDate.toString().split('T')[0]);
            this.depositForm.controls['clientId'].setValue(this.renderValues.clientId);
            console.log(this.depositForm.controls['clientId'].value);
        }
        else {
            if (this.renderValues.clientId != 'undefined') {
                this.depositForm.controls['clientId'].setValue(this.renderValues.clientId);
                console.log(this.depositForm.controls['clientId'].value);
            }
        }
    };
    CreditMovementFormComponent.prototype.onItemChange = function () {
        var value = this.depositForm.controls['creditReasonId'].value;
        if (value != environment_1.environment.tuplas.creditReason.payId) {
            this.depositForm.controls['bankAccountId'].setValue(environment_1.environment.tuplas.bankAccount.gitRefundClient);
            this.fieldDocument = 'Reason';
        }
        else {
            console.log("Entro aqui");
            this.depositForm.controls['bankAccountId'].setValue(null);
            this.depositForm.controls['document'].setValue(null);
            this.fieldDocument = '# Document';
        }
        console.log();
        console.log(this.depositForm.controls['document'].value);
    };
    CreditMovementFormComponent.prototype.createDepositForm = function () {
        this.depositForm = this.formBuilder.group({
            depositDate: ['',
                {
                    validators: [forms_1.Validators.required]
                }],
            document: ['',
                {
                    validators: [forms_1.Validators.required]
                }],
            value: ['',
                {
                    validators: [forms_1.Validators.required]
                },],
            bankAccountId: ['',
                {
                    validators: [forms_1.Validators.required]
                }],
            image: [''],
            creditReasonId: ['',
                {
                    validators: [forms_1.Validators.required]
                }],
            creditMovementStatusId: [
                '',
                {
                    validators: [forms_1.Validators.required]
                },
            ],
            clientId: ['',
                {
                    validators: [forms_1.Validators.required]
                }
            ]
        });
    };
    CreditMovementFormComponent.prototype.save = function () {
        console.log(this.depositForm.controls['bankAccountId'].value);
        if (!this.changeImage) {
            this.depositForm.patchValue({ image: null });
        }
        this.depositForm.controls['creditMovementStatusId'].setValue('');
        this.depositForm.controls['creditMovementStatusId'].setValue(environment_1.environment.tuplas.creditMovementStatus.pendingReview);
        if (this.depositForm.valid) {
            var aux = this.depositForm.value;
            if (aux.creditReasonId != environment_1.environment.tuplas.creditReason.payId) {
                aux.document = aux.document + " trans: " + uuid_1.v4() + " by: " + this.employeeName;
            }
            if (JSON.stringify(this.depositEmitCreate) !== JSON.stringify(aux)) {
                this.depositEmitCreate = aux;
                // console.log(this.depositEmitCreate)
                this.submit.emit(this.depositEmitCreate);
            }
        }
        else {
            this.depositForm.markAllAsTouched();
            console.log('FORM NOT VALID');
            console.log(this.depositForm);
            return;
        }
    };
    CreditMovementFormComponent.prototype.clienteSeleccionado = function (cliente) {
        this.clientDto = cliente;
        if (cliente != null) {
            this.renderValues.clientId = cliente.clientId;
            this.depositForm.get('clientId').setValue(cliente.clientId);
        }
        else {
            this.renderValues.clientId = '';
            this.depositForm.get('clientId').setValue('');
        }
    };
    CreditMovementFormComponent.prototype.archivoSeleccionado = function (file) {
        this.changeImage = true;
        this.depositForm.get('image').setValue(file);
    };
    CreditMovementFormComponent.prototype.borrarClient = function () {
        this.renderValues.clientId = undefined;
        this.clientDto = null;
    };
    //--------------------------------
    CreditMovementFormComponent.prototype.initDataBankAccount = function () {
        var _this = this;
        var params = new http_1.HttpParams();
        if (this.optionsBankAccounts.active != null) {
            params = params.append('Active', this.optionsBankAccounts.active);
        }
        if (this.optionsBankAccounts.orderBy != null) {
            params = params.append('OrderBy', this.optionsBankAccounts.orderBy);
        }
        if (this.optionsBankAccounts.fields != null) {
            params = params.append('Fields', this.optionsBankAccounts.fields);
        }
        params = params.append('PageNumber', 1);
        params = params.append('PageSize', 100);
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
                        if (element.employeeReferenceId == environment_1.environment.employeeOwnerId || element.employeeReferenceId == _this.employeeId) {
                            _this.formOptionsBankAccounts.push({ value: element.bankAccountId, title: element.accountAlias });
                        }
                    });
                    _this.optionsBankAccounts.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsBankAccounts.totalCount = _this.optionsBankAccounts.totalCount['totalCount'];
                }
                else {
                    // this.optionsBankAccounts.source.load(result.body);
                    result.body.forEach(function (element) {
                        if (element.employeeReferenceId == environment_1.environment.employeeOwnerId || element.employeeReferenceId == _this.employeeId) {
                            _this.formOptionsBankAccounts.push({ value: element.bankAccountId, title: element.accountAlias });
                        }
                    });
                    _this.optionsBankAccounts.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsBankAccounts.totalCount = _this.optionsBankAccounts.totalCount['totalCount'];
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    CreditMovementFormComponent.prototype.initDataCreditReasons = function () {
        var _this = this;
        var params = new http_1.HttpParams();
        if (this.optionsCreditReason.active != null) {
            params = params.append('Active', this.optionsCreditReason.active);
        }
        if (this.optionsCreditReason.orderBy != null) {
            params = params.append('OrderBy', this.optionsCreditReason.orderBy);
        }
        if (this.optionsCreditReason.fields != null) {
            params = params.append('Fields', this.optionsCreditReason.fields);
        }
        params = params.append('PageNumber', 1);
        params = params.append('PageSize', 100);
        this.menusServices
            .getAllCreditReasons(params, this.optionsCreditReason.auxMediaTypeAccept)
            .subscribe(function (result) {
            if (!result) {
                return;
            }
            if (result.status == 200) {
                if (_this.optionsCreditReason.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
                    result.body.value.forEach(function (element) {
                        _this.formOptionsCreditReason.push({ value: element.creditReasonId, title: element.reason });
                    });
                    _this.optionsCreditReason.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsCreditReason.totalCount = _this.optionsCreditReason.totalCount['totalCount'];
                }
                else {
                    result.body.forEach(function (element) {
                        _this.formOptionsCreditReason.push({ value: element.creditReasonId, title: element.reason });
                    });
                    _this.optionsCreditReason.totalCount = JSON.parse(result.headers.get('X-Pagination'));
                    _this.optionsCreditReason.totalCount = _this.optionsCreditReason.totalCount['totalCount'];
                }
            }
        }, function (err) {
            console.warn(err);
        });
    };
    __decorate([
        core_1.Input()
    ], CreditMovementFormComponent.prototype, "renderValues");
    __decorate([
        core_1.Input()
    ], CreditMovementFormComponent.prototype, "modelo");
    __decorate([
        core_1.Output()
    ], CreditMovementFormComponent.prototype, "submit");
    CreditMovementFormComponent = __decorate([
        core_1.Component({
            selector: 'app-credit-movement-form',
            templateUrl: './credit-movement-form.component.html',
            styleUrls: ['./credit-movement-form.component.scss']
        })
    ], CreditMovementFormComponent);
    return CreditMovementFormComponent;
}());
exports.CreditMovementFormComponent = CreditMovementFormComponent;
