import { HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ButtonViewComponent } from 'src/app/shared/button-view/button-view.component';
import { environment } from 'src/environments/environment';
import { AccountTypeDto } from '../models/AccountType/account-type-dto';
import { AccountTypeForCreateDto } from '../models/AccountType/account-type-for-create-dto';
import { OptionsAccountTypes } from '../models/AccountType/options-account-types';
import { BankDto } from '../models/Bank/bank-dto';
import { BankForCreateDto } from '../models/Bank/bank-for-create-dto';
import { OptionsBank } from '../models/Bank/options-bank';
import { BankAccountDto } from '../models/BankAccounts/bank-account-dto';
import { BankAccountForCreateDto } from '../models/BankAccounts/bank-account-for-create-dto';
import { OptionsBankAccount } from '../models/BankAccounts/options-bank-account';
import { CreditMovementStatusDto } from '../models/CreditMovementStatus/credit-movement-status-dto';
import { CreditMovementStatusForCreateDto } from '../models/CreditMovementStatus/credit-movement-status-for-create-dto';
import { OptionsCreditMovementStatus } from '../models/CreditMovementStatus/options-credit-movement-status';
import { CreditReasonDto } from '../models/CreditReason/credit-reason-dto';
import { CreditReasonForCreateDto } from '../models/CreditReason/credit-reason-for-create-dto';
import { OptionsCreditReason } from '../models/CreditReason/options-credit-reason';
import { DebitMovementStatusDto } from '../models/DebitMovementStatus/debit-movement-status-dto';
import { DebitMovementStatusForCreateDto } from '../models/DebitMovementStatus/debit-movement-status-for-create-dto';
import { OptionsDebitMovementStatus } from '../models/DebitMovementStatus/options-debit-movement-status';
import { DebitReasonDto } from '../models/DebitReason/debit-reason-dto';
import { DebitReasonForCreateDto } from '../models/DebitReason/debit-reason-for-create-dto';
import { OptionsDebitReason } from '../models/DebitReason/options-debit-reason';
import { MenusService } from '../services/menus.service';

@Component({
  selector: 'app-gen-lists',
  templateUrl: './gen-lists.component.html',
  styleUrls: ['./gen-lists.component.scss']
})
export class GenListsComponent implements OnInit {

  public optionsBanks: OptionsBank = new OptionsBank();
  public optionsBankAccounts: OptionsBankAccount = new OptionsBankAccount();
  public optionsDebitReason: OptionsDebitReason = new OptionsDebitReason();

  public optionsAccountTypes: OptionsAccountTypes = new OptionsAccountTypes();
  public optionsCreditReason: OptionsCreditReason = new OptionsCreditReason();

  public optionsDebitMovementStatus: OptionsDebitMovementStatus = new OptionsDebitMovementStatus();
  public optionsCreditMovementStatus: OptionsCreditMovementStatus = new OptionsCreditMovementStatus();

  constructor(private menusServices: MenusService) {

    this.initSettingsAccountTypes();
    this.initSettingsBanks();
    this.initSettingsCreditMovementStatus();
    this.initSettingsCreditReason();
    this.initSettingsDebitMovementStatus();
    this.initSettingsDebitReason();
    this.initSettingsBankAccount();

  }

  ngOnInit() {
    this.optionsAccountTypes.auxMediaTypeAccept = environment.mediaTypes.accountType.get.accept.getAllJson;
    // this.optionsAccountTypes.active = true;
    // this.optionsAccountTypes.fields = 'type,active';
    this.initDataAccountTypes();

    this.optionsBanks.auxMediaTypeAccept = environment.mediaTypes.bank.get.accept.getAllJson;
    // this.optionsBanks.active = true;
    // this.optionsBanks.fields = 'type,active';
    this.initDataBanks();

    this.optionsDebitReason.auxMediaTypeAccept = environment.mediaTypes.debitReason.get.accept.getAllJson;
    // this.optionsDebitReason.active = true;
    // this.optionsDebitReason.fields = 'type,active';
    this.initDataDebitReasons();

    this.optionsCreditReason.auxMediaTypeAccept = environment.mediaTypes.creditReason.get.accept.getAllJson;
    // this.optionsCreditReason.active = true;
    // this.optionsCreditReason.fields = 'type,active';
    this.initDataCreditReasons();

    this.optionsDebitMovementStatus.auxMediaTypeAccept = environment.mediaTypes.debitMovementStatus.get.accept.getAllJson;
    // this.optionsDebitMovementStatus.active = true;
    // this.optionsDebitMovementStatus.fields = 'type,active';
    this.initDataDebitMovementStatus();

    this.optionsCreditMovementStatus.auxMediaTypeAccept = environment.mediaTypes.creditMovementStatus.get.accept.getAllJson;
    // this.optionsCreditMovementStatus.active = true;
    // this.optionsCreditMovementStatus.fields = 'type,active';
    this.initDataCreditMovementStatus();

    this.optionsBankAccounts.auxMediaTypeAccept = environment.mediaTypes.bankAccounts.get.accept.getAllJson;
    // this.optionsCreditMovementStatus.active = true;
    // this.optionsCreditMovementStatus.fields = 'type,active';
    this.initDataBankAccount();

   

    this.initOnChagedData();

  }



