import { TestBed } from '@angular/core/testing';

import { ForemanService } from './foreman-service';

describe('ForemanService', () => {
  let service: ForemanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForemanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
