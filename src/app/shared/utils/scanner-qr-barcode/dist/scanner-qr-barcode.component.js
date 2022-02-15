"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Appointment = exports.ScannerQrBarcodeComponent = void 0;
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ScannerQrBarcodeComponent = /** @class */ (function () {
    function ScannerQrBarcodeComponent(modalService, cd) {
        this.modalService = modalService;
        this.cd = cd;
        this.scannerEnabled = false;
        this.transports = [];
        this.codeCharged = new core_1.EventEmitter();
    }
    ScannerQrBarcodeComponent.prototype.ngOnInit = function () {
    };
    ScannerQrBarcodeComponent.prototype.scanSuccessHandler = function ($event, modal) {
        this.scannerEnabled = false;
        try {
            var appointment = new Appointment($event, 'Code Charged');
            this.codeCharged.emit(appointment);
            modal.dismiss('Code Charged');
        }
        catch (error) {
            console.error("Ha ocurrido un error por favor intentalo nuevamente ... ");
            console.error(error);
            this.codeCharged.emit(null);
            this.cd.markForCheck();
        }
    };
    ScannerQrBarcodeComponent.prototype.enableScanner = function (content) {
        var _this = this;
        this.scannerEnabled = true;
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title' })
            .result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    ScannerQrBarcodeComponent.prototype.getDismissReason = function (reason) {
        console.log(reason);
        this.scannerEnabled = false;
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
    __decorate([
        core_1.ViewChild('content', { static: false })
    ], ScannerQrBarcodeComponent.prototype, "contenidoDelModal");
    __decorate([
        core_1.Output()
    ], ScannerQrBarcodeComponent.prototype, "codeCharged");
    ScannerQrBarcodeComponent = __decorate([
        core_1.Component({
            selector: 'app-scanner-qr-barcode',
            templateUrl: './scanner-qr-barcode.component.html',
            styleUrls: ['./scanner-qr-barcode.component.scss']
        })
    ], ScannerQrBarcodeComponent);
    return ScannerQrBarcodeComponent;
}());
exports.ScannerQrBarcodeComponent = ScannerQrBarcodeComponent;
var Appointment = /** @class */ (function () {
    function Appointment(identifier, reason) {
        this.identifier = null;
        this.reason = null;
        this.identifier = identifier;
        this.reason = reason;
    }
    return Appointment;
}());
exports.Appointment = Appointment;
