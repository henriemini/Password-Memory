import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditComponent } from '../../account/account-edit/account-edit.component';

describe('UserEditComponent', () => {
  let component: AccountEditComponent;
  let fixture: ComponentFixture<AccountEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
