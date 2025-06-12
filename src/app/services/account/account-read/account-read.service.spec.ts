import { TestBed } from '@angular/core/testing';

import { AccountReadService } from './account-read.service';

describe('AccountReadService', () => {
  let service: AccountReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
