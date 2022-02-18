import { DatePipe } from '@angular/common';
import { HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreditMovementDto } from 'src/app/components/menus/models/credit-movement-dto';
import { OptionsCreditMovement } from 'src/app/components/menus/models/options-credit-movement';
import { CreditMovementsService } from 'src/app/components/menus/services/credit-movements.service';
import { environment } from 'src/environments/environment';
import { ButtonViewComponent } from '../button-view/button-view.component';
import { MultiSelComponent, ResourceMultiSel, SentActionPatchDeposit } from '../multi-sel/multi-sel.component';
import { CheckBoxViewComponent } from '../utils/check-box-view/check-box-view.component';

@Component({
  selector: 'app-list-imported-credit-movements',
  templateUrl: './list-imported-credit-movements.component.html',
  styleUrls: ['./list-imported-credit-movements.component.scss']
})
export class ListImportedCreditMovementsComponent implements OnInit {

  @Input()
  bankAccountId: string = null;

  @Input()
  columnSelect: string;

  @ViewChild('content', {static: false}) contenidoDelModal;

  // @Output()
  // patchVerified: EventEmitter<SentActionPatchDeposit> = new EventEmitter<SentActionPatchDeposit>();
  
  @Output()
  submitCMISelected: EventEmitter<CreditMovementDto> = new EventEmitter<CreditMovementDto>();

  filterAll: boolean = false;
  stringActive: string = 'Active (Yes)';

  @Input()
  stringVerified: string = 'Verified (All)';
  // filterActive: boolean = false;
  @Input()
  showVerified: boolean = null;

  public optionsCreditMovement: OptionsCreditMovement = new OptionsCreditMovement();


  constructor(private creditMovementsService: CreditMovementsService,  
    private router: Router,  
    private modalService: NgbModal,
    ) {
    console.log(this.columnSelect);
   

  }

