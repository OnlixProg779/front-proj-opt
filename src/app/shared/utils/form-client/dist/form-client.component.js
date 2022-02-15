"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FormClientComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FormClientComponent = /** @class */ (function () {
    function FormClientComponent(formBuilder, validatorService) {
        this.formBuilder = formBuilder;
        this.validatorService = validatorService;
        //Type
        this.object = Object;
        this.options2 = [
            { "new": 'New' },
            { regular: 'Regular' },
            { frequent: 'Frequent' },
            { vip: 'VIP' },
        ];
        this.optionCheked = 'New';
        this.optionsGender = [{ m: 'M' }, { f: 'F' }, { x: 'X' }];
        this.optionChekedGender = 'X';
        this.submit = new core_1.EventEmitter();
    }
    FormClientComponent.prototype.onItemChange = function (value) {
        this.mode = value;
        console.log(this.mode);
    };
    FormClientComponent.prototype.onItemChangeGender = function (value) {
        this.modeGender = value;
        console.log(this.modeGender);
    };
    FormClientComponent.prototype.createAccountForm = function () {
        this.accountForm = this.formBuilder.group({
            clientId: [''],
            firstName: [
                '',
                {
                    validators: [forms_1.Validators.required]
                },
            ],
            lastName: [
                '',
                {
                    validators: [forms_1.Validators.required]
                },
            ],
            instagramName: [''],
            type: [''],
            dateOfBirth: [''],
            phone: [''],
            gender: [''],
            city: [
                '',
                {
                    validators: [forms_1.Validators.required]
                },
            ],
            dni: [''],
            userName: [''],
            password: [
                ''
                // ,
                // {
                //   validators: [Validators.required],
                // },
            ],
            passwordReal: [''],
            confirmPwd: [''],
            claimValueClient: ['true']
        });
    };
    FormClientComponent.prototype.save = function () {
        if (this.accountForm.valid) {
            var aux = this.accountForm.value;
            aux.type = this.mode;
            aux.gender = this.modeGender;
            if (JSON.stringify(this.clientSentCreateDto) !== JSON.stringify(aux)) {
                this.clientSentCreateDto = aux;
                this.submit.emit(this.clientSentCreateDto);
            }
        }
        else {
            this.accountForm.markAllAsTouched();
            console.log('FORM NOT VALID');
            return;
        }
    };
    FormClientComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createAccountForm();
        this.mode = this.options2[0]["new"];
        this.modeGender = this.optionsGender[2].x;
        // Para el uptade
        if (this.modelo !== undefined) {
            this.accountForm.patchValue(this.modelo);
            this.mode = this.optionCheked;
            this.modeGender = this.optionChekedGender;
            this.accountForm.controls['userName'].setValue(this.modelo.user.userName);
            this.accountForm.controls['passwordReal'].setValue(this.modelo.user.password);
            this.accountForm.controls['confirmPwd'].setValue(this.modelo.user.password);
            this.modelo.user.userClaims.forEach(function (claim) {
                if (claim.claimType === 'CanAccessUserCl') {
                    _this.accountForm.controls['claimValueClient'].setValue(claim.claimValue);
                }
            });
        }
    };
    __decorate([
        core_1.Input()
    ], FormClientComponent.prototype, "optionCheked");
    __decorate([
        core_1.Input()
    ], FormClientComponent.prototype, "optionChekedGender");
    __decorate([
        core_1.Input()
    ], FormClientComponent.prototype, "renderValue");
    __decorate([
        core_1.Input()
    ], FormClientComponent.prototype, "modelo");
    __decorate([
        core_1.Output()
    ], FormClientComponent.prototype, "submit");
    FormClientComponent = __decorate([
        core_1.Component({
            selector: 'app-form-client',
            templateUrl: './form-client.component.html',
            styleUrls: ['./form-client.component.scss']
        })
    ], FormClientComponent);
    return FormClientComponent;
}());
exports.FormClientComponent = FormClientComponent;
