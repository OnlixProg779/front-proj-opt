import { DatePipe } from '@angular/common';
import { HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreditMovementDto } from 'src/app/components/menus/models/credit-movement-dto';
import { OptionsCreditMovement } from 'src/app/components/menus/models/options-credit-movement';
import { CreditMovementsService } from 'src/app/components/menus/services/credit-movements.service';
import { environment } from 'src/environments/environment';
import { ButtonViewComponent } from '../button-view/button-view.component';
import { MultiSelComponent, ResourceMultiSel } from '../multi-sel/multi-sel.component';
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
    private modalService: NgbModal,
    ) {
    console.log(this.columnSelect);
   

  }

  ngOnInit(): void {
  
      this.initSettingsCreditMovementsImported();
    
    
    this.optionsCreditMovement.auxMediaTypeAccept = environment.mediaTypes.creditMovement.get.accept.getAllJson;
    // this.optionsCreditMovement.orderBy = 'date desc'
    this.optionsCreditMovement.active = true;


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
      mode: 'inline',

      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      pager: {
        display: true,
        perPage: this.optionsCreditMovement.showPerPage,
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

        value: {
          title: 'value',
          filter: false,
        },

        verifiedType: {
          title: 'verifiedType',
          filter: false,
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






public closeResult: string;
@ViewChild('content', {static: false}) contenidoDelModal;

private openModal(content, entity: any, button: string) {
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
}
