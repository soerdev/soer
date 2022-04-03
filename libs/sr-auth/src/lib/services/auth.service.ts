import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BusEvent, MixedBusService } from '@soer/mixed-bus';
import { ChangeDataEvent, OK } from '@soer/sr-dto';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthEmitter } from '../interfaces/auth-options.interface';
import { JWTModel } from '../interfaces/jwt.models';



const TOKEN = 'token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static cookieCheck = false;
  private decodedJSON: JWTModel = {id: -1, email: '', role: 'GUEST', iat: 0, exp: 0};

  public tokenUpdate$ = new BehaviorSubject<string|null>(null);

  private _token: string|null = '';

  public get token(): string|null {
    return this._token;
  }
  public set token(n: string|null) {
    this._token = n;
    n !== null ? localStorage.setItem(TOKEN, n) : localStorage.removeItem(TOKEN);
    this.decodeJWT(n);
    this.tokenUpdate$.next(n);

    this.bus$.publish(
      new ChangeDataEvent(this.options, {status: OK, items: [this.extractAndParseJWT(n)]})
    );
    
  }

  constructor(
    @Inject('AuthServiceConfig') private options: AuthEmitter,
    private bus$: MixedBusService,
    private http: HttpClient) { 
      this.token = localStorage.getItem(TOKEN) || null;
    }

  logout(): void {
    this.token = null;
  }

  checkCookieAuth() {
    if (this.token && this.options.schema.cookieApi) {
      this.http.get(this.options.schema.cookieApi).subscribe(() => { console.log('Cookie renew')});
    }
  }

  renewToken(): Observable<{accessToken: string}> {
    return this.http.get<{accessToken: string}>(this.options.schema.renewApi).pipe(
        tap(result => this.token = result.accessToken)
      );
  }

  extractAndParseJWT(jwt: string | null): any {
    if (jwt === null) {
      return {};
    }
    try {
      const base64Url = jwt.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const result = JSON.parse(atob(base64));
      return result;
    } catch(err) {
      // do nothing
    }
    return null;
  }

  decodeJWT(jwt: string|null): void {
    this.decodedJSON = this.extractAndParseJWT(jwt) || {id: -1, email: '', role: 'GUEST', iat: 0, exp: 0};
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
