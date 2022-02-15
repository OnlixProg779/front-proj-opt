import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { AccountTypeForCreateDto } from '../models/AccountType/account-type-for-create-dto';
import { DebitMovementStatusForCreateDto } from '../models/DebitMovementStatus/debit-movement-status-for-create-dto';
import { DebitReasonForCreateDto } from '../models/DebitReason/debit-reason-for-create-dto';
import { CreditReasonForCreateDto } from '../models/CreditReason/credit-reason-for-create-dto';
import { CreditMovementStatusForCreateDto } from '../models/CreditMovementStatus/credit-movement-status-for-create-dto';
import { BankForCreateDto } from '../models/Bank/bank-for-create-dto';
import { BankAccountForCreateDto } from '../models/BankAccounts/bank-account-for-create-dto';

const API_URL = environment.apiURL + '/api/lists/';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor(private http: HttpClient) { }

  // AccountType
  // get all /api/lists/AccountType
  getAllOAccountTypes(
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {
    var headers;
    var eTag;
    eTag = localStorage.getItem('If-None-Match-get------');

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${auxMediaType}`,
      'If-None-Match': `"${eTag}"`,
    });

    return this.http
      .get<any>(API_URL + 'AccountType/', {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
          }
        }),
        catchError(this.handleError)
      );
  }
  // get id /api/lists/AccountType/{accountTypeId}
  getUniqueOAccountTypes(
    params: HttpParams,
    accountTypeId: string,
    auxMediaType: string
  ): Observable<any> {
    var headers;
    var eTag;
    eTag = localStorage.getItem('If-None-Match-get------');

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${auxMediaType}`,
      'If-None-Match': `"${eTag}"`,
    });

    return this.http
      .get<any>(API_URL + 'AccountType/' + accountTypeId, {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
          }
        }),
        catchError(this.handleError)
      );
  }
  // patch /api/lists/AccountType/{accountTypeId}
  patchAccountType(
    toPatch: any,
    accountTypeId: string,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.patch(
      `${API_URL}AccountType/${accountTypeId}`,
      toPatch,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
      }
    );
  }
  // put /api/lists/AccountType/{accountTypeId}
  putDeleteOrRestoreAccountType(
    accountTypeId: string,
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType,
    });

    return this.http.put(
      `${API_URL}AccountType/${accountTypeId}`,
      null,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      }
    );
  }
  // post /api/lists/AccountType
  addAccountType(entity: AccountTypeForCreateDto,
    auxMediaType: string): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.post(`${API_URL}AccountType`, entity, {
      headers: headers,
      observe: 'response' as 'body',
      responseType: 'json',
    });
  }

  // Bank
  // get all /api/lists/Bank
  getAllBanks(
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {
    var headers;
    var eTag;
    eTag = localStorage.getItem('If-None-Match-get------');

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${auxMediaType}`,
      'If-None-Match': `"${eTag}"`,
    });

    return this.http
      .get<any>(API_URL + 'Bank/', {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
          }
        }),
        catchError(this.handleError)
      );
  }
  // get id /api/lists/Bank/{bankId}
  getUniqueOBanks(
    params: HttpParams,
    bankId: string,
    auxMediaType: string
  ): Observable<any> {
    var headers;
    var eTag;
    eTag = localStorage.getItem('If-None-Match-get------');

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${auxMediaType}`,
      'If-None-Match': `"${eTag}"`,
    });

    return this.http
      .get<any>(API_URL + 'Bank/' + bankId, {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
          }
        }),
        catchError(this.handleError)
      );
  }
  // patch /api/lists/Bank/{bankId}
  patchBank(
    toPatch: any,
    bankId: string,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.patch(
      `${API_URL}Bank/${bankId}`,
      toPatch,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
      }
    );
  }
  // put /api/lists/Bank/{bankId}
  putDeleteOrRestoreBank(
    bankId: string,
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType,
    });

    return this.http.put(
      `${API_URL}Bank/${bankId}`,
      null,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      }
    );
  }
  // post /api/lists/Bank
  addBank(entity: BankForCreateDto,
    auxMediaType: string): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.post(`${API_URL}Bank`, entity, {
      headers: headers,
      observe: 'response' as 'body',
      responseType: 'json',
    });
  }

  // CreditMovementStatus
  // get all /api/lists/CreditMovementStatus
  getAllCreditMovementStatus(
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {
    var headers;
    var eTag;
    eTag = localStorage.getItem('If-None-Match-get------');

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${auxMediaType}`,
      'If-None-Match': `"${eTag}"`,
    });

    return this.http
      .get<any>(API_URL + 'CreditMovementStatus/', {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
          }
        }),
        catchError(this.handleError)
      );
  }
  // get id /api/lists/CreditMovementStatus/{creditMovementStatusId}
  getUniqueCreditMovementStatus(
    params: HttpParams,
    creditMovementStatusId: string,
    auxMediaType: string
  ): Observable<any> {
    var headers;
    var eTag;
    eTag = localStorage.getItem('If-None-Match-get------');

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${auxMediaType}`,
      'If-None-Match': `"${eTag}"`,
    });

    return this.http
      .get<any>(API_URL + 'CreditMovementStatus/' + creditMovementStatusId, {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
          }
        }),
        catchError(this.handleError)
      );
  }
  // patch /api/lists/CreditMovementStatus/{creditMovementStatusId}
  patchCreditMovementStatus(
    toPatch: any,
    creditMovementStatusId: string,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.patch(
      `${API_URL}CreditMovementStatus/${creditMovementStatusId}`,
      toPatch,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
      }
    );
  }
  // put /api/lists/CreditMovementStatus/{creditMovementStatusId}
  putDeleteOrRestoreCreditMovementStatus(
    creditMovementStatusId: string,
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType,
    });

    return this.http.put(
      `${API_URL}CreditMovementStatus/${creditMovementStatusId}`,
      null,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      }
    );
  }
  // post /api/lists/CreditMovementStatus
  addCreditMovementStatus(entity: CreditMovementStatusForCreateDto,
    auxMediaType: string): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.post(`${API_URL}CreditMovementStatus`, entity, {
      headers: headers,
      observe: 'response' as 'body',
      responseType: 'json',
    });
  }

  // Credit Reason
  // get all /api/lists/CreditReason
  getAllCreditReasons(
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {
    var headers;
    var eTag;
    eTag = localStorage.getItem('If-None-Match-get------');

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${auxMediaType}`,
      'If-None-Match': `"${eTag}"`,
    });

    return this.http
      .get<any>(API_URL + 'CreditReason/', {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
          }
        }),
        catchError(this.handleError)
      );
  }
  // get id /api/lists/CreditReason/{creditReasonId}
  getUniqueOCreditReason(
    params: HttpParams,
    creditReasonId: string,
    auxMediaType: string
  ): Observable<any> {
    var headers;
    var eTag;
    eTag = localStorage.getItem('If-None-Match-get------');

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${auxMediaType}`,
      'If-None-Match': `"${eTag}"`,
    });

    return this.http
      .get<any>(API_URL + 'CreditReason/' + creditReasonId, {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
          }
        }),
        catchError(this.handleError)
      );
  }
  // patch /api/lists/CreditReason/{creditReasonId}
  patchCreditReason(
    toPatch: any,
    creditReasonId: string,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.patch(
      `${API_URL}CreditReason/${creditReasonId}`,
      toPatch,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
      }
    );
  }
  // put /api/lists/CreditReason/{creditReasonId}
  putDeleteOrRestoreCreditReason(
    creditReasonId: string,
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType,
    });

    return this.http.put(
      `${API_URL}CreditReason/${creditReasonId}`,
      null,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      }
    );
  }
  // post /api/lists/CreditReason
  addCreditReason(entity: CreditReasonForCreateDto,
    auxMediaType: string): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.post(`${API_URL}CreditReason`, entity, {
      headers: headers,
      observe: 'response' as 'body',
      responseType: 'json',
    });
  }

  // DebitMovementStatus
  // get all /api/lists/DebitMovementStatus
  getAllDebitMovementStatus(
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {
    var headers;
    var eTag;
    eTag = localStorage.getItem('If-None-Match-get------');

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${auxMediaType}`,
      'If-None-Match': `"${eTag}"`,
    });

    return this.http
      .get<any>(API_URL + 'DebitMovementStatus/', {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
          }
        }),
        catchError(this.handleError)
      );
  }
  // get id /api/lists/DebitMovementStatus/{debitMovementStatusId}
  getUniqueDebitMovementStatus(
    params: HttpParams,
    debitMovementStatusId: string,
    auxMediaType: string
  ): Observable<any> {
    var headers;
    var eTag;
    eTag = localStorage.getItem('If-None-Match-get------');

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${auxMediaType}`,
      'If-None-Match': `"${eTag}"`,
    });

    return this.http
      .get<any>(API_URL + 'DebitMovementStatus/' + debitMovementStatusId, {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
          }
        }),
        catchError(this.handleError)
      );
  }
  // patch /api/lists/DebitMovementStatus/{debitMovementStatusId}
  patchDebitMovementStatus(
    toPatch: any,
    debitMovementStatusId: string,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.patch(
      `${API_URL}DebitMovementStatus/${debitMovementStatusId}`,
      toPatch,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
      }
    );
  }
  // put /api/lists/DebitMovementStatus/{debitMovementStatusId}
  putDeleteOrRestoreDebitMovementStatus(
    debitMovementStatusId: string,
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType,
    });

    return this.http.put(
      `${API_URL}DebitMovementStatus/${debitMovementStatusId}`,
      null,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      }
    );
  }
  // post /api/lists/DebitMovementStatus
  addDebitMovementStatus(entity: DebitMovementStatusForCreateDto,
    auxMediaType: string): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.post(`${API_URL}DebitMovementStatus`, entity, {
      headers: headers,
      observe: 'response' as 'body',
      responseType: 'json',
    });
  }

  // Debit Reason

  // get all /api/lists/DebitReason
  getAllDebitReasons(
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {
    var headers;
    var eTag;
    eTag = localStorage.getItem('If-None-Match-get------');

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${auxMediaType}`,
      'If-None-Match': `"${eTag}"`,
    });

    return this.http
      .get<any>(API_URL + 'DebitReason/', {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
          }
        }),
        catchError(this.handleError)
      );
  }
  // get id /api/lists/DebitReason/{debitReasonId}
  getUniqueDebitReason(
    params: HttpParams,
    debitReasonId: string,
    auxMediaType: string
  ): Observable<any> {
    var headers;
    var eTag;
    eTag = localStorage.getItem('If-None-Match-get------');

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${auxMediaType}`,
      'If-None-Match': `"${eTag}"`,
    });

    return this.http
      .get<any>(API_URL + 'DebitReason/' + debitReasonId, {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
          }
        }),
        catchError(this.handleError)
      );
  }
  // patch /api/lists/DebitReason/{debitReasonId}
  patchDebitReason(
    toPatch: any,
    debitReasonId: string,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.patch(
      `${API_URL}DebitReason/${debitReasonId}`,
      toPatch,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
      }
    );
  }
  // put /api/lists/DebitReason/{debitReasonId}
  putDeleteOrRestoreDebitReason(
    debitReasonId: string,
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType,
    });

    return this.http.put(
      `${API_URL}DebitReason/${debitReasonId}`,
      null,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      }
    );
  }
  // post /api/lists/DebitReason
  addDebitReason(entity: DebitReasonForCreateDto,
    auxMediaType: string): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.post(`${API_URL}DebitReason`, entity, {
      headers: headers,
      observe: 'response' as 'body',
      responseType: 'json',
    });
  }

    // Bank Account

    // Get All /api/lists/BankAccount
    getAllBankAccounts(
      params: HttpParams,
      auxMediaType: string
    ): Observable<any> {
      var headers;
      var eTag;
      eTag = localStorage.getItem('If-None-Match-get------');
  
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: `${auxMediaType}`,
        'If-None-Match': `"${eTag}"`,
      });
  
      return this.http
        .get<any>(API_URL + 'BankAccount/', {
          headers: headers,
          observe: 'response' as 'body',
          responseType: 'json',
          params,
        })
        .pipe(
          tap((resp) => {
            if (resp.status == 200) {
              //   this.eTag = JSON.parse(resp.headers.get("ETag"));
              //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
            }
          }),
          catchError(this.handleError)
        );
    }
    // get Id /api/lists/BankAccount/{bankAccountId}
    getUniqueBankAccount(
      params: HttpParams,
      bankAccountId: string,
      auxMediaType: string
    ): Observable<any> {
      var headers;
      var eTag;
      eTag = localStorage.getItem('If-None-Match-get------');
  
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: `${auxMediaType}`,
        'If-None-Match': `"${eTag}"`,
      });
  
      return this.http
        .get<any>(API_URL + 'BankAccount/' + bankAccountId, {
          headers: headers,
          observe: 'response' as 'body',
          responseType: 'json',
          params,
        })
        .pipe(
          tap((resp) => {
            if (resp.status == 200) {
              //   this.eTag = JSON.parse(resp.headers.get("ETag"));
              //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
            }
          }),
          catchError(this.handleError)
        );
    }
    // Patch /api/lists/BankAccount/{bankAccountId}
    patchBankAccount(
      toPatch: any,
      bankAccountId: string,
      auxMediaType: string
    ): Observable<any> {
  
      var headers = new HttpHeaders({
        'Content-Type': auxMediaType
      });
  
      return this.http.patch(
        `${API_URL}BankAccount/${bankAccountId}`,
        toPatch,
        {
          headers: headers,
          observe: 'response' as 'body',
          responseType: 'json',
        }
      );
    }
    // Put /api/lists/BankAccount/{bankAccountId}
    putDeleteOrRestoreBankAccount(
      bankAccountId: string,
      params: HttpParams,
      auxMediaType: string
    ): Observable<any> {
  
      var headers = new HttpHeaders({
        'Content-Type': auxMediaType,
      });
  
      return this.http.put(
        `${API_URL}BankAccount/${bankAccountId}`,
        null,
        {
          headers: headers,
          observe: 'response' as 'body',
          responseType: 'json',
          params,
        }
      );
    }
    // Post /api/lists/BankAccount/
    addBankAccount(entity: BankAccountForCreateDto,
      auxMediaType: string): Observable<any> {
  
      var headers = new HttpHeaders({
        'Content-Type': auxMediaType
      });
  
      console.log(entity)
      return this.http.post(`${API_URL}BankAccount`, entity, {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
      });
    }

    // Credit Reason
  // get all /api/lists/TypePostBox
  getAllTypePostBoxs(
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {
    var headers;
    var eTag;
    eTag = localStorage.getItem('If-None-Match-get------');

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${auxMediaType}`,
      'If-None-Match': `"${eTag}"`,
    });

    return this.http
      .get<any>(API_URL + 'TypePostBox/', {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
          }
        }),
        catchError(this.handleError)
      );
  }
  // get id /api/lists/TypePostBox/{typePostBoxId}
  getUniqueOTypePostBox(
    params: HttpParams,
    typePostBoxId: string,
    auxMediaType: string
  ): Observable<any> {
    var headers;
    var eTag;
    eTag = localStorage.getItem('If-None-Match-get------');

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${auxMediaType}`,
      'If-None-Match': `"${eTag}"`,
    });

    return this.http
      .get<any>(API_URL + 'TypePostBox/' + typePostBoxId, {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
          }
        }),
        catchError(this.handleError)
      );
  }
  // patch /api/lists/TypePostBox/{typePostBoxId}
  patchTypePostBox(
    toPatch: any,
    typePostBoxId: string,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.patch(
      `${API_URL}TypePostBox/${typePostBoxId}`,
      toPatch,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
      }
    );
  }
  // put /api/lists/TypePostBox/{typePostBoxId}
  putDeleteOrRestoreTypePostBox(
    typePostBoxId: string,
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType,
    });

    return this.http.put(
      `${API_URL}TypePostBox/${typePostBoxId}`,
      null,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      }
    );
  }

  

