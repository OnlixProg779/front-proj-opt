import { DatePipe } from '@angular/common';
import { HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreditMovementDto } from 'src/app/components/menus/models/credit-movement-dto';
import { CreditMovementsImportedDto } from 'src/app/components/menus/models/CreditMovementImported/credit-movements-imported-dto';
import { OptionsCreditMovementsImported } from 'src/app/components/menus/models/CreditMovementImported/options-credit-movements-imported';
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
  submitCMISelected: EventEmitter<CreditMovementsImportedDto> = new EventEmitter<CreditMovementsImportedDto>();

  filterAll: boolean = false;
  stringActive: string = 'Active (Yes)';

  @Input()
  stringVerified: string = 'Verified (All)';
  // filterActive: boolean = false;
  @Input()
  showVerified: boolean = null;

  public optionsCreditMovementsImported: OptionsCreditMovementsImported = new OptionsCreditMovementsImported();


  constructor(private creditMovementsService: CreditMovementsService,    
    private modalService: NgbModal,
    ) {
    console.log(this.columnSelect);
   

  }

  ngOnInit(): void {
    if(this.columnSelect == 'YES'){
      this.initSettingsCreditMovementsImportedSelect();
    }else{
      this.initSettingsCreditMovementsImported();
    }
    
    this.optionsCreditMovementsImported.auxMediaTypeAccept = environment.mediaTypes.creditMovementImported.get.accept.getAllJson;
    this.optionsCreditMovementsImported.orderBy = 'date desc'
    this.optionsCreditMovementsImported.active = true;

    if(this.showVerified != null){
      this.optionsCreditMovementsImported.verified = this.showVerified;
    }

      this.initDataCreditMovementsImported();

    this.initOnChagedData();

  }
  initOnChagedData() {
    this.optionsCreditMovementsImported.source.onChanged().subscribe((change) => {
      if (change.action === 'page') {
        this.pageChangeCreditMovementsImported(change.paging.page);
      }
    });
  }
