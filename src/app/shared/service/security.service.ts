import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { AppUserAuth } from 'src/app/components/auth/models/app-user-auth';
import { AppUser } from 'src/app/components/auth/models/app-user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UserCreateDto } from '../models/user-create-dto';


const API_URL = environment.apiURL + '/api/Security/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  
  // Creamos un objeto de seguridad donde se almacenará la info q nos devulva la ruta
  securityObject: AppUserAuth = new AppUserAuth();

  constructor(private http: HttpClient, private router: Router) { }

  resetSecurityObject(){
    this.securityObject.userName=''
    this.securityObject.bearerToken = '';
    this.securityObject.isAuthenticated = false;
    this.securityObject.claims = [];
  }

  login(entity: AppUser):Observable<AppUserAuth> {

    this.resetSecurityObject();
    return this.http.post<AppUserAuth>(`${API_URL}login`, entity, httpOptions)
      .pipe(
        tap((resp) => {
          Object.assign(this.securityObject, resp);
          sessionStorage.setItem('bearerToken', this.securityObject.bearerToken);
          localStorage.setItem('userId', this.securityObject.userId);
          localStorage.setItem('username', this.securityObject.userName);


        


        }),
        catchError(this.handleError)
      )
  }

  logout(){
    console.log("entro al logout");
    this.resetSecurityObject();
    // sessionStorage.setItem('bearerToken', '');
    sessionStorage.removeItem('bearerToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    // localStorage.clear();
    }


     // POST /api/Security/create
  addUser(
    entity: UserCreateDto,
    auxMediaType: string
  ): Observable<any> {
    var headers = new HttpHeaders({
      'Content-Type': auxMediaType
    });

    return this.http.post(`${API_URL}create`, entity, {
      headers: headers,
      observe: 'response' as 'body',
      responseType: 'json',
    });
  }


    redirectToLogin(){
      this.router.navigate(['/auth/login']);
    }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `SANMARSEL Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
