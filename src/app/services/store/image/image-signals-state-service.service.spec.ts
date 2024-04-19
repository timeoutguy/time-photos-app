import { TestBed } from '@angular/core/testing';

import { ImageSignalsStateServiceService } from './image-signals-state-service.service';

describe('ImageSignalsStateServiceService', () => {
  let service: ImageSignalsStateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSignalsStateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