  ngOnInit(): void {
  
      this.initSettingsCreditMovementsImported();
    
    
    this.optionsCreditMovement.auxMediaTypeAccept = environment.mediaTypes.creditMovement.get.accept.getAllJson;
    // this.optionsCreditMovement.orderBy = 'date desc'
    // this.optionsCreditMovement.active = true;


      this.initDataCreditMovements();

    this.initOnChagedData();

  }
  initOnChagedData() {
    this.optionsCreditMovement.source.onChanged().subscribe((change) => {
      if (change.action === 'page') {
        this.pageChangeCreditMovements(change.paging.page);
      }
    });
  }
ngOnChanges(changes: SimpleChanges): void {
 console.log(changes);
 if(!changes.bankAccountId.firstChange){
  if(changes.bankAccountId.previousValue != changes.bankAccountId.currentValue){
 
      this.initSettingsCreditMovementsImported();
    

    this.initDataCreditMovements();
   }
 }

}
  initSettingsCreditMovementsImported() {
    this.optionsCreditMovement.settings = {
      mode: 'external',
      pager: {
        display: true,
        perPage: this.optionsCreditMovement.showPerPage,
      },
      actions: {
        add: false,
        edit: true,
        delete: true,
        position: 'right'
      },
      columns: {
        depositDate: {
          title: 'depositDate',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (value, row, cell) => {
            // DATA FROM HERE GOES TO renderComponent
            //return "this.roles";
            var sentData = {
              renderValue: "",
              step: "",
              styl: "",
            }
            if (row.active > 0) {
              sentData.renderValue = new DatePipe('en-US').transform(value, 'd/MMM/yyyy');
              sentData.step = 'btn btn-outline';
              sentData.styl = 'line-height: 1;text-align: center;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 90%;cursor: auto;';
            } else {
              sentData.renderValue = new DatePipe('en-US').transform(value, 'd/MMM/yyyy');
              sentData.step = 'btn btn-outline';
              sentData.styl = 'background-color: red;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
            }
            return JSON.stringify(sentData);
          },
          renderComponent: ButtonViewComponent,
        },
        registerDate: {
          title: 'registerDate',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (value, row, cell) => {
            // DATA FROM HERE GOES TO renderComponent
            //return "this.roles";
            var sentData = {
              renderValue: "",
              step: "",
              styl: "",
            }
            if (row.active > 0) {
              sentData.renderValue = new DatePipe('en-US').transform(value, 'd/MMM/yyyy');
              sentData.step = 'btn btn-outline';
              sentData.styl = 'line-height: 1;text-align: center;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 90%;cursor: auto;';
            } else {
              sentData.renderValue = new DatePipe('en-US').transform(value, 'd/MMM/yyyy');
              sentData.step = 'btn btn-outline';
              sentData.styl = 'background-color: red;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
            }
            return JSON.stringify(sentData);
          },
          renderComponent: ButtonViewComponent,
        },

        document: {
          title: 'document',
          filter: false,
        },
        comment: {
          title: 'comment',
          filter: false,
        },

        value: {
          title: 'value',
          filter: false,
        },

        creditMovementStatus: {
          title: 'creditMovementStatus',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (value, row, cell) => {
            // DATA FROM HERE GOES TO renderComponent
            //return "this.roles";
            var sentData = {
              renderValue: "",
              step: "",
              styl: "",
            }
            if (!row.active) {
              sentData.renderValue = value.status;
              sentData.step = 'btn btn-outline';
              sentData.styl = 'background-color: red;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
            } else if (row.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.encontrado) {

              sentData.renderValue = value.status;
              sentData.step = 'bg-success btn btn-outline';
              sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';

            } else if (row.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.porVerificar) {

              sentData.renderValue = value.status;
              sentData.step = 'btn btn-outline bg-danger';
              sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';

            }
            else if (row.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.noEncontrado) {
              sentData.renderValue = value.status;
              sentData.step = 'btn btn-outline bg-dark';
              sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';

            } else { // ninguna de las otras 3 opciones

              sentData.renderValue = value.status;
              sentData.step = 'btn btn-outline bg-info';
              sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';

            }
            return JSON.stringify(sentData);
          },
          renderComponent: ButtonViewComponent,
        },
        multiple: {
          title: 'Buttons',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (value, row, cell) => {
            var sentData: ResourceMultiSel = new ResourceMultiSel();
            sentData.action = [];
            sentData.styl = [];
            sentData.stepClass = [];

            if (!row.active) {

              sentData.action.push('RESTORE');
              sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');
              sentData.stepClass.push('bg-info btn btn-outline');
            }
            else if (row.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.encontrado) {
              sentData.action.push('UNVERIFIED');
              sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');
              sentData.stepClass.push('btn btn-outline bg-danger');

            } else if (row.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.porVerificar) {
              sentData.action.push('VERIFIED');
              sentData.action.push('NOT FOUND');

              sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');
              sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');

              sentData.stepClass.push('bg-success btn btn-outline');
              sentData.stepClass.push('btn btn-outline bg-dark');

            }
            else if (row.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.noEncontrado) {
              sentData.action.push('UNVERIFIED (NF)');
              sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');
              sentData.stepClass.push('btn btn-outline bg-danger');

            }

            return sentData;
          },
          renderComponent: MultiSelComponent,
          onComponentInitFunction: (instance) => {
            instance.save.subscribe((item) => {
              console.log(item)
              this.onVerified(item,this.contenidoDelModal);
              // this.patchVerified.emit(item);

            });
          },
        },
        active: {
          title: 'Status',
          filter: false,
          type: 'custom',
          editable: false,
          valuePrepareFunction: (value, row, cell) => {
            var sentData = {
              renderValue: "",
              step: "",
              styl: "",
            }
            if (row.active) {
              sentData.renderValue = "";
              sentData.step = 'btn btn-outline';
              sentData.styl = 'background-color: #81ba00;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 1rem;padding: 0.4em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
            } else {
              sentData.renderValue = "";
              sentData.step = 'btn btn-outline';
              sentData.styl = 'background-color: red;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 1rem;padding: 0.4em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
            }
            return JSON.stringify(sentData);
          },
          renderComponent: ButtonViewComponent,
        },
      },
    };
  }