  initOnChagedData() {
    this.optionsAccountTypes.source.onChanged().subscribe((change) => {
      if (change.action === 'page') {
        this.pageChangeAccountTypes(change.paging.page);
      }
    });

    this.optionsBanks.source.onChanged().subscribe((change) => {
      if (change.action === 'page') {
        this.pageChangeBanks(change.paging.page);
      }
    });

    this.optionsBankAccounts.source.onChanged().subscribe((change) => {
      if (change.action === 'page') {
        this.pageChangeBankAccount(change.paging.page);
      }
    });

    this.optionsCreditMovementStatus.source.onChanged().subscribe((change) => {
      if (change.action === 'page') {
        this.pageChangeCreditMovementStatus(change.paging.page);
      }
    });

    this.optionsCreditReason.source.onChanged().subscribe((change) => {
      if (change.action === 'page') {
        this.pageChangeCreditReason(change.paging.page);
      }
    });

    this.optionsDebitMovementStatus.source.onChanged().subscribe((change) => {
      if (change.action === 'page') {
        this.pageChangeDebitMovementStatus(change.paging.page);
      }
    });

    this.optionsDebitReason.source.onChanged().subscribe((change) => {
      if (change.action === 'page') {
        this.pageChangeDebitReason(change.paging.page);
      }
    });

  }

