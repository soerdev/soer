import { HttpClient, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthInterceptor } from './auth-interceptor.interceptor';


describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule.withRoutes([]),
    ],
    providers: [
        HttpClient,
        HttpHandler,
        RouterTestingModule,
        AuthInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