// OrderState
  // get all /api/lists/OrderState
  getAllOrderStates(
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {
    var headers;
    var eTag;
    eTag = localStorage.getItem('If-None-Match-get------');

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${auxMediaType}`,
      'If-None-Match': `"${eTag}"`,
    });

    return this.http
      .get<any>(API_URL + 'OrderState/', {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
          }
        }),
        catchError(this.handleError)
      );
  }
  // get id /api/lists/OrderState/{orderStateId}
  getUniqueOrderStates(
    params: HttpParams,
    orderStateId: string,
    auxMediaType: string
  ): Observable<any> {
    var headers;
    var eTag;
    eTag = localStorage.getItem('If-None-Match-get------');

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${auxMediaType}`,
      'If-None-Match': `"${eTag}"`,
    });

    return this.http
      .get<any>(API_URL + 'OrderState/' + orderStateId, {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-orders', this.eTag);
          }
        }),
        catchError(this.handleError)
      );
  }
  // patch /api/lists/OrderState/{orderStateId}
  patchOrderState(
    toPatch: any,
    orderStateId: string,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.patch(
      `${API_URL}OrderState/${orderStateId}`,
      toPatch,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
      }
    );
  }
  // put /api/lists/OrderState/{orderStateId}
  putDeleteOrRestoreOrderState(
    orderStateId: string,
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType,
    });

    return this.http.put(
      `${API_URL}OrderState/${orderStateId}`,
      null,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      }
    );
  }

  
  // ERROR
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(
        '(Handle Error en client.service) An error occurred:',
        error.error.message
      );
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status} ${error.statusText}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