  onDelete(entity: any, content) {
    this.modalUp.actionModal = 'DELETE';
    console.log(entity)
    var aux = entity.data;
    if (aux.active) {
      if (this.canDelete(aux)) {
        this.modalUp.titleButton = 'DELETE';
        this.modalUp.title = 'WARNING';
      } else {
        this.modalUp.status = 'already verified';
        this.modalUp.title = 'Not possible';
        this.modalUp.titleButton = '';
      }
    } else {
      this.modalUp.status = 'been removed before.!';
      this.modalUp.title = 'Not possible';
      this.modalUp.titleButton = '';
    }


    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(
            reason,
            aux,
            this.modalUp.actionModal
          )}`;
        }
      );
  }


public closeResult: string;

// private openModal(content, entity: any, button: string) {
//   this.modalService
//     .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
//     .result.then(
//       (result) => {
//         this.closeResult = `Closed with: ${result}`;
//       },
//       (reason) => {
//         this.closeResult = `Dismissed ${this.getDismissReason(
//           reason,
//           entity,
//           button
//         )}`;
//       }
//     );
// }

private getDismissReason(
  reason: any,
  entity: CreditMovementDto,
  button: string
): string {
  // console.log(reason);
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else if (reason == 'accept' && button == 'DELETE') {
    this.deleteOrRestoreDeposit(entity);
  } else if (reason == 'accept' && button == 'VERIFI') {

    this.verifiedDeposit(entity);
  } else if (reason == 'accept' && button == 'RESTORE') {
    this.deleteOrRestoreDeposit(entity);
  } else if (reason == 'accept' && button == 'NOT FOUND') {
    this.notFoundDeposit(entity);
  } else if (reason == 'accept' && button == 'TO BE VERIFIED') {
    this.unverifiedDeposit(entity);
  } else {
    // this.showMsgNoMatchValues = false;
    // this.showTableCreditMovementImported = true;
    // this.showCreditMovementImport = false;
    return `with: ${reason}`;

  }
}


onEdit(entity: any, content) {
  console.log(entity)
  var aux = entity.data;

  if (aux.active) {
    if (
      aux.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.porVerificar) {
      this.router.navigate([
        '/deposits/update-deposit/' + aux.creditMovementsId + '/' + aux.bankAccount.bankAccountId,
      ]);
    } else {
      this.modalUp.actionModal = 'MODIFY';
      this.modalUp.status = 'already verified';
      this.modalUp.title = 'Not possible';
      this.modalUp.titleButton = '';
      this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(
          (result) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(
              reason,
              null,
              null
            )}`;
          }
        );
    }
  } else {
    this.modalUp.actionModal = 'MODIFY';
    this.modalUp.status = 'Deleted.!';
    this.modalUp.title = 'Not possible';
    this.modalUp.titleButton = '';
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(
            reason,
            null,
            null
          )}`;
        }
      );
  }

}

private deleteOrRestoreDeposit(entity: CreditMovementDto) {
  var act: string = null;
  if (entity.active == true) {
    act = 'delete';
  } else {
    act = 'restore';
  }
  var vendor: string = act + " by: " + localStorage.getItem('nombre_sing_in');

  let params = new HttpParams();
  params = params.append('act', act);
  params = params.append('vendor', vendor);

  this.creditMovementsService.putDeleteOrRestoreCreditMovement(entity.bankAccount.bankAccountId
    , entity.creditMovementsId
    , params
    , environment.mediaTypes.creditMovement.putDelete.ContentType.putJson)
    .subscribe((result: HttpResponse<any>) => {
      if (result.status == 200) {
        this.localDataSourceEditRow(entity, vendor, act.toUpperCase());
      }
    }, (err: HttpErrorResponse) => {
      console.warn(err);
      // event.confirm.reject();
    });

}

private verifiedDeposit(entity: CreditMovementDto) {
  var vendor: string = "Verify by: " + localStorage.getItem('nombre_sing_in');
  var toPatch = [];
  entity.creditMovementStatus.creditMovementStatusId = environment.tuplas.creditMovementStatus.encontrado;


    // toPatch.push({
    //   path: '/verifiedType',
    //   op: 'replace',
    //   value: vendor,
    // })
    // toPatch.push(
    //   {
    //     path: '/creditMovementsImportedId',
    //     op: 'replace',
    //     value: entity.creditMovementsImported.creditMovementsImportedId,
    //   }
    // )
    toPatch.push(
      {
        path: '/creditMovementStatusId',
        op: 'replace',
        value: entity.creditMovementStatus.creditMovementStatusId,
      }
    )

    this.creditMovementsService.patchCreditMovement(
      entity.bankAccount.bankAccountId,
      entity.creditMovementsId,
      toPatch,
      environment.mediaTypes.creditMovement.patch.ContentType.patchJson)
      .subscribe((result: HttpResponse<any>) => {
        console.log(result)
        if (result.status == 201) {
          console.log("entro aqi")
          this.localDataSourceEditRow(entity, vendor, "VERIFI");
          
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });


}

private unverifiedDeposit(entity: CreditMovementDto) {
  var vendor: string = "Unverified by: " + localStorage.getItem('nombre_sing_in');
  var toPatch = [];
  entity.creditMovementStatus.creditMovementStatusId = environment.tuplas.creditMovementStatus.porVerificar;
  // entity.creditMovementsImported = null;
  // toPatch.push({
  //   path: '/verifiedType',
  //   op: 'replace',
  //   value: vendor,
  // })
  // toPatch.push(
  //   {
  //     path: '/creditMovementsImportedId',
  //     op: 'replace',
  //     value: null,
  //   }
  // )
  toPatch.push(
    {
      path: '/creditMovementStatusId',
      op: 'replace',
      value: entity.creditMovementStatus.creditMovementStatusId,
    }
  )

  this.creditMovementsService.patchCreditMovement(
    entity.bankAccount.bankAccountId,
    entity.creditMovementsId,
    toPatch,
    environment.mediaTypes.creditMovement.patch.ContentType.patchJson)
    .subscribe((result: HttpResponse<any>) => {
      console.log(result)
      if (result.status == 201) {
        console.log("entro aqi")
        this.localDataSourceEditRow(entity, vendor, "TO BE VERIFIED");
      }
    }, (err: HttpErrorResponse) => {
      console.warn(err);
    });


}

private notFoundDeposit(entity: CreditMovementDto) {
  var vendor: string = "Not found by: " + localStorage.getItem('nombre_sing_in');
  var toPatch = [];
  entity.creditMovementStatus.creditMovementStatusId = environment.tuplas.creditMovementStatus.noEncontrado;
  // toPatch.push({
  //   path: '/verifiedType',
  //   op: 'replace',
  //   value: vendor,
  // })

  toPatch.push(
    {
      path: '/creditMovementStatusId',
      op: 'replace',
      value: entity.creditMovementStatus.creditMovementStatusId,
    }
  )

  this.creditMovementsService.patchCreditMovement(
    entity.bankAccount.bankAccountId,
    entity.creditMovementsId,
    toPatch,
    environment.mediaTypes.creditMovement.patch.ContentType.patchJson)
    .subscribe((result: HttpResponse<any>) => {
      console.log(result)
      if (result.status == 201) {
        console.log("entro aqi")
        this.localDataSourceEditRow(entity, vendor, "NOT FOUND");
      }
    }, (err: HttpErrorResponse) => {
      console.warn(err);
    });


}

localDataSourceEditRow(entity: CreditMovementDto, vendor: string, action: string) {

  this.optionsCreditMovement.source.getAll().then((x: []) => {
    var aux: CreditMovementDto = x.find((element: CreditMovementDto) => element.creditMovementsId == entity.creditMovementsId);
    if (action == "DELETE") {
      aux.active = false;
      // aux.verifiedType = vendor;
      this.optionsCreditMovement.source.load(x);
    }
    if (action == "RESTORE") {
      aux.active = true;
      // aux.verifiedType = vendor;
      this.optionsCreditMovement.source.load(x);
    }
    if (action == "VERIFI") {
      // aux.creditMovementsImported.creditMovementsImportedId = entity.creditMovementsImported.creditMovementsImportedId;
      aux.creditMovementStatus.creditMovementStatusId = entity.creditMovementStatus.creditMovementStatusId;
      // aux.verifiedType = vendor;
      this.optionsCreditMovement.source.load(x);
    }
    if (action == "NOT FOUND") {
      aux.creditMovementStatus.creditMovementStatusId = entity.creditMovementStatus.creditMovementStatusId;
      // aux.verifiedType = vendor;
      this.optionsCreditMovement.source.load(x);
    }

    if (action == "TO BE VERIFIED") {
      // aux.creditMovementsImported = entity.creditMovementsImported;
      aux.creditMovementStatus.creditMovementStatusId = entity.creditMovementStatus.creditMovementStatusId;
      // aux.verifiedType = vendor;
      this.optionsCreditMovement.source.load(x);
    }

  });

}

  initDataCreditMovements() {
    let params = new HttpParams();
    if (this.optionsCreditMovement.searchQuery != null) {
      params = params.append('SearchQuery', this.optionsCreditMovement.searchQuery);
    }
    if (this.optionsCreditMovement.depositDate != null) {
      params = params.append('depositDate', this.optionsCreditMovement.depositDate.toString());
    }

    if (this.optionsCreditMovement.value != null) {
      params = params.append('Value', this.optionsCreditMovement.value);
    }

    if (this.optionsCreditMovement.document != null) {
      params = params.append('Document', this.optionsCreditMovement.document);
    }

    if (this.optionsCreditMovement.creditReasonId != null) {
      params = params.append('creditReasonId', this.optionsCreditMovement.creditReasonId);
    }

    if (this.optionsCreditMovement.creditMovementStatusId != null) {
      params = params.append('creditMovementStatusId', this.optionsCreditMovement.creditMovementStatusId);
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
    this.creditMovementsService
      .getBankAccountCreditMovements(this.bankAccountId, params, this.optionsCreditMovement.auxMediaTypeAccept)
      .subscribe((result: HttpResponse<any>) => {
        if (!result) {
          return;
        }
        if (result.status == 200) {
          if (this.optionsCreditMovement.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
            this.optionsCreditMovement.source.load(result.body.value);
            this.optionsCreditMovement.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsCreditMovement.totalCount = this.optionsCreditMovement.totalCount['totalCount'];
          } else {
            this.optionsCreditMovement.source.load(result.body);
            this.optionsCreditMovement.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsCreditMovement.totalCount = this.optionsCreditMovement.totalCount['totalCount'];
          }
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });
  }

  pageChangeCreditMovements(pageIndex: any) {
    var getNew = pageIndex * this.optionsCreditMovement.showPerPage;
    if (getNew >= this.optionsCreditMovement.source.count() && getNew < this.optionsCreditMovement.totalCount) {
      this.optionsCreditMovement.currentPage = this.optionsCreditMovement.currentPage + 1;

      let params = new HttpParams();
      if (this.optionsCreditMovement.searchQuery != null) {
        params = params.append('SearchQuery', this.optionsCreditMovement.searchQuery);
      }
      if (this.optionsCreditMovement.depositDate != null) {
        params = params.append('depositDate', this.optionsCreditMovement.depositDate.toString());
      }
  
      if (this.optionsCreditMovement.value != null) {
        params = params.append('Value', this.optionsCreditMovement.value);
      }
  
      if (this.optionsCreditMovement.document != null) {
        params = params.append('Document', this.optionsCreditMovement.document);
      }
  
      if (this.optionsCreditMovement.creditReasonId != null) {
        params = params.append('creditReasonId', this.optionsCreditMovement.creditReasonId);
      }
  
      if (this.optionsCreditMovement.creditMovementStatusId != null) {
        params = params.append('creditMovementStatusId', this.optionsCreditMovement.creditMovementStatusId);
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
      this.creditMovementsService
        .getBankAccountCreditMovements(this.bankAccountId, params, this.optionsCreditMovement.auxMediaTypeAccept)
        .subscribe((result: HttpResponse<any>) => {
          if (!result) {
            return;
          }
          if (result.status == 200) {
            if (this.optionsCreditMovement.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
              result.body.value.forEach((element) => {
                this.optionsCreditMovement.source.add(element);
              });
            } else {
              result.body.forEach((element) => {
                this.optionsCreditMovement.source.add(element);
              });
            }
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
        });
    }
  }

  clickAll(){
    if(this.filterAll == false){
      this.filterAll = true;
      this.optionsCreditMovement.active = null; 
      this.stringActive = 'Active (All)';
      this.stringVerified = 'Verified (All)';
    }
    
  }


  clickActive(){
    this.filterAll = false;
    this.optionsCreditMovement.active = !this.optionsCreditMovement.active
    if(this.optionsCreditMovement.active){
      this.stringActive = 'Active (YES)';

    }else{
      this.stringActive = 'Active (No)';
    }
  }
  public modalUp = {
    status: '',
    actionModal: '',
    title: '',
    titleButton: '',
  };

  onVerified(item: SentActionPatchDeposit, content) {
    // console.log(item)
    if (item.option == 'VERIFIED') {
      console.log(" Se puede verificar ?");
      if (this.canVerifiOrNotFund(item.entity)) {
        console.log(" Si se puede verificar.!");

        var ids: string[] = [];
        ids.push(item.entity.creditMovementsId);

            console.log(" No se puede verificar automaticamente, abriremos el menú manual");

            // this.creditMovementToVerifi = item.entity;
            // console.log(this.creditMovementToVerifi.bankAccount.bankAccountId);
            this.modalUp.status = '';
            this.modalUp.actionModal = 'VERIFI';
            this.modalUp.title = 'VERIFI';
            this.modalUp.titleButton = 'VERIFI';
         
      } else {
        this.modalUp.status = '';
        this.modalUp.title = 'Not possible';
        this.modalUp.titleButton = '';
      }

    } else if (item.option == 'UNVERIFIED') {
      if (this.canUnverified(item.entity)) {
        this.modalUp.status = '';
        this.modalUp.actionModal = 'TO BE VERIFIED';
        this.modalUp.title = 'TO BE VERIFIED';
        this.modalUp.titleButton = 'TO BE VERIFIED';
      } else {
        this.modalUp.status = '';
        this.modalUp.title = 'Not possible';
        this.modalUp.titleButton = '';
      }

    } else if (item.option == 'NOT FOUND') {
      if (this.canVerifiOrNotFund(item.entity)) {
        this.modalUp.status = '';
        this.modalUp.actionModal = 'NOT FOUND';
        this.modalUp.title = 'NOT FOUND';
        this.modalUp.titleButton = 'NOT FOUND';
      } else {
        this.modalUp.status = '';
        this.modalUp.title = 'Not possible';
        this.modalUp.titleButton = '';
      }

    } else if (item.option == 'UNVERIFIED (NF)') {
      if (this.canUnverifiedNF(item.entity)) {
        this.modalUp.status = '';
        this.modalUp.actionModal = 'TO BE VERIFIED';
        this.modalUp.title = 'TO BE VERIFIED';
        this.modalUp.titleButton = 'TO BE VERIFIED';
      } else {
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
      } else {
        this.modalUp.status = '';
        this.modalUp.title = 'Not possible';
        this.modalUp.titleButton = '';
      }
    }


    
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(
            reason,
            item.entity,
            this.modalUp.actionModal
          )}`;
        }
      );
  }

  private canVerifiOrNotFund(entity: CreditMovementDto): boolean {
    if (entity.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.porVerificar) {
      return true;
    }
    return false;
  }

  private canUnverified(entity: CreditMovementDto): boolean {
    // console.log(entity);
    if (entity.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.encontrado) {
      return true
    }
    return false;
  }
  private canUnverifiedNF(entity: CreditMovementDto): boolean {
    // console.log(entity);
    if (entity.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.noEncontrado) {
      return true
    }
    return false;
  }
  private canRestore(entity: CreditMovementDto): boolean {
    if (entity.active == false && entity.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.porVerificar) {
      return true;
    }
    return false;
  }

  private canDelete(entity: CreditMovementDto): boolean {
    if (entity.active == true && entity.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.porVerificar) {
      return true;
    }
    return false;
  }

}
