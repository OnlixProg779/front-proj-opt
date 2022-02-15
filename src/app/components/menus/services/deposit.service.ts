import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DepositCreateDto } from '../models/deposit-create-dto';
import { DepositDto } from '../models/deposit-dto';
import { DepositUpdateDto } from '../models/deposit-update-dto';

const API_URL = environment.apiURL + '/api/clients/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DepositService {
  eTag;

  constructor(private http: HttpClient) {}

  geAllDeposits(
    pageNumber: number,
    pageSize: number,
    searchQuery: string,
    accept: string
  ): Observable<any> {
    var headers;
    this.eTag = localStorage.getItem('If-None-Match-get-all-deposits');
    let params = new HttpParams();
    params = params.append('PageNumber', pageNumber.toString());
    params = params.append('PageSize', pageSize.toString());
    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${accept}`,
      'If-None-Match': `"${this.eTag}"`,
    });

    if (searchQuery) {
      params = params.append('SearchQuery', searchQuery);
    }

    return this.http
      .get<any>(`${API_URL}AllDeposits`, {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-deposits', this.eTag);
          }
        }),
        catchError(this.handleError)
      );
  }

  getAllDepositsOfClient(
    pageNumber: number,
    pageSize: number,
    searchQuery: string,
    accept: string,
    clientId: string
  ): Observable<any> {
    var headers;
    let params = new HttpParams();
    params = params.append('PageNumber', pageNumber.toString());
    params = params.append('PageSize', pageSize.toString());
    this.eTag = localStorage.getItem('If-None-Match-get-deposits');
    //   console.log(this.eTag);
    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${accept}`,
      'If-None-Match': `"${this.eTag}"`,
    });

    if (searchQuery) {
      params = params.append('SearchQuery', searchQuery);
    }
    return this.http
      .get<any>(`${API_URL}${clientId}/Deposit`, {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
        params,
      })
      .pipe(
        tap((resp) => {
          if (resp.status == 200) {
            //   this.eTag = JSON.parse(resp.headers.get("ETag"));
            //    localStorage.setItem('If-None-Match-get-deposits', this.eTag);
            //    almacenamiento en cache: https://es.coredump.biz/questions/49797910/angular-5-caching-http-service-api-calls
          }
        }),
        catchError(this.handleError)
      );
  }

  getDeposit(clientId: string, depositId: string): Observable<any> {
    var headers;
    this.eTag = localStorage.getItem('If-None-Match-get-deposits');
    //   console.log(this.eTag);
    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `application/json`,
      'If-None-Match': `"${this.eTag}"`,
    });

    return this.http.get<DepositDto[]>(
      `${API_URL}${clientId}/Deposit/${depositId}`,
      {
        headers: headers,
        observe: 'response' as 'body',
        responseType: 'json',
      }
    );
  }

  // Inicia lo necesario para enviar imagenes al servidor.
  addDeposit(clientId: string, entity: DepositCreateDto): Observable<any> {
    var formData = this.initFormDataCreate(entity);
    // console.log(formData);
    return this.http.post(`${API_URL}${clientId}/Deposit`, formData);
  }
  private initFormDataCreate(entity: DepositCreateDto): FormData {
    var formData: FormData = new FormData();
    if (entity.bank) {
      formData.append('bank', entity.bank);
    }
    if (entity.image) {
      formData.append('image', entity.image);
    }
    if (entity.nRef) {
      formData.append('nRef', entity.nRef);
    }
    if (entity.verified) {
      formData.append('verified', entity.verified);
    }
    if (entity.userVerified) {
      formData.append('userVerified', entity.userVerified);
    }
    if (entity.amount) {
      formData.append('amount', entity.amount.toString());
    }

    return formData;
  }

  updateDeposit(clientId: string, entity: DepositUpdateDto): Observable<any> {
    const httpOpt = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data; boundary',
        Accept: 'application/json',
      }),
    };

    var formData = this.initFormDataUpdate(entity);
    return this.http.put(
      `${API_URL}${clientId}/Deposit/${entity.depositId}`,
      formData
    );
  }

  private initFormDataUpdate(entity: DepositUpdateDto): FormData {
    var formData: FormData = new FormData();
    if (entity.depositId) {
      formData.append('depositId', entity.depositId);
    }
    if (entity.clientId) {
      formData.append('clientId', entity.clientId);
    }
    if (entity.active) {
      formData.append('active', 'true');
    }else{
      formData.append('active', 'false');
    }
    if (entity.bank) {
      formData.append('bank', entity.bank);
    }
    if (entity.image) {
      formData.append('image', entity.image);
    }
    if (entity.nRef) {
      formData.append('nRef', entity.nRef);
    }
    if (entity.verified) {
      formData.append('verified', entity.verified);
    }
    if (entity.userVerified) {
      formData.append('userVerified', entity.userVerified);
    }
    if (entity.amount) {
      formData.append('amount', entity.amount.toString());
    }

    return formData;
  }

  deleteDeposit(clientId: string, entityId: string, vendor: string
    ): Observable<any> {
    const httpOptionsPatch = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json',
        Accept: 'application/json',
      }),
    };
    const active = [
      {
        path: '/Active',
        op: 'replace',
        value: false,
      },
      {
        path: '/Verified',
        op: 'replace',
        value: "FALSE",
      },
      {
        path: '/UserVerified',
        op: 'replace',
        value: vendor,
      },
    ];

    return this.http.patch(
      `${API_URL}${clientId}/Deposit/${entityId}`,
      active,
      httpOptionsPatch
    );
  }

  restoreDeposit(clientId: string, entityId: string, vendor: string
    ): Observable<any> {
    const httpOptionsPatch = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json',
        Accept: 'application/json',
      }),
    };
    const active = [
      {
        path: '/Active',
        op: 'replace',
        value: true,
      },
      {
        path: '/Verified',
        op: 'replace',
        value: "FALSE",
      },
      {
        path: '/UserVerified',
        op: 'replace',
        value: vendor,
      },
    ];

    return this.http.patch(
      `${API_URL}${clientId}/Deposit/${entityId}`,
      active,
      httpOptionsPatch
    );
  }

  verifiedDeposit(clientId: string, entityId: string, vendor: string
    ): Observable<any> {
    const httpOptionsPatch = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json',
        Accept: 'application/json',
      }),
    };
    const active = [
      {
        path: '/Active',
        op: 'replace',
        value: true,
      },
      {
        path: '/Verified',
        op: 'replace',
        value: "TRUE",
      },
      {
        path: '/UserVerified',
        op: 'replace',
        value: vendor,
      },
    ];

    return this.http.patch(
      `${API_URL}${clientId}/Deposit/${entityId}`,
      active,
      httpOptionsPatch
    );
  }

  unverifiedDeposit(clientId: string, entityId: string, vendor: string
    ): Observable<any> {
    const httpOptionsPatch = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json',
        Accept: 'application/json',
      }),
    };
    const active = [
      {
        path: '/Active',
        op: 'replace',
        value: true,
      },
      {
        path: '/Verified',
        op: 'replace',
        value: "FALSE",
      },
      {
        path: '/UserVerified',
        op: 'replace',
        value: vendor,
      },
    ];

    return this.http.patch(
      `${API_URL}${clientId}/Deposit/${entityId}`,
      active,
      httpOptionsPatch
    );
  }

  notFoundDeposit(clientId: string, entityId: string, vendor: string
    ): Observable<any> {
    const httpOptionsPatch = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json-patch+json',
        Accept: 'application/json',
      }),
    };
    const active = [
      {
        path: '/Active',
        op: 'replace',
        value: false,
      },
      {
        path: '/Verified',
        op: 'replace',
        value: "TRUE",
      },
      {
        path: '/UserVerified',
        op: 'replace',
        value: vendor,
      },
    ];

    return this.http.patch(
      `${API_URL}${clientId}/Deposit/${entityId}`,
      active,
      httpOptionsPatch
    );
  }

  // ERROR
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(
        '(Handle Error en deposit.service) An error occurred:',
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