ngOnChanges(changes: SimpleChanges): void {
 console.log(changes);
 if(!changes.bankAccountId.firstChange){
  if(changes.bankAccountId.previousValue != changes.bankAccountId.currentValue){
    if(this.columnSelect == 'YES'){
      this.initSettingsCreditMovementsImportedSelect();
    }else{
      this.initSettingsCreditMovementsImported();
    }

    this.initDataCreditMovementsImported();
   }
 }

}
  initSettingsCreditMovementsImported() {
    this.optionsCreditMovementsImported.settings = {
      mode: 'inline',

      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      pager: {
        display: true,
        perPage: this.optionsCreditMovementsImported.showPerPage,
      },
      columns: {
        date: {
          title: 'date',
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
        office: {
          title: 'office',
          filter: false,
        },
        document: {
          title: 'document',
          filter: false,
        },
        description: {
          title: 'description',
          filter: false,
        },
        value: {
          title: 'value',
          filter: false,
        },
        verified: {
          title: 'verified',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (value, row, cell) => {
            var sentData: ResourceMultiSel = new ResourceMultiSel();
            sentData.action = [];
            sentData.styl = [];
            sentData.stepClass = [];

            if(value){
              sentData.action.push('VIEW');
              sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');
              sentData.stepClass.push('bg-secondary btn btn-outline-secondary-2x');  
            }else{
              sentData.action.push('NONE');
              sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;cursor: pointer;');
              sentData.stepClass.push('btn btn-outline');
            }
            return sentData;
          },
          renderComponent: MultiSelComponent,
          onComponentInitFunction: (instance) => {
            instance.save.subscribe((item) => {
              // console.log(item)     
              this.viewModalCreditMovementVerified(item);         
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

  public creditMovementsImported: CreditMovementsImportedDto = null;
  public creditMovementVerified: CreditMovementDto = null;
  public optionsCreditMovement: OptionsCreditMovement = new OptionsCreditMovement();

  viewModalCreditMovementVerified(item: any) {
    this.creditMovementsImported = item.entity;

    // console.log(item.entity);
if(this.creditMovementsImported != null){
  this.optionsCreditMovement.auxMediaTypeAccept = environment.mediaTypes.creditMovement.getUnique.accept.getJson;
  this.optionsCreditMovement.creditMovementsImportedId = this.creditMovementsImported.creditMovementsImportedId;

  let params = new HttpParams();

  if (this.optionsCreditMovement.creditMovementsImportedId != null) {
    params = params.append('CreditMovementsImportedId', this.optionsCreditMovement.creditMovementsImportedId);
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
    .getAllCreditMovements(params, this.optionsCreditMovement.auxMediaTypeAccept)
    .subscribe((result: HttpResponse<any>) => {
      if (!result) {
        return;
      }
      if (result.status == 200) {
        if (this.optionsCreditMovement.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
          if(result.body.value.length == 1){
            this.creditMovementVerified = result.body.value[0];
            this.optionsCreditMovement.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsCreditMovement.totalCount = this.optionsCreditMovement.totalCount['totalCount'];
            this.openModal(this.contenidoDelModal,null,null);

          }else{
            console.warn("Hay un arror, esta consulta a devuelto mas de un resultado")
          }
     } else {
// console.log(result.body);
      if(result.body.length == 1){
        this.creditMovementVerified = result.body[0];
        this.optionsCreditMovement.totalCount = JSON.parse(result.headers.get('X-Pagination'));
        this.optionsCreditMovement.totalCount = this.optionsCreditMovement.totalCount['totalCount'];
        this.openModal(this.contenidoDelModal,null,null);

      }else{
        console.warn("Hay un arror, esta consulta a devuelto mas de un resultado")
      }
    }
      }
    }, (err: HttpErrorResponse) => {
      console.warn(err);
    });
}
 
}


public closeResult: string;
@ViewChild('content', {static: false}) contenidoDelModal;

public openModal(content, entity: any, button: string) {
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

  initSettingsCreditMovementsImportedSelect() {
    console.log("Entro aqui")
    this.optionsCreditMovementsImported.settings = {
      mode: 'inline',

      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      pager: {
        display: true,
        perPage: this.optionsCreditMovementsImported.showPerPage,
      },
      columns: {
        Button: {
          title: 'Select',
          type: 'custom',
          valuePrepareFunction: (value, row, cell) => {
            // return `<a title="See Detail Product "href="Your api key or something/${row.Id}"> <i class="ion-edit"></i></a>`
            return "row"
          },
          filter: false,
          renderComponent: CheckBoxViewComponent,
          onComponentInitFunction: (instance) => {
            instance.eventEmit.subscribe((event) => {
              if (event) {
                this.submitCMISelected.emit(instance.rowData);
              } else {
                this.submitCMISelected.emit(null);
  
              }
            });
          },
        },
        date: {
          title: 'date',
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
        office: {
          title: 'office',
          filter: false,
        },
        document: {
          title: 'document',
          filter: false,
        },
        description: {
          title: 'description',
          filter: false,
        },
        value: {
          title: 'value',
          filter: false,
        },
        verified: {
          title: 'verified',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (value, row, cell) => {
            var sentData: ResourceMultiSel = new ResourceMultiSel();
            sentData.action = [];
            sentData.styl = [];
            sentData.stepClass = [];

            if(value){
              sentData.action.push('VIEW');
              sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');
              sentData.stepClass.push('bg-secondary btn btn-outline-secondary-2x');  
            }else{
              sentData.action.push('NONE');
              sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;cursor: pointer;');
              sentData.stepClass.push('btn btn-outline');
            }
            return sentData;
          },
          renderComponent: MultiSelComponent,
          onComponentInitFunction: (instance) => {
            instance.save.subscribe((item) => {
              this.viewModalCreditMovementVerified(item);         
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

  initDataCreditMovementsImported() {
    let params = new HttpParams();
    if (this.optionsCreditMovementsImported.searchQuery != null) {
      params = params.append('SearchQuery', this.optionsCreditMovementsImported.searchQuery);
    }
    if (this.optionsCreditMovementsImported.date != null) {
      params = params.append('Date', this.optionsCreditMovementsImported.date.toString());
    }
    if (this.optionsCreditMovementsImported.office != null) {
      params = params.append('Office', this.optionsCreditMovementsImported.office);
    }
    if (this.optionsCreditMovementsImported.description != null) {
      params = params.append('Description', this.optionsCreditMovementsImported.description);
    }
    if (this.optionsCreditMovementsImported.value != null) {
      params = params.append('Value', this.optionsCreditMovementsImported.value);
    }
    if (this.optionsCreditMovementsImported.verified != null) {
      params = params.append('Verified', this.optionsCreditMovementsImported.verified);
    }
    if (this.optionsCreditMovementsImported.document != null) {
      params = params.append('Document', this.optionsCreditMovementsImported.document);
    }
    // if (this.optionsCreditMovementsImported.bankIdReference != null) {
    //   params = params.append('BankIdReference', this.optionsCreditMovementsImported.bankIdReference);
    // }
    if (this.optionsCreditMovementsImported.active != null) {
      params = params.append('Active', this.optionsCreditMovementsImported.active);
    }
    if (this.optionsCreditMovementsImported.orderBy != null) {
      params = params.append('OrderBy', this.optionsCreditMovementsImported.orderBy);
    }
    if (this.optionsCreditMovementsImported.fields != null) {
      params = params.append('Fields', this.optionsCreditMovementsImported.fields);
    }
    params = params.append('PageNumber', this.optionsCreditMovementsImported.currentPage.toString());
    params = params.append('PageSize', this.optionsCreditMovementsImported.pageSize.toString());
    this.creditMovementsService
      .getAllCreditMovementsImported(this.bankAccountId, params, this.optionsCreditMovementsImported.auxMediaTypeAccept)
      .subscribe((result: HttpResponse<any>) => {
        if (!result) {
          return;
        }
        if (result.status == 200) {
          if (this.optionsCreditMovementsImported.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
            this.optionsCreditMovementsImported.source.load(result.body.value);
            this.optionsCreditMovementsImported.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsCreditMovementsImported.totalCount = this.optionsCreditMovementsImported.totalCount['totalCount'];
          } else {
            this.optionsCreditMovementsImported.source.load(result.body);
            this.optionsCreditMovementsImported.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsCreditMovementsImported.totalCount = this.optionsCreditMovementsImported.totalCount['totalCount'];
          }
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });
  }

  pageChangeCreditMovementsImported(pageIndex: any) {
    var getNew = pageIndex * this.optionsCreditMovementsImported.showPerPage;
    if (getNew >= this.optionsCreditMovementsImported.source.count() && getNew < this.optionsCreditMovementsImported.totalCount) {
      this.optionsCreditMovementsImported.currentPage = this.optionsCreditMovementsImported.currentPage + 1;

      let params = new HttpParams();
      if (this.optionsCreditMovementsImported.searchQuery != null) {
        params = params.append('SearchQuery', this.optionsCreditMovementsImported.searchQuery);
      }

      if (this.optionsCreditMovementsImported.date != null) {
        params = params.append('Date', this.optionsCreditMovementsImported.date.toString());
      }
      if (this.optionsCreditMovementsImported.office != null) {
        params = params.append('Office', this.optionsCreditMovementsImported.office);
      }
      if (this.optionsCreditMovementsImported.description != null) {
        params = params.append('Description', this.optionsCreditMovementsImported.description);
      }
      if (this.optionsCreditMovementsImported.value != null) {
        params = params.append('Value', this.optionsCreditMovementsImported.value);
      }
      if (this.optionsCreditMovementsImported.verified != null) {
        params = params.append('Verified', this.optionsCreditMovementsImported.verified);
      }
      if (this.optionsCreditMovementsImported.document != null) {
        params = params.append('Document', this.optionsCreditMovementsImported.document);
      }
      if (this.optionsCreditMovementsImported.bankIdReference != null) {
        params = params.append('BankIdReference', this.optionsCreditMovementsImported.bankIdReference);
      }

      if (this.optionsCreditMovementsImported.active != null) {
        params = params.append('Active', this.optionsCreditMovementsImported.active);
      }
      if (this.optionsCreditMovementsImported.orderBy != null) {
        params = params.append('OrderBy', this.optionsCreditMovementsImported.orderBy);
      }
      if (this.optionsCreditMovementsImported.fields != null) {
        params = params.append('Fields', this.optionsCreditMovementsImported.fields);
      }
      params = params.append('PageNumber', this.optionsCreditMovementsImported.currentPage.toString());
      params = params.append('PageSize', this.optionsCreditMovementsImported.pageSize.toString());
      this.creditMovementsService
        .getAllCreditMovementsImported(this.bankAccountId, params, this.optionsCreditMovementsImported.auxMediaTypeAccept)
        .subscribe((result: HttpResponse<any>) => {
          if (!result) {
            return;
          }
          if (result.status == 200) {
            if (this.optionsCreditMovementsImported.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
              result.body.value.forEach((element) => {
                this.optionsCreditMovementsImported.source.add(element);
              });
            } else {
              result.body.forEach((element) => {
                this.optionsCreditMovementsImported.source.add(element);
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
      this.optionsCreditMovementsImported.active = null; 
      this.optionsCreditMovementsImported.verified = null ;
      this.stringActive = 'Active (All)';
      this.stringVerified = 'Verified (All)';
    }
    
  }

  clickVerifie(){
    this.filterAll = false;
    this.optionsCreditMovementsImported.verified = !this.optionsCreditMovementsImported.verified
    if(this.optionsCreditMovementsImported.verified){
      this.stringVerified = 'Verified (Yes)';
    }else{
      this.stringVerified = 'Verified (No)';
    }
  }

  clickActive(){
    this.filterAll = false;
    this.optionsCreditMovementsImported.active = !this.optionsCreditMovementsImported.active
    if(this.optionsCreditMovementsImported.active){
      this.stringActive = 'Active (YES)';

    }else{
      this.stringActive = 'Active (No)';
    }
  }
}
