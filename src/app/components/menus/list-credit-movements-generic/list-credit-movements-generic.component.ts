import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonViewComponent } from 'src/app/shared/button-view/button-view.component';
import { MultiSelComponent, ResourceMultiSel, SentActionPatchDeposit } from 'src/app/shared/multi-sel/multi-sel.component';
import { environment } from 'src/environments/environment';
import { BankAccountDtoA } from '../../setting/models/BankAccounts/friendly/bank-account-dto-a';
import { OptionsBankAccount } from '../../setting/models/BankAccounts/options-bank-account';
import { CreditMovementStatusDto } from '../../setting/models/CreditMovementStatus/credit-movement-status-dto';
import { OptionsCreditMovementStatus } from '../../setting/models/CreditMovementStatus/options-credit-movement-status';
import { CreditReasonDto } from '../../setting/models/CreditReason/credit-reason-dto';
import { OptionsCreditReason } from '../../setting/models/CreditReason/options-credit-reason';
import { MenusService } from '../../setting/services/menus.service';
import { CreditMovementForUpdateDto } from '../models/credit-movement-for-update-dto';
import { OptionsCreditMovement } from '../models/options-credit-movement';

@Component({
  selector: 'app-list-credit-movements-generic',
  templateUrl: './list-credit-movements-generic.component.html',
  styleUrls: ['./list-credit-movements-generic.component.scss']
})
export class ListCreditMovementsGenericComponent implements OnInit {

  @Input()   
  public optionsCreditMovement: OptionsCreditMovement;
  
  @Output()
  submit: EventEmitter<OptionsCreditMovement> = new EventEmitter<OptionsCreditMovement>();

  @Output()
  update: EventEmitter<CreditMovementForUpdateDto> = new EventEmitter<CreditMovementForUpdateDto>();

  @Output()
  delete: EventEmitter<CreditMovementForUpdateDto> = new EventEmitter<CreditMovementForUpdateDto>();

  @Output()
  patchVerified: EventEmitter<SentActionPatchDeposit> = new EventEmitter<SentActionPatchDeposit>();

  public optionsCreditMovementStatus: OptionsCreditMovementStatus = new OptionsCreditMovementStatus();
  public optionsCreditReason: OptionsCreditReason = new OptionsCreditReason();
  public optionsBankAccounts: OptionsBankAccount = new OptionsBankAccount();

  public arrayCreditReasons:CreditReasonDto[];
  public arrayCreditMovementStatuses:CreditMovementStatusDto[];
  public arrayBankAccounts:BankAccountDtoA[];

  constructor(
    private router: Router,
    private menusServices: MenusService) {

  }

  searchData(){
    this.submit.emit(this.optionsCreditMovement);
  }

  onEdit(event) {
    this.update.emit(event.data);
  }

  onDelete(event) {
    this.delete.emit(event.data);
  }


  ngOnInit() {
    this.inicializarTabla();

    this.optionsCreditReason.auxMediaTypeAccept = environment.mediaTypes.creditReason.get.accept.getAllJson;
    this.optionsCreditReason.active = true;
    // this.optionsCreditReason.fields = 'type,active';
    this.initDataCreditReasons();

    this.optionsCreditMovementStatus.auxMediaTypeAccept = environment.mediaTypes.creditMovementStatus.get.accept.getAllJson;
    this.optionsCreditMovementStatus.active = true;
    // this.optionsCreditMovementStatus.fields = 'type,active';
    this.initDataCreditMovementStatus();

    this.optionsBankAccounts.auxMediaTypeAccept = environment.mediaTypes.bankAccounts.get.accept.getAllJson;
    // this.optionsCreditMovementStatus.active = true;
    // this.optionsCreditMovementStatus.fields = 'type,active';
    this.initDataBankAccount();
  }

