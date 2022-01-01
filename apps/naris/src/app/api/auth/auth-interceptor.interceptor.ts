import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MixedBusService } from '../../packages/mixed-bus/mixed-bus.service';
import { BusError } from 'src/app/packages/mixed-bus/interfaces/mixed-bus.interface';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private router: Router, private bus$: MixedBusService) { }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        this.bus$.publish(new BusError(undefined, [err.message]));
        if (err.status === 401 || err.status === 403) {
            this.auth.logout();
            this.router.navigateByUrl(`/login`);
            return of(err.message);
        }
        return throwError(err);
    }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = this.auth.token;

        console.log('Token:', idToken);
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
            });

            return next.handle(cloned).pipe(catchError(err => this.handleAuthError(err)));
        }
        else {
            return next.handle(req).pipe(catchError(err => this.handleAuthError(err)));;
        }
    }
}