import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksResolver implements Resolve<boolean> {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/assets/tasks.json');
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.getTasks();
  }
}
