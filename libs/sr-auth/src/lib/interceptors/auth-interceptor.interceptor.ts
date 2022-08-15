import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BusError, MixedBusService } from '@soer/mixed-bus';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private router: Router, private bus$: MixedBusService) { }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.error && err.error.status === 'error' && err.error.items) {
            this.bus$.publish(new BusError(undefined, err.error.items));
        } else {
            this.bus$.publish(new BusError(undefined, [err.message]));
        }
        if (err.status === 426) {
            this.auth.renewToken().subscribe(() => console.log('Token upgraded'));
            this.router.navigateByUrl(`/login`);
            return of(err.message);
        }
        if (err.status === 401 || err.status === 403) {
            if ((document.location + '').indexOf('login?skipchecks=true') === -1) {
                this.auth.logout();
                this.router.navigateByUrl(`/login`);
            }
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