import { HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ButtonViewComponent } from 'src/app/shared/button-view/button-view.component';
import { MultiSelComponent, ResourceMultiSel, SentActionPatchDeposit } from 'src/app/shared/multi-sel/multi-sel.component';
import { environment } from 'src/environments/environment';
import { CreditMovementsService } from '../menus/services/credit-movements.service';
import { BankAccountDto } from '../setting/models/BankAccounts/bank-account-dto';
import { OptionsBankAccount } from '../setting/models/BankAccounts/options-bank-account';
import { MenusService } from '../setting/services/menus.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  public optionsBankAccounts: OptionsBankAccount = new OptionsBankAccount();
  public viewMovements: boolean = false;
  public title:string;
  public bankSelected: BankAccountDto;
  public bankAccountIdSelected: string = null;


  constructor(
    private menusServices: MenusService,
    private creditMovementsService: CreditMovementsService,
  ) {
    this.initSettingsBankAccount();

  }
  ngOnInit() {
    this.optionsBankAccounts.auxMediaTypeAccept = environment.mediaTypes.bankAccounts.get.accept.getAllJson;
   this.optionsBankAccounts.userId = localStorage.getItem('userId');
    this.optionsBankAccounts.active = true;
    this.initDataBankAccount();

    this.initOnChagedData();
  }

  initOnChagedData() {
    this.optionsBankAccounts.source.onChanged().subscribe((change) => {
      if (change.action === 'page') {
        this.pageChangeBankAccount(change.paging.page);
      }
    });
  }
  private initSettingsBankAccount() {
    this.optionsBankAccounts.settings = {
      mode: 'inline',

      actions: {
        add: false,
        edit: false,
        delete: false,
      },
      pager: {
        display: true,
        perPage: this.optionsBankAccounts.showPerPage,
      },
      columns: {
        accountAlias: {
          title: 'accountAlias',
          filter: false,
        },
        accountNumber: {
          title: 'accountNumber',
          filter: false,
        },
        accountOwner: {
          title: 'accountOwner',
          filter: false,
        },
        dniAccountOwner: {
          title: 'dniAccountOwner',
          filter: false,
        },
        accountType: {
          title: 'accountType',
          filter: false,
          editor: {
            type: 'list',
            config: {
              list: [

              ]
            },
          },
          valuePrepareFunction: (value, row, cell) => {
            return value.type;
          },
        },
        bank: {
          title: 'bank',
          filter: false,
          editor: {
            type: 'list',
            config: {
              list: [

              ]
            },
          },
          valuePrepareFunction: (value, row, cell) => {
            return value.bank1;
          },
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

            // sentData.action.push('FILE UPLOAD');
            // sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');
            // sentData.stepClass.push('bg-secondary btn btn-outline-secondary-2x');

            sentData.action.push('VIEW MOVEMENTS');
            sentData.styl.push('line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;border-radius: 0.25rem;padding: 0.50em 0.4em;display:inline-block;font-size: 100%;color:white;cursor: pointer;');
            sentData.stepClass.push('bg-info btn btn-outline-info-2x');

            return sentData;
          },
          renderComponent: MultiSelComponent,
          onComponentInitFunction: (instance) => {
            instance.save.subscribe((item) => {
              this.goActions(item)
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
  
  initDataBankAccount() {
    let params = new HttpParams();
    if (this.optionsBankAccounts.searchQuery != null) {
      params = params.append('SearchQuery', this.optionsBankAccounts.searchQuery);
    }

    if (this.optionsBankAccounts.accountNumber != null) {
      params = params.append('AccountNumber', this.optionsBankAccounts.accountNumber);
    }
    if (this.optionsBankAccounts.accountAlias != null) {
      params = params.append('AccountAlias', this.optionsBankAccounts.accountAlias);
    }
    if (this.optionsBankAccounts.userId != null) {
      params = params.append('userId', this.optionsBankAccounts.userId);
    }
    if (this.optionsBankAccounts.accountOwner != null) {
      params = params.append('AccountOwner', this.optionsBankAccounts.accountOwner);
    }
    if (this.optionsBankAccounts.dniAccountOwner != null) {
      params = params.append('DniAccountOwner', this.optionsBankAccounts.dniAccountOwner);
    }
    if (this.optionsBankAccounts.accountTypeId != null) {
      params = params.append('AccountTypeId', this.optionsBankAccounts.accountTypeId);
    }
    if (this.optionsBankAccounts.bankId != null) {
      params = params.append('BankId', this.optionsBankAccounts.bankId);
    }

    if (this.optionsBankAccounts.active != null) {
      params = params.append('Active', this.optionsBankAccounts.active);
    }
    if (this.optionsBankAccounts.orderBy != null) {
      params = params.append('OrderBy', this.optionsBankAccounts.orderBy);
    }
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
            this.optionsBankAccounts.source.load(result.body.value);
            this.optionsBankAccounts.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsBankAccounts.totalCount = this.optionsBankAccounts.totalCount['totalCount'];
          } else {
            this.optionsBankAccounts.source.load(result.body);
            this.optionsBankAccounts.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsBankAccounts.totalCount = this.optionsBankAccounts.totalCount['totalCount'];
          }
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });
  }
  changeSettingsTable(event){
    this.optionsBankAccounts.source.setPaging(1,this.optionsBankAccounts.showPerPage)
  }

  pageChangeBankAccount(pageIndex: any) {
    var getNew = pageIndex * this.optionsBankAccounts.showPerPage;
    if (getNew >= this.optionsBankAccounts.source.count() && getNew < this.optionsBankAccounts.totalCount) {
      this.optionsBankAccounts.currentPage = this.optionsBankAccounts.currentPage + 1;
      let params = new HttpParams();
      if (this.optionsBankAccounts.searchQuery != null) {
        params = params.append('SearchQuery', this.optionsBankAccounts.searchQuery);
      }
      if (this.optionsBankAccounts.accountNumber != null) {
        params = params.append('AccountNumber', this.optionsBankAccounts.accountNumber);
      }
      if (this.optionsBankAccounts.accountAlias != null) {
        params = params.append('AccountAlias', this.optionsBankAccounts.accountAlias);
      }
      if (this.optionsBankAccounts.userId != null) {
        params = params.append('userId', this.optionsBankAccounts.userId);
      }
      if (this.optionsBankAccounts.accountOwner != null) {
        params = params.append('AccountOwner', this.optionsBankAccounts.accountOwner);
      }
      if (this.optionsBankAccounts.dniAccountOwner != null) {
        params = params.append('DniAccountOwner', this.optionsBankAccounts.dniAccountOwner);
      }
      if (this.optionsBankAccounts.accountTypeId != null) {
        params = params.append('AccountTypeId', this.optionsBankAccounts.accountTypeId);
      }
      if (this.optionsBankAccounts.bankId != null) {
        params = params.append('BankId', this.optionsBankAccounts.bankId);
      }

      if (this.optionsBankAccounts.active != null) {
        params = params.append('Active', this.optionsBankAccounts.active);
      }
      if (this.optionsBankAccounts.orderBy != null) {
        params = params.append('OrderBy', this.optionsBankAccounts.orderBy);
      }
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
              // this.optionsBankAccounts.source.load(result.body.value);
              result.body.value.forEach((element) => {
                this.optionsBankAccounts.source.add(element);
              });
            } else {
              //this.optionsBankAccounts.source.load(result.body);
              result.body.forEach((element) => {
                this.optionsBankAccounts.source.add(element);
              });
            }
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
        });
    }
  }

  private goActions(item: SentActionPatchDeposit){
    if (item.option == 'VIEW MOVEMENTS'){
      // this.optionsBankAccounts.s
      // this.csvTableDataCreditMovements = null;
      this.viewMovements = true;
      this.title = "View";
      this.bankAccountIdSelected = item.entity.bankAccountId;
    
      this.patchBankSelected(item.entity);
      this.SUM_DEPOS_X_VERIFICAR = null;
      this.SUM_DEPOS_VERIFICADOS = null;
  this.OBTENER_BALANCE_CUENTA = null;
  this.getSUM_DEPOS_X_VERIFICAR(item.entity.bankAccountId);
  this.getOBTENER_BALANCE_CUENTA(item.entity.bankAccountId);
  this.getSUM_DEPOS_VERIFICADOS(item.entity.bankAccountId);
  // console.log(item);
    }
  }
  patchBankSelected(entity: any) {
      this.bankSelected = entity;
      this.bankSelected.bank = entity.bank;
      this.bankSelected.accountType = entity.accountType;
    }




  public crearDate(responseDate: any): Date {
    if(responseDate.includes("/")){
      var dateParts = responseDate.split("/");

    }else if(responseDate.includes("-")){
      var dateParts = responseDate.split("-");

    }
    // month is 0-based, that's why we need dataParts[1] - 1

    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return dateObject;
  }

  SUM_DEPOS_X_VERIFICAR : number = null;
  SUM_DEPOS_VERIFICADOS : number = null;
  OBTENER_BALANCE_CUENTA: number = null;

  getSUM_DEPOS_X_VERIFICAR(bankAccountId: string){
    let params = new HttpParams();
    
      this.menusServices
      .getSUM_DEPOS_X_VERIFICAR(bankAccountId)
      .subscribe((result: HttpResponse<any>) => {
        // console.log(result);
        if (!result) {
          return;
        }
        if (result.status == 200) {
         console.log('entro');
            this.SUM_DEPOS_X_VERIFICAR = result.body;

        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
        this.SUM_DEPOS_X_VERIFICAR = 0.001;
      });
  }

  getSUM_DEPOS_VERIFICADOS(bankAccountId: string){
    let params = new HttpParams();
    
    this.menusServices
    .getSUM_DEPOS_VERIFICADOS(bankAccountId)
    .subscribe((result: HttpResponse<any>) => {
      // console.log(result);
      if (!result) {
        return;
      }
      if (result.status == 200) {
       
          this.SUM_DEPOS_VERIFICADOS = result.body;
console.log(this.SUM_DEPOS_VERIFICADOS);
      }
    }, (err: HttpErrorResponse) => {
      console.warn(err);
      this.SUM_DEPOS_VERIFICADOS = 0.001;
    });
  }

  getOBTENER_BALANCE_CUENTA(bankAccountId: string){
    let params = new HttpParams();
    
    this.menusServices
    .getOBTENER_BALANCE_CUENTA(bankAccountId)
    .subscribe((result: HttpResponse<any>) => {
      // console.log(result);
      if (!result) {
        return;
      }
      if (result.status == 200) {
       
          this.OBTENER_BALANCE_CUENTA = result.body;
          if(this.OBTENER_BALANCE_CUENTA == 0){
            this.OBTENER_BALANCE_CUENTA = 0.001;
          }
      }
    }, (err: HttpErrorResponse) => {
      console.warn(err);
      this.OBTENER_BALANCE_CUENTA = 0.001;
    });
  }


}
