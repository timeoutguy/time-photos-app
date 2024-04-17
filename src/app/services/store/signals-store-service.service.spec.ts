import { TestBed } from '@angular/core/testing';

import { SignalsStoreServiceService } from './signals-store-service.service';

describe('SignalsStoreServiceService', () => {
  let service: SignalsStoreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalsStoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
