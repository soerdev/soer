import { TestBed } from '@angular/core/testing';

import { MixedBusService } from './mixed-bus.service';

describe('MixedBusService', () => {
  let service: MixedBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MixedBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
