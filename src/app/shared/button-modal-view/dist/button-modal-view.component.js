"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResourceModal = exports.ButtonModalViewComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var options_credit_movement_1 = require("src/app/components/menus/models/options-credit-movement");
var environment_1 = require("src/environments/environment");
var ButtonModalViewComponent = /** @class */ (function () {
    function ButtonModalViewComponent(modalService, creditMovementsService, orderService, shippingService, guideService, refundService, router) {
        this.modalService = modalService;
        this.creditMovementsService = creditMovementsService;
        this.orderService = orderService;
        this.shippingService = shippingService;
        this.guideService = guideService;
        this.refundService = refundService;
        this.router = router;
        // depositoAux = {
        //   tipo: "",
        //   detalle: ""
        // }
        this.refundAux = {
            tipo: "",
            detalle: ""
        };
        this.model = new ResourceModal();
        this.save = new core_1.EventEmitter();
        this.optionsCreditMovement = new options_credit_movement_1.OptionsCreditMovement();
    }
    ButtonModalViewComponent.prototype.ngOnInit = function () {
        this.separarData(this.value);
    };
    ButtonModalViewComponent.prototype.separarData = function (value) {
        this.model.renderValue = value.renderValue;
        this.model.step = value.step;
        this.model.clientId = value.clientId;
        this.model.idReference = value.idReference;
        this.model.type = value.type;
        this.model.styl = value.styl;
        if (value.entity) {
            this.model.entity = value.entity;
        }
    };
    ButtonModalViewComponent.prototype.onClick = function (content) {
        //  this.save.emit(this.rowData);
        if (this.model.type === 'DEPOSITO') {
            console.log("Entro a DEPOSITO");
            this.getDeposito(this.model.idReference, content);
        }
        // else
        //   if (this.model.type === 'ORDER') {
        //     console.log("Entro a ORDER");
        //     this.getOrder(this.model.clientId, this.model.idReference, content);
        //   }
        else if (this.model.type === 'SHIPPING') {
            console.log("Entro a SHIPPING");
            this.getShipping(this.model.idReference, content);
        }
        else if (this.model.type === 'REFUND') {
            console.log("Entro a REFUND");
            this.getRefund(this.model.clientId, this.model.idReference, content);
        }
        else if (this.model.type === 'DETAILS REFUND') {
            console.log("Entro a DETAILS REFUND");
            console.log(this.model.entity);
            this.getDetailsRefund(this.model.entity, content);
        }
        else if (this.model.type === 'ORDER_PRODUCT_RECEIVE') {
            console.log("Entro a ORDER_PRODUCT_RECEIVE");
            console.log(this.model.entity);
            if (!this.model.entity) {
                console.warn("NO SE HA ENVIADO UNA ENTIDAD ORDER RECIVED");
                // this.getReceiveBox(this.model.clientId, this.model.idReference, content);
            }
            else {
                this.receivedBoxDto = this.model.entity.receivedBox;
                this.openModal(content, this.receivedBoxDto, null);
            }
            // this.getDetailsRefund(this.model.entity, content);
        }
        else if (this.model.type === 'GUIDE') {
            console.log("Entro a GUIDE");
            console.log(this.model.entity);
            this.getGuide(this.model.idReference, content);
        }
    };
    ButtonModalViewComponent.prototype.getDismissReason = function (reason, entity, button) {
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
    ButtonModalViewComponent.prototype.getDetailsRefund = function (refund, content) {
        this.refundDetailsDto = refund;
        this.refundAux = this.convertirDepositRef(refund.nRef);
        this.refundAux.detalle = Object.values(this.refundAux)[0];
        this.refundAux.tipo = Object.keys(this.refundAux)[0];
        this.openModal(content, refund, null);
    };
    ButtonModalViewComponent.prototype.getDeposito = function (creditMovementId, content) {
        var _this = this;
        this.optionsCreditMovement.auxMediaTypeAccept = environment_1.environment.mediaTypes.creditMovement.getUnique.accept.getJson;
        var params = new http_1.HttpParams();
        if (this.optionsCreditMovement.fields != null) {
            params = params.append('Fields', this.optionsCreditMovement.fields);
        }
        this.creditMovementsService
            .getUniqueCreditMovements(creditMovementId, params, this.optionsCreditMovement.auxMediaTypeAccept)
            .subscribe(function (result) {
            if (!result) {
                return;
            }
            if (result.status == 200) {
                _this.depositDto = result.body;
                _this.openModal(content, null, null);
                //  this.openModal(content, this.depositDto, 'edit deposit');
            }
        });
    };
    ButtonModalViewComponent.prototype.getCreditReasonDeposit = function (entity) {
        if (entity.creditReason != null) {
            return entity.creditReason.reason;
        }
        else {
            return 'Deposit';
        }
    };
    ButtonModalViewComponent.prototype.getRefund = function (clientId, refundId, content) {
        var _this = this;
        this.refundService
            .getRefund(clientId, refundId)
            .subscribe(function (result) {
            if (!result) {
                return;
            }
            if (result.status == 200) {
                _this.refundDto = result.body;
                console.log(_this.refundDto);
                _this.refundAux = _this.convertirDepositRef(_this.refundDto.nRef);
                _this.refundAux.detalle = Object.values(_this.refundAux)[0];
                _this.refundAux.tipo = Object.keys(_this.refundAux)[0];
                console.log(_this.refundAux);
                _this.openModal(content, null, null);
                //  this.openModal(content, this.depositDto, 'edit deposit');
            }
        });
    };
    ButtonModalViewComponent.prototype.convertirDepositRef = function (nRef) {
        var option;
        option = nRef.replace("{'", '{"');
        option = option.replace("':'", '":"');
        option = option.replace("'}", '"}');
        option = JSON.parse(option);
        return option;
    };
    // getReceiveBox(clientId: string, orderId: string, content) {
    //   this.orderService
    //     .getOrder(clientId, orderId)
    //     .subscribe((result) => {
    //       this.orderDto = result;
    //       console.log(this.orderDto);
    //       this.openModal(content, this.orderDto, null);
    //     });
    // }
    ButtonModalViewComponent.prototype.getShipping = function (shippingId, content) {
        var _this = this;
        this.shippingService
            .getShipping(shippingId)
            .subscribe(function (result) {
            if (!result) {
                return;
            }
            if (result.status == 200) {
                _this.shippingDto = result.body;
                console.log(_this.shippingDto);
                _this.openModal(content, _this.shippingDto, null);
            }
        });
    };
    ButtonModalViewComponent.prototype.getGuide = function (guideId, content) {
        // this.guideService
        //   .getGuide(guideId)
        //   .subscribe((result: HttpResponse<any>) => {
        //     if (!result) {
        //       return;
        //     }
        //     if (result.status == 200) {
        //       this.guideDto = result.body;
        //       console.log(this.guideDto);
        //       this.openModal(content, this.guideDto, null);
        //     }
        //   });
    };
    ButtonModalViewComponent.prototype.openModal = function (content, entity, button) {
        var _this = this;
        this.modalService
            .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
            .result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason, entity, button);
        });
    };
    ButtonModalViewComponent.prototype.onEditOrder = function (orderId) {
        this.modalService.dismissAll();
        this.router.navigate(['/orders/update-order/' + orderId]);
    };
    ButtonModalViewComponent.prototype.onEditShipping = function (shippingId) {
        this.modalService.dismissAll();
        this.router.navigate(['/shipping/update-shipping/' + shippingId]);
    };
    ButtonModalViewComponent.prototype.onEditGuide = function (guideId) {
        this.modalService.dismissAll();
        this.router.navigate(['/guides/update-guide/' + guideId]);
    };
    ButtonModalViewComponent.prototype.onEditRefund = function (refundId, clientId) {
        this.modalService.dismissAll();
        this.router.navigate([
            '/refunds/update-refund/' + refundId + '/' + clientId,
        ]);
    };
    ButtonModalViewComponent.prototype.onEditDeposit = function (depositId, clientId) {
        this.modalService.dismissAll();
        this.router.navigate([
            '/deposits/update-deposit/' + depositId + '/' + clientId,
        ]);
    };
    __decorate([
        core_1.Input()
    ], ButtonModalViewComponent.prototype, "value");
    __decorate([
        core_1.Input()
    ], ButtonModalViewComponent.prototype, "rowData");
    __decorate([
        core_1.Output()
    ], ButtonModalViewComponent.prototype, "save");
    ButtonModalViewComponent = __decorate([
        core_1.Component({
            selector: 'app-button-modal-view',
            templateUrl: './button-modal-view.component.html',
            styleUrls: ['./button-modal-view.component.scss']
        })
    ], ButtonModalViewComponent);
    return ButtonModalViewComponent;
}());
exports.ButtonModalViewComponent = ButtonModalViewComponent;
var ResourceModal = /** @class */ (function () {
    function ResourceModal() {
        this.renderValue = 'Details';
        this.step = 'btn btn-success';
    }
    return ResourceModal;
}());
exports.ResourceModal = ResourceModal;
