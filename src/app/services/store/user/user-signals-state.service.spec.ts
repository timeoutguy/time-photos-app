import { TestBed } from '@angular/core/testing';

import { UserSignalsStateService } from './user-signals-state.service';

describe('UserSignalsStateServiceService', () => {
  let service: UserSignalsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSignalsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