  //DebitMovementStatus
  private initSettingsDebitMovementStatus() {
    this.optionsDebitMovementStatus.settings = {
      mode: 'inline',
      delete: {
        confirmDelete: true
      },
      add: {
        confirmCreate: true
      },
      edit: {
        confirmSave: true,
      },
      actions: {
        add: true,
        edit: true,
        delete: true,
      },
      pager: {
        display: true,
        perPage: this.optionsDebitMovementStatus.showPerPage,
      },
      columns: {
        status: {
          title: 'Description',
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

  initDataDebitMovementStatus() {
    let params = new HttpParams();
    if (this.optionsDebitMovementStatus.searchQuery != null) {
      params = params.append('SearchQuery', this.optionsDebitMovementStatus.searchQuery);
    }
    if (this.optionsDebitMovementStatus.active != null) {
      params = params.append('Active', this.optionsDebitMovementStatus.active);
    }
    if (this.optionsDebitMovementStatus.orderBy != null) {
      params = params.append('OrderBy', this.optionsDebitMovementStatus.orderBy);
    }
    if (this.optionsDebitMovementStatus.fields != null) {
      params = params.append('Fields', this.optionsDebitMovementStatus.fields);
    }
    params = params.append('PageNumber', this.optionsDebitMovementStatus.currentPage.toString());
    params = params.append('PageSize', this.optionsDebitMovementStatus.pageSize.toString());
    this.menusServices
      .getAllDebitMovementStatus(params, this.optionsDebitMovementStatus.auxMediaTypeAccept)
      .subscribe((result: HttpResponse<any>) => {
        if (!result) {
          return;
        }
        if (result.status == 200) {
          if (this.optionsDebitMovementStatus.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
            this.optionsDebitMovementStatus.source.load(result.body.value);
            this.optionsDebitMovementStatus.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsDebitMovementStatus.totalCount = this.optionsDebitMovementStatus.totalCount['totalCount'];
          } else {
            this.optionsDebitMovementStatus.source.load(result.body);
            this.optionsDebitMovementStatus.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsDebitMovementStatus.totalCount = this.optionsDebitMovementStatus.totalCount['totalCount'];
          }
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });
  }

  public onDeleteConfirmDebitMovementStatus(event): void {
    var act: string = null;
    if (event.data.active == true) {
      act = 'delete';
    } else {
      act = 'restore';
    }

    if (window.confirm(`Are you sure you want to ${act}?`)) {
      let params = new HttpParams();
      params = params.append('act', act);

      this.menusServices.putDeleteOrRestoreDebitMovementStatus(event.data.debitMovementStatusId
        , params
        , environment.mediaTypes.debitMovementStatus.put.ContentType.putJson)
        .subscribe((result: HttpResponse<any>) => {
          if (result.status == 200) {
            this.optionsDebitMovementStatus.source.getAll().then((x: []) => {
              var aux: DebitMovementStatusDto = x.find((element: DebitMovementStatusDto) => element.debitMovementStatusId == event.data.debitMovementStatusId);
              aux.active = !aux.active;
              this.optionsDebitMovementStatus.source.load(x);
            })
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
          event.confirm.reject();
        });
    } else {
      event.confirm.reject();
    }
  }

  public onUpdateConfirmDebitMovementStatus(event): void {
    var toPatch = [
      {
        path: '/Status',
        op: 'replace',
        value: event.newData.status,
      },
    ];
    console.log(event.data)
    if (window.confirm('Are you sure you want to save?')) {
      this.menusServices.patchDebitMovementStatus(toPatch,
        event.data.debitMovementStatusId,
        environment.mediaTypes.debitMovementStatus.patch.ContentType.patchJson)
        .subscribe((result: HttpResponse<any>) => {
          console.log(result)
          if (result.status == 201) {
            console.log("entro aqi")
            event.confirm.resolve(event.newData);
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
          event.confirm.reject();
        });
    } else {
      event.confirm.reject();
    }
  }

  public onCreateConfirmDebitMovementStatus(event): void {
    console.log(event);
    var entityCreate: DebitMovementStatusForCreateDto = event.newData;
    console.log(entityCreate);
    this.menusServices
      .addDebitMovementStatus(entityCreate, environment.mediaTypes.debitMovementStatus.post.ContentType.postJson)
      .subscribe((result: HttpResponse<any>) => {
        console.log(result);
        if (result.status == 201) {
          console.log("entro aqi")
          event.confirm.resolve(result.body);
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
        event.confirm.reject();
      });

  }

  pageChangeDebitMovementStatus(pageIndex: any) {
    var getNew = pageIndex * this.optionsDebitMovementStatus.showPerPage;
    if (getNew >= this.optionsDebitMovementStatus.source.count() && getNew < this.optionsDebitMovementStatus.totalCount) {
      this.optionsDebitMovementStatus.currentPage = this.optionsDebitMovementStatus.currentPage + 1;
      let params = new HttpParams();
      if (this.optionsDebitMovementStatus.searchQuery != null) {
        params = params.append('SearchQuery', this.optionsDebitMovementStatus.searchQuery);
      }
      if (this.optionsDebitMovementStatus.active != null) {
        params = params.append('Active', this.optionsDebitMovementStatus.active);
      }
      if (this.optionsDebitMovementStatus.orderBy != null) {
        params = params.append('OrderBy', this.optionsDebitMovementStatus.orderBy);
      }
      if (this.optionsDebitMovementStatus.fields != null) {
        params = params.append('Fields', this.optionsDebitMovementStatus.fields);
      }
      params = params.append('PageNumber', this.optionsDebitMovementStatus.currentPage.toString());
      params = params.append('PageSize', this.optionsDebitMovementStatus.pageSize.toString());
      this.menusServices
        .getAllDebitMovementStatus(params, this.optionsDebitMovementStatus.auxMediaTypeAccept)
        .subscribe((result: HttpResponse<any>) => {
          if (!result) {
            return;
          }
          if (result.status == 200) {
            if (this.optionsDebitMovementStatus.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
              // this.optionsDebitMovementStatus.source.load(result.body.value);
              result.body.value.forEach((element) => {
                this.optionsDebitMovementStatus.source.add(element);
              });
            } else {
              // this.optionsDebitMovementStatus.source.load(result.body);
              result.body.forEach((element) => {
                this.optionsDebitMovementStatus.source.add(element);
              });
            }
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
        });
    }
  }
  //CreditMovementStatus
  private initSettingsCreditMovementStatus() {
    this.optionsCreditMovementStatus.settings = {
      mode: 'inline',
      delete: {
        confirmDelete: true
      },
      add: {
        confirmCreate: true
      },
      edit: {
        confirmSave: true,
      },
      actions: {
        add: true,
        edit: true,
        delete: true,
      },
      pager: {
        display: true,
        perPage: this.optionsCreditMovementStatus.showPerPage,
      },
      columns: {
        status: {
          title: 'Description',
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
            this.optionsCreditMovementStatus.source.load(result.body.value);
            this.optionsCreditMovementStatus.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsCreditMovementStatus.totalCount = this.optionsCreditMovementStatus.totalCount['totalCount'];
          } else {
            this.optionsCreditMovementStatus.source.load(result.body);
            this.optionsCreditMovementStatus.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsCreditMovementStatus.totalCount = this.optionsCreditMovementStatus.totalCount['totalCount'];
          }
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });
  }
  public onDeleteConfirmCreditMovementStatus(event): void {
    var act: string = null;
    if (event.data.active == true) {
      act = 'delete';
    } else {
      act = 'restore';
    }

    if (window.confirm(`Are you sure you want to ${act}?`)) {
      let params = new HttpParams();
      params = params.append('act', act);

      this.menusServices.putDeleteOrRestoreCreditMovementStatus(event.data.creditMovementStatusId
        , params
        , environment.mediaTypes.creditMovementStatus.put.ContentType.putJson)
        .subscribe((result: HttpResponse<any>) => {
          if (result.status == 200) {
            this.optionsCreditMovementStatus.source.getAll().then((x: []) => {
              var aux: CreditMovementStatusDto = x.find((element: CreditMovementStatusDto) => element.creditMovementStatusId == event.data.creditMovementStatusId);
              aux.active = !aux.active;
              this.optionsCreditMovementStatus.source.load(x);
            })
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
          event.confirm.reject();
        });
    } else {
      event.confirm.reject();
    }
  }

  public onUpdateConfirmCreditMovementStatus(event): void {
    console.log(event)
    var toPatch = [
      {
        path: '/Status',
        op: 'replace',
        value: event.newData.status,
      },
    ];

    if (window.confirm('Are you sure you want to save?')) {
      this.menusServices.patchCreditMovementStatus(toPatch,
        event.data.creditMovementStatusId,
        environment.mediaTypes.creditMovementStatus.patch.ContentType.patchJson)
        .subscribe((result: HttpResponse<any>) => {
          console.log(result)
          if (result.status == 201) {
            console.log("entro aqi")
            event.confirm.resolve(event.newData);
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
          event.confirm.reject();
        });
    } else {
      event.confirm.reject();
    }
  }

  public onCreateConfirmCreditMovementStatus(event): void {
    console.log(event);
    var entityCreate: CreditMovementStatusForCreateDto = event.newData;
    console.log(entityCreate);
    this.menusServices
      .addCreditMovementStatus(entityCreate, environment.mediaTypes.creditMovementStatus.post.ContentType.postJson)
      .subscribe((result: HttpResponse<any>) => {
        console.log(result);
        if (result.status == 201) {
          console.log("entro aqi")
          event.confirm.resolve(result.body);
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
        event.confirm.reject();
      });

  }
  pageChangeCreditMovementStatus(pageIndex: any) {
    var getNew = pageIndex * this.optionsCreditMovementStatus.showPerPage;
    if (getNew >= this.optionsCreditMovementStatus.source.count() && getNew < this.optionsCreditMovementStatus.totalCount) {
      this.optionsCreditMovementStatus.currentPage = this.optionsCreditMovementStatus.currentPage + 1;
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
              // this.optionsCreditMovementStatus.source.load(result.body.value);
              result.body.value.forEach((element) => {
                this.optionsCreditMovementStatus.source.add(element);
              });
            } else {
              // this.optionsCreditMovementStatus.source.load(result.body);
              result.body.forEach((element) => {
                this.optionsCreditMovementStatus.source.add(element);
              });
            }
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
        });
    }
  }
  //DebitReason
  private initSettingsDebitReason() {
    this.optionsDebitReason.settings = {
      mode: 'inline',
      delete: {
        confirmDelete: true
      },
      add: {
        confirmCreate: true
      },
      edit: {
        confirmSave: true,
      },
      actions: {
        add: true,
        edit: true,
        delete: true,
      },
      pager: {
        display: true,
        perPage: this.optionsDebitReason.showPerPage,
      },
      columns: {
        reason: {
          title: 'Reason',
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
  initDataDebitReasons() {
    let params = new HttpParams();
    if (this.optionsDebitReason.searchQuery != null) {
      params = params.append('SearchQuery', this.optionsDebitReason.searchQuery);
    }
    if (this.optionsDebitReason.active != null) {
      params = params.append('Active', this.optionsDebitReason.active);
    }
    if (this.optionsDebitReason.orderBy != null) {
      params = params.append('OrderBy', this.optionsDebitReason.orderBy);
    }
    if (this.optionsDebitReason.fields != null) {
      params = params.append('Fields', this.optionsDebitReason.fields);
    }
    params = params.append('PageNumber', this.optionsDebitReason.currentPage.toString());
    params = params.append('PageSize', this.optionsDebitReason.pageSize.toString());
    this.menusServices
      .getAllDebitReasons(params, this.optionsDebitReason.auxMediaTypeAccept)
      .subscribe((result: HttpResponse<any>) => {
        if (!result) {
          return;
        }
        if (result.status == 200) {
          if (this.optionsDebitReason.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
            this.optionsDebitReason.source.load(result.body.value);
            this.optionsDebitReason.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsDebitReason.totalCount = this.optionsDebitReason.totalCount['totalCount'];
          } else {
            this.optionsDebitReason.source.load(result.body);
            this.optionsDebitReason.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsDebitReason.totalCount = this.optionsDebitReason.totalCount['totalCount'];
          }
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });
  }
  public onDeleteConfirmDebitReason(event): void {
    var act: string = null;
    if (event.data.active == true) {
      act = 'delete';
    } else {
      act = 'restore';
    }

    if (window.confirm(`Are you sure you want to ${act}?`)) {
      let params = new HttpParams();
      params = params.append('act', act);

      this.menusServices.putDeleteOrRestoreDebitReason(event.data.debitReasonId
        , params
        , environment.mediaTypes.debitReason.put.ContentType.putJson)
        .subscribe((result: HttpResponse<any>) => {
          if (result.status == 200) {
            this.optionsDebitReason.source.getAll().then((x: []) => {
              var aux: DebitReasonDto = x.find((element: DebitReasonDto) => element.debitReasonId == event.data.debitReasonId);
              aux.active = !aux.active;
              this.optionsDebitReason.source.load(x);
            })
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
          event.confirm.reject();
        });
    } else {
      event.confirm.reject();
    }
  }

  public onUpdateConfirmDebitReason(event): void {
    console.log(event)
    var toPatch = [
      {
        path: '/Reason',
        op: 'replace',
        value: event.newData.reason,
      },
    ];

    if (window.confirm('Are you sure you want to save?')) {
      this.menusServices.patchDebitReason(toPatch,
        event.data.debitReasonId,
        environment.mediaTypes.debitReason.patch.ContentType.patchJson)
        .subscribe((result: HttpResponse<any>) => {
          console.log(result)
          if (result.status == 201) {
            console.log("entro aqi")
            event.confirm.resolve(event.newData);
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
          event.confirm.reject();
        });
    } else {
      event.confirm.reject();
    }
  }

  public onCreateConfirmDebitReason(event): void {
    console.log(event);
    var entityCreate: DebitReasonForCreateDto = event.newData;
    console.log(entityCreate);
    this.menusServices
      .addDebitReason(entityCreate, environment.mediaTypes.debitReason.post.ContentType.postJson)
      .subscribe((result: HttpResponse<any>) => {
        console.log(result);
        if (result.status == 201) {
          console.log("entro aqi")
          event.confirm.resolve(result.body);
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
        event.confirm.reject();
      });

  }
  pageChangeDebitReason(pageIndex: any) {
    var getNew = pageIndex * this.optionsDebitReason.showPerPage;
    if (getNew >= this.optionsDebitReason.source.count() && getNew < this.optionsDebitReason.totalCount) {
      this.optionsDebitReason.currentPage = this.optionsDebitReason.currentPage + 1;
      let params = new HttpParams();
      if (this.optionsDebitReason.searchQuery != null) {
        params = params.append('SearchQuery', this.optionsDebitReason.searchQuery);
      }
      if (this.optionsDebitReason.active != null) {
        params = params.append('Active', this.optionsDebitReason.active);
      }
      if (this.optionsDebitReason.orderBy != null) {
        params = params.append('OrderBy', this.optionsDebitReason.orderBy);
      }
      if (this.optionsDebitReason.fields != null) {
        params = params.append('Fields', this.optionsDebitReason.fields);
      }
      params = params.append('PageNumber', this.optionsDebitReason.currentPage.toString());
      params = params.append('PageSize', this.optionsDebitReason.pageSize.toString());
      this.menusServices
        .getAllDebitReasons(params, this.optionsDebitReason.auxMediaTypeAccept)
        .subscribe((result: HttpResponse<any>) => {
          if (!result) {
            return;
          }
          if (result.status == 200) {
            if (this.optionsDebitReason.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
              // this.optionsDebitReason.source.load(result.body.value);
              result.body.value.forEach((element) => {
                this.optionsDebitReason.source.add(element);
              });
            } else {
              // this.optionsDebitReason.source.load(result.body);
              result.body.forEach((element) => {
                this.optionsDebitReason.source.add(element);
              });
            }
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
        });
    }
  }
  //CreditReason
  private initSettingsCreditReason() {
    this.optionsCreditReason.settings = {
      mode: 'inline',
      delete: {
        confirmDelete: true
      },
      add: {
        confirmCreate: true
      },
      edit: {
        confirmSave: true,
      },
      actions: {
        add: true,
        edit: true,
        delete: true,
      },
      pager: {
        display: true,
        perPage: this.optionsCreditReason.showPerPage,
      },
      columns: {
        reason: {
          title: 'Reason',
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
            this.optionsCreditReason.source.load(result.body.value);
            this.optionsCreditReason.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsCreditReason.totalCount = this.optionsCreditReason.totalCount['totalCount'];
          } else {
            this.optionsCreditReason.source.load(result.body);
            this.optionsCreditReason.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsCreditReason.totalCount = this.optionsCreditReason.totalCount['totalCount'];
          }
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });
  }
  public onDeleteConfirmCreditReason(event): void {
    var act: string = null;
    if (event.data.active == true) {
      act = 'delete';
    } else {
      act = 'restore';
    }

    if (window.confirm(`Are you sure you want to ${act}?`)) {
      let params = new HttpParams();
      params = params.append('act', act);

      this.menusServices.putDeleteOrRestoreCreditReason(event.data.creditReasonId
        , params
        , environment.mediaTypes.creditReason.put.ContentType.putJson)
        .subscribe((result: HttpResponse<any>) => {
          if (result.status == 200) {
            this.optionsCreditReason.source.getAll().then((x: []) => {
              var aux: CreditReasonDto = x.find((element: CreditReasonDto) => element.creditReasonId == event.data.creditReasonId);
              aux.active = !aux.active;
              this.optionsCreditReason.source.load(x);
            })
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
          event.confirm.reject();
        });
    } else {
      event.confirm.reject();
    }
  }

  public onUpdateConfirmCreditReason(event): void {
    console.log(event)
    var toPatch = [
      {
        path: '/Reason',
        op: 'replace',
        value: event.newData.reason,
      },
    ];

    if (window.confirm('Are you sure you want to save?')) {
      this.menusServices.patchCreditReason(toPatch,
        event.data.creditReasonId,
        environment.mediaTypes.creditReason.patch.ContentType.patchJson)
        .subscribe((result: HttpResponse<any>) => {
          console.log(result)
          if (result.status == 201) {
            console.log("entro aqi")
            event.confirm.resolve(event.newData);
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
          event.confirm.reject();
        });
    } else {
      event.confirm.reject();
    }
  }

  public onCreateConfirmCreditReason(event): void {
    console.log(event);
    var entityCreate: CreditReasonForCreateDto = event.newData;
    console.log(entityCreate);
    this.menusServices
      .addCreditReason(entityCreate, environment.mediaTypes.creditReason.post.ContentType.postJson)
      .subscribe((result: HttpResponse<any>) => {
        console.log(result);
        if (result.status == 201) {
          console.log("entro aqi")
          event.confirm.resolve(result.body);
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
        event.confirm.reject();
      });

  }
  pageChangeCreditReason(pageIndex: any) {
    var getNew = pageIndex * this.optionsCreditReason.showPerPage;
    if (getNew >= this.optionsCreditReason.source.count() && getNew < this.optionsCreditReason.totalCount) {
      this.optionsCreditReason.currentPage = this.optionsCreditReason.currentPage + 1;
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
              // this.optionsCreditReason.source.load(result.body.value);
              result.body.value.forEach((element) => {
                this.optionsCreditReason.source.add(element);
              });
            } else {
              // this.optionsCreditReason.source.load(result.body);
              result.body.forEach((element) => {
                this.optionsCreditReason.source.add(element);
              });
            }
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
        });
    }
  }

  // Banks
  private initSettingsBanks() {
    this.optionsBanks.settings = {
      mode: 'inline',
      delete: {
        confirmDelete: true
      },
      add: {
        confirmCreate: true
      },
      edit: {
        confirmSave: true,
      },
      actions: {
        add: true,
        edit: true,
        delete: true,
      },
      pager: {
        display: true,
        perPage: this.optionsBanks.showPerPage,
      },
      columns: {
        bank1: {
          title: 'Banks',
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
  initDataBanks() {
    let params = new HttpParams();
    if (this.optionsBanks.searchQuery != null) {
      params = params.append('SearchQuery', this.optionsBanks.searchQuery);
    }
    if (this.optionsBanks.active != null) {
      params = params.append('Active', this.optionsBanks.active);
    }
    if (this.optionsBanks.orderBy != null) {
      params = params.append('OrderBy', this.optionsBanks.orderBy);
    }
    if (this.optionsBanks.fields != null) {
      params = params.append('Fields', this.optionsBanks.fields);
    }
    params = params.append('PageNumber', this.optionsBanks.currentPage.toString());
    params = params.append('PageSize', this.optionsBanks.pageSize.toString());
    this.menusServices
      .getAllBanks(params, this.optionsBanks.auxMediaTypeAccept)
      .subscribe((result: HttpResponse<any>) => {
        if (!result) {
          return;
        }
        if (result.status == 200) {
          if (this.optionsBanks.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
            this.optionsBanks.source.load(result.body.value);
            this.optionsBanks.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsBanks.totalCount = this.optionsBanks.totalCount['totalCount'];
            this.getBanks();
          } else {
            this.optionsBanks.source.load(result.body);
            this.optionsBanks.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsBanks.totalCount = this.optionsBanks.totalCount['totalCount'];
            this.getBanks();
          }
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });
  }
  public onDeleteConfirmBanks(event): void {
    var act: string = null;
    if (event.data.active == true) {
      act = 'delete';
    } else {
      act = 'restore';
    }

    if (window.confirm(`Are you sure you want to ${act}?`)) {
      let params = new HttpParams();
      params = params.append('act', act);

      this.menusServices.putDeleteOrRestoreBank(event.data.bankId
        , params
        , environment.mediaTypes.bank.put.ContentType.putJson)
        .subscribe((result: HttpResponse<any>) => {
          if (result.status == 200) {
            this.optionsBanks.source.getAll().then((x: []) => {
              var aux: BankDto = x.find((element: BankDto) => element.bankId == event.data.bankId);
              aux.active = !aux.active;
              this.optionsBanks.source.load(x);
              this.getBanks();

            })
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
          event.confirm.reject();
        });
    } else {
      event.confirm.reject();
    }
  }

  public onUpdateConfirmBanks(event): void {
    console.log(event)
    var toPatch = [
      {
        path: '/Bank1',
        op: 'replace',
        value: event.newData.bank1,
      },
    ];
    if (window.confirm('Are you sure you want to save?')) {
      this.menusServices.patchBank(toPatch,
        event.data.bankId,
        environment.mediaTypes.bank.patch.ContentType.patchJson)
        .subscribe((result: HttpResponse<any>) => {
          console.log(result)
          if (result.status == 201) {
            console.log("entro aqi")
            event.confirm.resolve(event.newData);
            this.getBanks();

          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
          event.confirm.reject();
        });
    } else {
      event.confirm.reject();
    }
  }

  public onCreateConfirmBanks(event): void {
    console.log(event);
    var entityCreate: BankForCreateDto = event.newData;
    console.log(entityCreate);
    this.menusServices
      .addBank(entityCreate, environment.mediaTypes.bank.post.ContentType.postJson)
      .subscribe((result: HttpResponse<any>) => {
        console.log(result);
        if (result.status == 201) {
          console.log("entro aqi")
          event.confirm.resolve(result.body);
          this.getBanks();

        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
        event.confirm.reject();
      });

  }
  pageChangeBanks(pageIndex: any) {
    var getNew = pageIndex * this.optionsBanks.showPerPage;
    if (getNew >= this.optionsBanks.source.count() && getNew < this.optionsBanks.totalCount) {
      this.optionsBanks.currentPage = this.optionsBanks.currentPage + 1;
      let params = new HttpParams();
      if (this.optionsBanks.searchQuery != null) {
        params = params.append('SearchQuery', this.optionsBanks.searchQuery);
      }
      if (this.optionsBanks.active != null) {
        params = params.append('Active', this.optionsBanks.active);
      }
      if (this.optionsBanks.orderBy != null) {
        params = params.append('OrderBy', this.optionsBanks.orderBy);
      }
      if (this.optionsBanks.fields != null) {
        params = params.append('Fields', this.optionsBanks.fields);
      }
      params = params.append('PageNumber', this.optionsBanks.currentPage.toString());
      params = params.append('PageSize', this.optionsBanks.pageSize.toString());
      this.menusServices
        .getAllBanks(params, this.optionsBanks.auxMediaTypeAccept)
        .subscribe((result: HttpResponse<any>) => {
          if (!result) {
            return;
          }
          if (result.status == 200) {
            if (this.optionsBanks.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
              // this.optionsBanks.source.load(result.body.value);
              result.body.value.forEach((element) => {
                this.optionsBanks.source.add(element);
              });
              this.getBanks();
            } else {
              // this.optionsBanks.source.load(result.body);
              result.body.forEach((element) => {
                this.optionsBanks.source.add(element);
              });
              this.getBanks();
            }
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
        });
    }
  }

  // AccountTypes

  private initSettingsAccountTypes() {
    this.optionsAccountTypes.settings = {
      mode: 'inline',
      delete: {
        confirmDelete: true
      },
      add: {
        confirmCreate: true
      },
      edit: {
        confirmSave: true,
      },
      actions: {
        add: true,
        edit: true,
        delete: true,
      },
      pager: {
        display: true,
        perPage: this.optionsAccountTypes.showPerPage,
      },
      columns: {
        type: {
          title: 'Account Types',
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

  private initDataAccountTypes() {
    let params = new HttpParams();
    if (this.optionsAccountTypes.searchQuery != null) {
      params = params.append('SearchQuery', this.optionsAccountTypes.searchQuery);
    }
    if (this.optionsAccountTypes.active != null) {
      params = params.append('Active', this.optionsAccountTypes.active);
    }
    if (this.optionsAccountTypes.orderBy != null) {
      params = params.append('OrderBy', this.optionsAccountTypes.orderBy);
    }
    if (this.optionsAccountTypes.fields != null) {
      params = params.append('Fields', this.optionsAccountTypes.fields);
    }
    params = params.append('PageNumber', this.optionsAccountTypes.currentPage.toString());
    params = params.append('PageSize', this.optionsAccountTypes.pageSize.toString());
    this.menusServices
      .getAllOAccountTypes(params, this.optionsAccountTypes.auxMediaTypeAccept)
      .subscribe((result: HttpResponse<any>) => {
        if (!result) {
          return;
        }
        if (result.status == 200) {
          if (this.optionsAccountTypes.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
            this.optionsAccountTypes.source.load(result.body.value);
            this.optionsAccountTypes.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsAccountTypes.totalCount = this.optionsAccountTypes.totalCount['totalCount'];
            this.getAccountTypes();
          } else {
            this.optionsAccountTypes.source.load(result.body);
            this.optionsAccountTypes.totalCount = JSON.parse(result.headers.get('X-Pagination'));
            this.optionsAccountTypes.totalCount = this.optionsAccountTypes.totalCount['totalCount'];
            this.getAccountTypes();
          }
        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
      });
  }

  public onDeleteConfirmAccountTypes(event): void {
    var act: string = null;
    if (event.data.active == true) {
      act = 'delete';
    } else {
      act = 'restore';
    }

    if (window.confirm(`Are you sure you want to ${act}?`)) {
      let params = new HttpParams();
      params = params.append('act', act);

      this.menusServices.putDeleteOrRestoreAccountType(event.data.accountTypeId
        , params
        , environment.mediaTypes.accountType.put.ContentType.putJson)
        .subscribe((result: HttpResponse<any>) => {
          if (result.status == 200) {
            this.optionsAccountTypes.source.getAll().then((x: []) => {
              var aux: AccountTypeDto = x.find((element: AccountTypeDto) => element.accountTypeId == event.data.accountTypeId);
              aux.active = !aux.active;
              this.optionsAccountTypes.source.load(x);
              this.getAccountTypes();
            })
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
          event.confirm.reject();
        });
    } else {
      event.confirm.reject();
    }
  }

  public onUpdateConfirmAccountTypes(event): void {
    console.log(event)
    var toPatch = [
      {
        path: '/Type',
        op: 'replace',
        value: event.newData.type,
      },
    ];

    if (window.confirm('Are you sure you want to save?')) {
      this.menusServices.patchAccountType(toPatch,
        event.data.accountTypeId,
        environment.mediaTypes.accountType.patch.ContentType.patchJson)
        .subscribe((result: HttpResponse<any>) => {
          console.log(result)
          if (result.status == 201) {
            console.log("entro aqi")
            event.confirm.resolve(event.newData);
            this.getAccountTypes();
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
          event.confirm.reject();
        });
    } else {
      event.confirm.reject();
    }
  }

  public onCreateConfirmAccountTypes(event): void {
    console.log(event);
    var entityCreate: AccountTypeForCreateDto = event.newData;
    console.log(entityCreate);
    this.menusServices
      .addAccountType(entityCreate, environment.mediaTypes.accountType.post.ContentType.postJson)
      .subscribe((result: HttpResponse<any>) => {
        console.log(result);
        if (result.status == 201) {
          console.log("entro aqi")
          event.confirm.resolve(result.body);
          this.getAccountTypes();

        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
        event.confirm.reject();
      });

  }

  private pageChangeAccountTypes(pageIndex: any) {
    var getNew = pageIndex * this.optionsAccountTypes.showPerPage;
    if (getNew >= this.optionsAccountTypes.source.count() && getNew < this.optionsAccountTypes.totalCount) {
      this.optionsAccountTypes.currentPage = this.optionsAccountTypes.currentPage + 1;

      let params = new HttpParams();
      if (this.optionsAccountTypes.searchQuery != null) {
        params = params.append('SearchQuery', this.optionsAccountTypes.searchQuery);
      }
      if (this.optionsAccountTypes.active != null) {
        params = params.append('Active', this.optionsAccountTypes.active);
      }
      if (this.optionsAccountTypes.orderBy != null) {
        params = params.append('OrderBy', this.optionsAccountTypes.orderBy);
      }
      if (this.optionsAccountTypes.fields != null) {
        params = params.append('Fields', this.optionsAccountTypes.fields);
      }
      params = params.append('PageNumber', this.optionsAccountTypes.currentPage.toString());
      params = params.append('PageSize', this.optionsAccountTypes.pageSize.toString());
      this.menusServices
        .getAllOAccountTypes(params, this.optionsAccountTypes.auxMediaTypeAccept)
        .subscribe((result: HttpResponse<any>) => {
          if (!result) {
            return;
          }
          if (result.status == 200) {
            if (this.optionsAccountTypes.auxMediaTypeAccept.toLowerCase().includes('hateoas')) {
              // this.optionsAccountTypes.source.load(result.body.value);
              result.body.value.forEach((element) => {
                this.optionsAccountTypes.source.add(element);
              });
              this.getAccountTypes();

            } else {
              // this.optionsAccountTypes.source.load(result.body);
              result.body.forEach((element) => {
                this.optionsAccountTypes.source.add(element);
              });
              this.getAccountTypes();

            }
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
        });
    }
  }


  // BankAccount
  private initSettingsBankAccount() {
    this.optionsBankAccounts.settings = {
      mode: 'inline',
      delete: {
        confirmDelete: true
      },
      add: {
        confirmCreate: true
      },
      edit: {
        confirmSave: true,
      },
      actions: {
        add: true,
        edit: true,
        delete: true,
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

  getAccountTypes() {
    var selectListAccountTypes = [];

    this.optionsAccountTypes.source.getAll().then((x: []) => {
      x.forEach((element: AccountTypeDto) => {
        if (element.active == true)
          selectListAccountTypes.push({ value: element.accountTypeId, title: element.type })
      });
    })
    let newSettings = this.optionsBankAccounts.settings;

    try {
      newSettings.columns.accountType.editor.config.list = selectListAccountTypes;

    } catch (error) {
      
    }

    this.optionsBankAccounts.settings = Object.assign({}, newSettings);

  }

  getBanks() {
    var selectListBanks = [];

    this.optionsBanks.source.getAll().then((x: []) => {
      x.forEach((element: BankDto) => {
        if (element.active == true)
          selectListBanks.push({ value: element.bankId, title: element.bank1 })
      });
    })
    let newSettings = this.optionsBankAccounts.settings;
      try {
        newSettings.columns.bank.editor.config.list = selectListBanks;

      } catch (error) {
        
      }

    this.optionsBankAccounts.settings = Object.assign({}, newSettings);

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
  public onDeleteConfirmBankAccount(event): void {
    var act: string = null;
    if (event.data.active == true) {
      act = 'delete';
    } else {
      act = 'restore';
    }

    if (window.confirm(`Are you sure you want to ${act}?`)) {
      let params = new HttpParams();
      params = params.append('act', act);

      this.menusServices.putDeleteOrRestoreBankAccount(event.data.bankAccountId
        , params
        , environment.mediaTypes.bankAccounts.put.ContentType.putJson)
        .subscribe((result: HttpResponse<any>) => {
          if (result.status == 200) {
            this.optionsBankAccounts.source.getAll().then((x: []) => {
              var aux: BankAccountDto = x.find((element: BankAccountDto) => element.bankAccountId == event.data.bankAccountId);
              aux.active = !aux.active;
              this.optionsBankAccounts.source.load(x);
            })
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
          event.confirm.reject();
        });
    } else {
      event.confirm.reject();
    }
  }

  public onUpdateConfirmBankAccount(event): void {
    console.log(event)
    var toPatch = [];
    if (event.newData.accountAlias) {
      toPatch.push({
        path: '/accountAlias',
        op: 'replace',
        value: event.newData.accountAlias,
      })
    }

    if (event.newData.accountNumber) {
      toPatch.push(
        {
          path: '/accountNumber',
          op: 'replace',
          value: event.newData.accountNumber,
        }
      )
    }

    if (event.newData.accountOwner) {
      toPatch.push(
        {
          path: '/accountOwner',
          op: 'replace',
          value: event.newData.accountOwner,
        }
      )
    }



    if (event.newData.dniAccountOwner) {
      toPatch.push(
        {
          path: '/dniAccountOwner',
          op: 'replace',
          value: event.newData.dniAccountOwner,
        }
      )
    }


    if (event.newData.accountType) {
      toPatch.push(
        {
          path: '/accountTypeId',
          op: 'replace',
          value: event.newData.accountType,
        }
      )
    }


    if (event.newData.bank) {
      toPatch.push(
        {
          path: '/bankId',
          op: 'replace',
          value: event.newData.bank,
        }
      )
    }



    if (window.confirm('Are you sure you want to save?')) {
      this.menusServices.patchBankAccount(toPatch,
        event.data.bankAccountId,
        environment.mediaTypes.bankAccounts.patch.ContentType.patchJson)
        .subscribe((result: HttpResponse<any>) => {
          console.log(result)
          if (result.status == 201) {
            console.log("entro aqi")
            event.confirm.resolve(event.newData);
          }
        }, (err: HttpErrorResponse) => {
          console.warn(err);
          event.confirm.reject();
        });
    } else {
      event.confirm.reject();
    }
  }

  public onCreateConfirmBankAccount(event): void {
    console.log(event);
    var entityCreate: BankAccountForCreateDto = new BankAccountForCreateDto();

    entityCreate.accountAlias = event.newData.accountAlias;
    entityCreate.accountNumber = event.newData.accountNumber;
    entityCreate.accountOwner = event.newData.accountOwner;
    entityCreate.accountTypeId = event.newData.accountType;
    entityCreate.bankId = event.newData.bank;
    entityCreate.dniAccountOwner = event.newData.dniAccountOwner;
    entityCreate.userId = localStorage.getItem('userId');
    this.menusServices
      .addBankAccount(entityCreate, environment.mediaTypes.bankAccounts.post.ContentType.postJson)
      .subscribe((result: HttpResponse<any>) => {
        console.log(result);
        if (result.status == 201) {
          console.log("entro aqi")
          // event.confirm.resolve(result.body);
          // event.confirm.reject();
          this.initSettingsBankAccount();
          this.initDataBankAccount();
          this.getBanks();
          this.getAccountTypes();

        }
      }, (err: HttpErrorResponse) => {
        console.warn(err);
        event.confirm.reject();
      });

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

}
