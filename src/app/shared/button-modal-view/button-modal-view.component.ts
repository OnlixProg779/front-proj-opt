import { HttpParams, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewCell } from 'ng2-smart-table';

import { CreditMovementDto } from 'src/app/components/menus/models/credit-movement-dto';
import { OptionsCreditMovement } from 'src/app/components/menus/models/options-credit-movement';
import { CreditMovementsService } from 'src/app/components/menus/services/credit-movements.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-button-modal-view',
  templateUrl: './button-modal-view.component.html',
  styleUrls: ['./button-modal-view.component.scss'],
})
export class ButtonModalViewComponent implements ViewCell, OnInit {
  public closeResult: string;

  depositDto: CreditMovementDto;


  // depositoAux = {
  //   tipo: "",
  //   detalle: ""
  // }

  refundAux = {
    tipo: "",
    detalle: ""
  }

  constructor(
    private modalService: NgbModal,
    private creditMovementsService: CreditMovementsService,
    private router: Router
  ) { }

  @Input() value;

  @Input() rowData: any;

  model: ResourceModal = new ResourceModal();

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.separarData(this.value);
  }

  private separarData(value: ResourceModal) {
    this.model.renderValue = value.renderValue;
    this.model.step = value.step;
    this.model.clientId = value.clientId;
    this.model.idReference = value.idReference;
    this.model.type = value.type;
    this.model.styl = value.styl;

    if (value.entity) {
      this.model.entity = value.entity;

    }
  }

  onClick(content) {
    //  this.save.emit(this.rowData);
    if (this.model.type === 'DEPOSITO') {
      console.log("Entro a DEPOSITO");
      this.getDeposito(this.model.idReference, content);
     } 
  }


  private getDismissReason(reason: any, entity: any, button: string): string {
    console.log(reason);
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else if (reason == 'accept' && button == 'edit deposit') {
      // this.deleteDeposit(entity);
    } else if (reason == 'accept' && button == 'VERIFI') {
      // this.verifiedDeposit(entity);
    } else {
      return `with: ${reason}`;
    }
  }



  public optionsCreditMovement: OptionsCreditMovement = new OptionsCreditMovement();
  getDeposito(creditMovementId: string, content) {
    this.optionsCreditMovement.auxMediaTypeAccept = environment.mediaTypes.creditMovement.getUnique.accept.getJson;
    let params = new HttpParams();
    if (this.optionsCreditMovement.fields != null) {
      params = params.append('Fields', this.optionsCreditMovement.fields);
    }
    this.creditMovementsService
      .getUniqueCreditMovements
      (creditMovementId,
        params,
        this.optionsCreditMovement.auxMediaTypeAccept)
      .subscribe((result: HttpResponse<any>) => {
        if (!result) {
          return;
        }
        if (result.status == 200) {
          this.depositDto = result.body;
          this.openModal(content, null, null);
          //  this.openModal(content, this.depositDto, 'edit deposit');
        }

      });
  }

  public getCreditReasonDeposit(entity: CreditMovementDto): string {
    if (entity.creditReason != null) {
      return entity.creditReason.reason;
    } else {
      return 'Deposit'
    }

  }


  convertirDepositRef(nRef: string): { tipo: string; detalle: string; } {
    var option;
    option = nRef.replace("{'", '{"');
    option = option.replace("':'", '":"');
    option = option.replace("'}", '"}');
    option = JSON.parse(option)

    return option;
  }


  openModal(content, entity: any, button: string) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(
            reason,
            entity,
            button
          )}`;
        }
      );
  }

  onEditDeposit(depositId: string, clientId: string) {
    this.modalService.dismissAll();
    this.router.navigate([
      '/deposits/update-deposit/' + depositId + '/' + clientId,
    ]);
  }

}





export class ResourceModal {
  constructor() { }

  renderValue: string = 'Details';
  step: string = 'btn btn-success';
  type: string;
  idReference: string;
  clientId: string;
  entity: any;
  styl: string;
}
