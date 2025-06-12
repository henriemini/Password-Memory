import { TestBed } from '@angular/core/testing';

import { AccountUpdateService } from './account-update.service';

describe('AccountUpdateService', () => {
  let service: AccountUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
