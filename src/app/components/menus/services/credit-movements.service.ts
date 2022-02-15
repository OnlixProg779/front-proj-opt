import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreditMovementForCreateDto } from '../models/credit-movement-for-create-dto';
import { CreditMovementForUpdateDto } from '../models/credit-movement-for-update-dto';
import { CreditMovementsImportedForCreateDto } from '../models/CreditMovementImported/credit-movements-imported-for-create-dto';

const API_URL = environment.apiURL + '/api/account/';

@Injectable({
  providedIn: 'root'
})
export class CreditMovementsService {

  constructor(private http: HttpClient) { }

  // GET /api/account/{bankAccountId}/CreditMovement
  getBankAccountCreditMovements(
    bankAccountId: string,
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
      .get<any>(API_URL +bankAccountId+ '/CreditMovement/', {
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

  // GET ALL 
  getAllCreditMovements(
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
      .get<any>(API_URL +'all'+ '/AllCreditMovement/', {
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

  // POST /api/account/{bankAccountId}/CreditMovement
  addCreditMovement(bankAccountId: string, entity: CreditMovementForCreateDto,
    auxMediaType: string): Observable<any> {

      var formData = this.initFormDataCreate(entity);

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.post(`${API_URL}${bankAccountId}/CreditMovement`, formData, {
      observe: 'response' as 'body',
      responseType: 'json',
    });
  }

  private initFormDataCreate(entity: CreditMovementForCreateDto): FormData {
    var formData: FormData = new FormData();
    if (entity.depositDate) {
      formData.append('depositDate', entity.depositDate.toString());
    }
    if (entity.image) {
      formData.append('image', entity.image);
    }
    if (entity.document) {
      formData.append('document', entity.document);
    }
    if (entity.value) {
      formData.append('value', entity.value.toString());
    }
    if (entity.bankAccountId) {
      formData.append('bankAccountId', entity.bankAccountId);
    }
    if (entity.creditReasonId) {
      formData.append('creditReasonId', entity.creditReasonId);
    }
    if (entity.creditMovementStatusId) {
      formData.append('creditMovementStatusId', entity.creditMovementStatusId);
    }
    if (entity.clientId) {
      formData.append('clientId', entity.clientId);
    }

    return formData;
  }

  // GET ID /api/account/{bankAccountId}/CreditMovement/{creditMovementId}
  getUniqueBankAccountCreditMovements(
    bankAccountId: string,
    creditMovementId: string,
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
      .get<any>(API_URL +bankAccountId+ '/CreditMovement/'+creditMovementId, {
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

  // GET ID UNIQUE ALL /api/account/all/AllCreditMovement/{creditMovementId}
  getUniqueCreditMovements(
    creditMovementId:string,
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
      .get<any>(API_URL +'all'+ '/AllCreditMovement/'+creditMovementId, {
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

  // POST Verifi deposit by system /api/account/all/AllCreditMovement
  verifiAutomaticallyCreditMovements(ids: string[],
    auxMediaType: string): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.post(`${API_URL}All/AllCreditMovement`, ids, {
      headers: headers,
      observe: 'response' as 'body',
      responseType: 'json',
    });
  }


  //PATCH /api/account/{bankAccountId}/CreditMovement/{creditMovementId}
  patchCreditMovement(
    bankAccountId:string,
    creditMovementId:string,
    toPatch: any,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.patch(
      `${API_URL}${bankAccountId}/CreditMovement/${creditMovementId}`,
      toPatch,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
      }
    );
  }
  //PUT (DELETE - RESTORE) /api/account/{bankAccountId}/CreditMovement/{creditMovementId}
  putDeleteOrRestoreCreditMovement(
    bankAccountId: string,
    creditMovementId:string,
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType,
    });

    return this.http.put(
      `${API_URL}${bankAccountId}/CreditMovement/${creditMovementId}`,
      null,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      }
    );
  }
  // PUT (UPDATE) /api/account/{bankAccountId}/CreditMovement/{creditMovementId}/updt
  putCreditMovement(
    bankAccountId: string,
    creditMovementId:string,
    entity: CreditMovementForUpdateDto,
    params: HttpParams,
    auxMediaType: string
  ): Observable<any> {
    var formData = this.initFormDataUpdate(entity);

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType,
    });

    return this.http.put(
      `${API_URL}${bankAccountId}/CreditMovement/${creditMovementId}/updt`,
      formData,
      {
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      }
    );
  }

  private initFormDataUpdate(entity: CreditMovementForUpdateDto): FormData {
    var formData: FormData = new FormData();
    if (entity.depositDate) {
      formData.append('depositDate', entity.depositDate.toString());
    }
    if (entity.image) {
      formData.append('image', entity.image);
    }
    if (entity.document) {
      formData.append('document', entity.document);
    }
    if (entity.value) {
      formData.append('value', entity.value.toString());
    }
    if (entity.bankAccountId) {
      formData.append('bankAccountId', entity.bankAccountId);
    }
    if (entity.creditReasonId) {
      formData.append('creditReasonId', entity.creditReasonId);
    }
    if (entity.creditMovementStatusId) {
      formData.append('creditMovementStatusId', entity.creditMovementStatusId);
    }
    if (entity.clientId) {
      formData.append('clientId', entity.clientId);
    }
    if (entity.verifiedType) {
      formData.append('verifiedType', entity.verifiedType);
    }
    if (entity.creditMovementsImportedId) {
      formData.append('creditMovementsImportedId', entity.creditMovementsImportedId);
    }
    if (entity.active) {
      formData.append('active', 'true');
    }else{
      formData.append('active', 'false');
    }

    return formData;
  }

  // CREDIT MOVEMENTS IMPORTED

  // POST  /api/account/{bankReferenceId}/CreditMovementsImported
  uploadCreditMovementsImported(entity: CreditMovementsImportedForCreateDto[],
    bankReferenceId: string,
    auxMediaType: string): Observable<any> {

    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });
    console.log("entreo qwq")
    return this.http.post(`${API_URL}${bankReferenceId}/CreditMovementsImported`, entity, {
      headers: headers,
      observe: 'response' as 'body',
      responseType: 'json',
    });
  }

  // GET /api/account/{bankReferenceId}/CreditMovementsImported
  getAllCreditMovementsImported(
    bankReferenceId: string,
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
      .get<any>(API_URL +bankReferenceId +'/CreditMovementsImported/', {
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

  // GET ID /api/account/{bankReferenceId}/CreditMovementsImported/{creditMovementsImportedId}
  getUniqueCreditMovementImported(
    params: HttpParams,
    bankReferenceId: string,
    creditMovementsImportedId: string,
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
      .get<any>(API_URL +bankReferenceId +'/CreditMovementsImported/'+creditMovementsImportedId, {
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

  // PATCH /api/account/{bankReferenceId}/CreditMovementsImported/{creditMovementsImportedId}



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
