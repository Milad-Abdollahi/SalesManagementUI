import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerTypeComponent } from './new-customer-type.component';

describe('NewCustomerTypeComponent', () => {
  let component: NewCustomerTypeComponent;
  let fixture: ComponentFixture<NewCustomerTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCustomerTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCustomerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
