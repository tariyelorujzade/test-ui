import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, tap } from 'rxjs/operators';
import { InfoMessageComponent } from './pages/shared/info-message/info-message.component';

@Injectable()
export class AppInterceptor implements HttpInterceptor { 
    constructor(public snackBar: MatSnackBar) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
           
            catchError((error:any)=>{
                this.snackBar.openFromComponent(InfoMessageComponent, {
                    data:error,
                    duration:6000,
                    verticalPosition: 'top',
                    horizontalPosition:'center'
                  });
                return throwError(error);
            })    
            );
    }
}