  initDataBankAccount() {
    let params = new HttpParams();
    // if (this.optionsBankAccounts.searchQuery != null) {
    //   params = params.append('SearchQuery', this.optionsBankAccounts.searchQuery);
    // }

    // if (this.optionsBankAccounts.accountNumber != null) {
    //   params = params.append('AccountNumber', this.optionsBankAccounts.accountNumber);
    // }
    // if (this.optionsBankAccounts.accountAlias != null) {
    //   params = params.append('AccountAlias', this.optionsBankAccounts.accountAlias);
    // }
    // if (this.optionsBankAccounts.employeeReferenceId != null) {
    //   params = params.append('EmployeeReferenceId', this.optionsBankAccounts.employeeReferenceId);
    // }
    // if (this.optionsBankAccounts.accountOwner != null) {
    //   params = params.append('AccountOwner', this.optionsBankAccounts.accountOwner);
    // }
    // if (this.optionsBankAccounts.dniAccountOwner != null) {
    //   params = params.append('DniAccountOwner', this.optionsBankAccounts.dniAccountOwner);
    // }
    // if (this.optionsBankAccounts.accountTypeId != null) {
    //   params = params.append('AccountTypeId', this.optionsBankAccounts.accountTypeId);
    // }
    // if (this.optionsBankAccounts.bankId != null) {
    //   params = params.append('BankId', this.optionsBankAccounts.bankId);
    // }

    if (this.optionsBankAccounts.active != null) {
      params = params.append('Active', this.optionsBankAccounts.active);
    }
    // if (this.optionsBankAccounts.orderBy != null) {
    //   params = params.append('OrderBy', this.optionsBankAccounts.orderBy);
    // }
    if (this.optionsBankAccounts.fields != null) {
      params = params.append('Fields', this.optionsBankAccounts.fields);
    }
    params = params.append('PageNumber', this.optionsBankAccounts.currentPage.toString());
    params = params.append('PageSize', this.optionsBankAccounts.pageSize.toString());
    this.menusServices
      .getAllBankAccounts(params, this.optionsBankAccounts.auxMediaTypeAccept)
      .subscribe((result: HttpResponse<any>) => {
        if (!result) {
          return;
        }
        if (result.status == 200) {
          if (this.optionsBankAccounts.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
            this.arrayBankAccounts = result.body.value;
            this.optionsBankAccounts.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsBankAccounts.totalCount = this.optionsBankAccounts.totalCount['totalCount'];
          } else {
            this.arrayBankAccounts = result.body;
            this.optionsBankAccounts.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsBankAccounts.totalCount = this.optionsBankAccounts.totalCount['totalCount'];
          }
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });
  }

  initDataCreditReasons() {
    let params = new HttpParams();
    if (this.optionsCreditReason.searchQuery != null) {
      params = params.append('SearchQuery', this.optionsCreditReason.searchQuery);
    }
    if (this.optionsCreditReason.active != null) {
      params = params.append('Active', this.optionsCreditReason.active);
    }
    if (this.optionsCreditReason.orderBy != null) {
      params = params.append('OrderBy', this.optionsCreditReason.orderBy);
    }
    if (this.optionsCreditReason.fields != null) {
      params = params.append('Fields', this.optionsCreditReason.fields);
    }
    params = params.append('PageNumber', this.optionsCreditReason.currentPage.toString());
    params = params.append('PageSize', this.optionsCreditReason.pageSize.toString());
    this.menusServices
      .getAllCreditReasons(params, this.optionsCreditReason.auxMediaTypeAccept)
      .subscribe((result: HttpResponse<any>) => {
        if (!result) {
          return;
        }
        if (result.status == 200) {
          if (this.optionsCreditReason.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
            this.arrayCreditReasons = result.body.value;
            this.optionsCreditReason.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsCreditReason.totalCount = this.optionsCreditReason.totalCount['totalCount'];
          } else {
            this.arrayCreditReasons = result.body;
            this.optionsCreditReason.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsCreditReason.totalCount = this.optionsCreditReason.totalCount['totalCount'];
          }
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });
      
  }

  initDataCreditMovementStatus() {
    let params = new HttpParams();
    if (this.optionsCreditMovementStatus.searchQuery != null) {
      params = params.append('SearchQuery', this.optionsCreditMovementStatus.searchQuery);
    }
    if (this.optionsCreditMovementStatus.active != null) {
      params = params.append('Active', this.optionsCreditMovementStatus.active);
    }
    if (this.optionsCreditMovementStatus.orderBy != null) {
      params = params.append('OrderBy', this.optionsCreditMovementStatus.orderBy);
    }
    if (this.optionsCreditMovementStatus.fields != null) {
      params = params.append('Fields', this.optionsCreditMovementStatus.fields);
    }
    params = params.append('PageNumber', this.optionsCreditMovementStatus.currentPage.toString());
    params = params.append('PageSize', this.optionsCreditMovementStatus.pageSize.toString());
    this.menusServices
      .getAllCreditMovementStatus(params, this.optionsCreditMovementStatus.auxMediaTypeAccept)
      .subscribe((result: HttpResponse<any>) => {
        if (!result) {
          return;
        }
        if (result.status == 200) {
          if (this.optionsCreditMovementStatus.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
             this.arrayCreditMovementStatuses = result.body.value;
            this.optionsCreditMovementStatus.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsCreditMovementStatus.totalCount = this.optionsCreditMovementStatus.totalCount['totalCount'];
          } else {
            this.arrayCreditMovementStatuses = result.body;
            this.optionsCreditMovementStatus.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsCreditMovementStatus.totalCount = this.optionsCreditMovementStatus.totalCount['totalCount'];
          }
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });
  }
  
  inicializarTabla() {
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
            if (!row.active) {
              sentData.renderValue = new DatePipe('en-US').transform(value, 'd/MMM/yyyy');
              sentData.step = 'btn btn-outline';
              sentData.styl = 'background-color: red;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
            } else if (row.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.encontrado) {

              sentData.renderValue = new DatePipe('en-US').transform(value, 'd/MMM/yyyy');
              sentData.step = 'bg-success btn btn-outline';
              sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';

            } else if (row.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.porVerificar) {

              sentData.renderValue = new DatePipe('en-US').transform(value, 'd/MMM/yyyy');
              sentData.step = 'btn btn-outline bg-danger';
              sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';

            }
            else if (row.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.noEncontrado) {
              sentData.renderValue = new DatePipe('en-US').transform(value, 'd/MMM/yyyy');
              sentData.step = 'btn btn-outline bg-dark';
              sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';

            } else { // ninguna de las otras 3 opciones

              sentData.renderValue = new DatePipe('en-US').transform(value, 'd/MMM/yyyy');
              sentData.step = 'btn btn-outline bg-info';
              sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';

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
              sentData.renderValue = new DatePipe('en-US').transform(value, 'd/MMM/yyyy, h:mm a');
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
        client: {
          title: 'client',
          filter: false,
          type: 'custom',
          valuePrepareFunction: (value, row, cell) => {
            var sentData = {
              renderValue: value.name,
              step: "btn btn-outline p-1 text-capitalize text-info",
            }

            return JSON.stringify(sentData);

          },
          renderComponent: ButtonViewComponent,
          onComponentInitFunction: (instance) => {
            instance.save.subscribe(row => {
              this.router.navigate(['/clients/bills/' + row.client.clientId]);
            });
          }
        },
        bankAccount: {
          title: 'bankAccount',
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
              sentData.renderValue = value.accountAlias;
              sentData.step = 'btn btn-outline';
              sentData.styl = 'background-color: red;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
            } else if (row.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.encontrado) {

              sentData.renderValue = value.accountAlias;
              sentData.step = 'bg-success btn btn-outline';
              sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';

            } else if (row.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.porVerificar) {

              sentData.renderValue = value.accountAlias;
              sentData.step = 'btn btn-outline bg-danger';
              sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';

            }
            else if (row.creditMovementStatus.creditMovementStatusId == environment.tuplas.creditMovementStatus.noEncontrado) {
              sentData.renderValue = value.accountAlias;
              sentData.step = 'btn btn-outline bg-dark';
              sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';

            } else { // ninguna de las otras 3 opciones

              sentData.renderValue = value.accountAlias;
              sentData.step = 'btn btn-outline bg-info';
              sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';

            }

            // if (value.accountAlias.toLowerCase().includes("cash")) {
            //   sentData.renderValue = value.accountAlias;
            //   sentData.step = 'bg-info btn btn-outline';
            //   sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
            // } else {
            //   sentData.renderValue = value.accountAlias;
            //   sentData.step = 'bg-success btn btn-outline';
            //   sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 95%;color:white;cursor: auto;';
            // }

            return JSON.stringify(sentData);
          },
          renderComponent: ButtonViewComponent,
        },
        document: {
          title: '# document',
          filter: false,

        },
        value: {
          title: '$ value',
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

            if (value > 0) {
              sentData.renderValue = new CurrencyPipe('en-US').transform(value, 'USD', 'symbol');
              sentData.step = 'btn btn-outline';
              sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 90%;cursor: auto;';
            } else {
              sentData.renderValue = new CurrencyPipe('en-US').transform(value, 'USD', 'symbol');
              sentData.step = 'bg-danger btn btn-outline';
              sentData.styl = 'line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.25em 0.4em;display:inline-block;font-size: 75%;cursor: auto;';
            }

            return JSON.stringify(sentData);
          },
          renderComponent: ButtonViewComponent,
        },
        image: {
          type: 'html',
          title: 'Image',
          filter: false,

          valuePrepareFunction: (images) => {
            if (images) {
              return `<a href="${images}" target="_blank" rel="noopener noreferrer">View Image</a>`;

            } else {
              return `<h6>NONE</h6>`;

            }
          }
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
        verifiedType: {
          title: 'verifiedType',
          filter: false,

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
              this.patchVerified.emit(item);

            });
          },
        },

      },
    };
  }
  clickActive(){
    this.optionsCreditMovement.active = !this.optionsCreditMovement.active
  }

  changeSettingsTable(event){
    this.optionsCreditMovement.source.setPaging(1,this.optionsCreditMovement.showPerPage)
  }
}

