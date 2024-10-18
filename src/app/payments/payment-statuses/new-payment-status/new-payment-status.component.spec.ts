import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaymentStatusComponent } from './new-payment-status.component';

describe('NewPaymentStatusComponent', () => {
  let component: NewPaymentStatusComponent;
  let fixture: ComponentFixture<NewPaymentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPaymentStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
