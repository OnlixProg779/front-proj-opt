import { Injectable, NgModule } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityService } from './security.service';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private authenticationService: 
        SecurityService) {}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = sessionStorage.getItem('bearerToken');
        if(token == ''){
            token = '0'
        }
        if (token) {
            
            const newReq = req.clone(
                {
                    headers: req.headers.set('Authorization', 'Bearer ' + token)
                }
            )
            return next.handle(newReq).pipe(
                map((event: HttpEvent<any>) => {
                  return event;
                }),
                catchError(
                  (
                    httpErrorResponse: HttpErrorResponse,
                    _: Observable<HttpEvent<any>>
                  ) => {
                    if (httpErrorResponse.status === HttpStatusCode.Unauthorized) {
                      this.authenticationService.redirectToLogin();
                    }
                    return throwError(httpErrorResponse);
                  }
                )
            );
        } 
        else {
            return next.handle(req);
        }
    }
}

@NgModule({
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: HttpRequestInterceptor,
        multi: true
    }]
})
export class HttpInterceptorModule {}