import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';



export interface JWTModel {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const TOKEN = 'token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static cookieCheck = false;
  private decodedJSON: JWTModel = {id: -1, email: '', role: 'GUEST', iat: 0, exp: 0};

  public tokenUpdate$ = new EventEmitter();
  public get token(): string|null {
    return localStorage.getItem(TOKEN);
  }
  public set token(n: string|null) {
    n !== null ? localStorage.setItem(TOKEN, n) : localStorage.removeItem(TOKEN);
    this.decodeJWT(n);
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


  decodeJWT(jwt: string|null): void {
    if (jwt) {
      try {
        const base64Url = jwt.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        this.decodedJSON = JSON.parse(atob(base64));
        console.log('Decoded JSON ?=>', this.decodedJSON);
      } catch(err) {
        console.error(err);
      }
    } else {
      this.decodedJSON = {id: -1, email: '', role: 'GUEST', iat: 0, exp: 0};
    }
  }

  getEmail(): string {
    if (this.decodedJSON.id === -1) {
      this.decodeJWT(this.token);
    }
    return this.decodedJSON.email;
  }

  getRole(): string {
    if (this.decodedJSON.id === -1) {
      this.decodeJWT(this.token);
    }
    return this.decodedJSON.role.toUpperCase();
  }
}
