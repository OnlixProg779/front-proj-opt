import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { ClientCreateDto } from '../models/client-create-dto';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';



const API_URL = environment.apiURL + '/api/Clients/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  eTag;

  constructor(private http: HttpClient) { }

  // CLIENTS
  // GET ALL /api/Clients
  getAllClients(params: HttpParams, auxMediaType: string): Observable<any> {
    var headers;
    var eTag;
    eTag = localStorage.getItem('If-None-Match-get------');

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: `${auxMediaType}`,
      'If-None-Match': `"${eTag}"`,
    });

    return this.http
      .get<any>(API_URL, {
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

  // GET ID /api/Clients/{clientId}
  getUniqueClient(
    params: HttpParams,
    clientId: string,
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
      .get<any>(API_URL + clientId, {
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

  // POST /api/Clients
  addClient(
    entity: ClientCreateDto,
    auxMediaType: string
  ): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.post(`${API_URL}`, entity, {
      headers: headers,
      observe: 'response' as 'body',
      responseType: 'json',
    });
  }

  // PUT /api/Clients/{clientId} 
  updateClient(
    entity: ClientCreateDto,
    auxMediaType: string
    ): Observable<any> {
      var headers = new HttpHeaders({
        'Content-Type': auxMediaType
      });
    return this.http.put(`${API_URL}${entity.clientId}`, entity, {
      headers: headers,
      observe: 'response' as 'body',
      responseType: 'json',
    });
  }




  // ERROR MSG
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
