import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTypeDetailsComponent } from './customer-type-details.component';

describe('CustomerTypeDetailsComponent', () => {
  let component: CustomerTypeDetailsComponent;
  let fixture: ComponentFixture<CustomerTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerTypeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
