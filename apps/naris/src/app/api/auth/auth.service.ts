import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';



const TOKEN = 'token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static cookieCheck = false;
  public tokenUpdate$ = new EventEmitter();
  public get token(): string|null {
    return localStorage.getItem(TOKEN);
  }
  public set token(n: string|null) {
    n !== null ? localStorage.setItem(TOKEN, n) : localStorage.removeItem(TOKEN);
    this.tokenUpdate$.emit(n);
  }

  constructor(private http: HttpClient) { }

  logout(): void {
    this.token = null;
  }

  checkCookieAuth() {
    if (this.token) {
      this.http.get(`${environment.apiUrl}auth/cookie`).subscribe(() => { console.log('Cookie renew')});
    }
  }
}
