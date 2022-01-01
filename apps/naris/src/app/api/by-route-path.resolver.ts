import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ByRoutePathResolver implements Resolve<boolean> {
  constructor(private http: HttpClient) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const path = route.routeConfig?.path || 'overview';
    return this.http.get<any>(`${environment.assetsUrl}${path}.json`);
  }
}
