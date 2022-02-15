"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var app_user_auth_1 = require("../models/app-user-auth");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, service, router, modalService, validatorService) {
        this.formBuilder = formBuilder;
        this.service = service;
        this.router = router;
        this.modalService = modalService;
        this.validatorService = validatorService;
        this.securityObject = new app_user_auth_1.AppUserAuth();
        this.returnUrl = '/dashboard/default';
        this.errorMessage = '';
        this.modalUp = {
            status: 'Invalid username or Password',
            actionModal: 'LOGIN FAILED',
            title: 'INVALID',
            titleButton: ''
        };
        this.owlcarousel = [
            {
                title: 'Welcome to Envios Ecuador',
                desc: 'Fácil, Rápido y Seguro...'
            },
            {
                title: 'Welcome to Envios Ecuador',
                desc: 'This website is for administrators only'
            },
            {
                title: 'Welcome to Envios Ecuador',
                desc: 'Panel Admin and more'
            },
        ];
        this.owlcarouselOptions = {
            loop: true,
            items: 1,
            dots: true
        };
    }
    LoginComponent.prototype.createLoginForm = function () {
        this.loginForm = this.formBuilder.group({
            userName: ['', {
                    validators: [forms_1.Validators.required]
                }],
            password: ['', {
                    validators: [forms_1.Validators.required]
                }]
        });
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.createLoginForm();
    };
    LoginComponent.prototype.onSubmit = function () { };
    LoginComponent.prototype.login = function (userModel, content) {
        var _this = this;
        userModel = this.loginForm.value;
        // console.log(userModel);
        this.errorMessage = '';
        this.service.login(userModel).subscribe(function (resp) {
            _this.securityObject = resp;
            _this.router.navigateByUrl(_this.returnUrl);
        }, function (error) {
            _this.errorMessage = error;
            _this.modalUp.status = _this.errorMessage;
            _this.modalService
                .open(content, { ariaLabelledBy: 'modal-basic-title' })
                .result.then(function (result) {
                _this.closeResult = "Closed with: " + result;
            }, function (reason) {
                _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
            });
        });
    };
    LoginComponent.prototype.getDismissReason = function (reason) {
        console.log(reason);
        if (reason === ng_bootstrap_1.ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ng_bootstrap_1.ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
