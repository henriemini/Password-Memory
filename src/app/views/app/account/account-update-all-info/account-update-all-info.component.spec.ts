import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUpdateAllInfoComponent } from './account-update-all-info.component';

describe('AccountUpdateAllInfoComponent', () => {
  let component: AccountUpdateAllInfoComponent;
  let fixture: ComponentFixture<AccountUpdateAllInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountUpdateAllInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountUpdateAllInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
