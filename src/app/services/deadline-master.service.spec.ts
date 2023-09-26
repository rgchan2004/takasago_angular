import { TestBed } from '@angular/core/testing';

import { DeadlineMasterService } from './deadline-master.service';

describe('DeadlineMasterService', () => {
  let service: DeadlineMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeadlineMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
