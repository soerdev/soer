import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ByRoutePathResolver } from './by-route-path.resolver';

describe('ByRoutePathResolver', () => {
  let resolver: ByRoutePathResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        ByRoutePathResolver
      ]
    });
    resolver = TestBed.inject(ByRoutePathResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
