import { TestBed } from '@angular/core/testing';

import { AccountCreateService } from './account-create.service';

describe('AccountCreateService', () => {
  let service: AccountCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
