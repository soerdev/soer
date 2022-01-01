import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class StreamService implements Resolve<any>{

  constructor(private http: HttpClient) {}


  getStreams(): Observable<any> {
    return this.http.get<any>(environment.assetsUrl + 'streams.json');
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.getStreams();
  }
}
