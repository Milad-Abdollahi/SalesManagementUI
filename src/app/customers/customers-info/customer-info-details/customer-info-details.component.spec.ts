import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInfoDetailsComponent } from './customer-info-details.component';

describe('CustomerInfoDetailsComponent', () => {
  let component: CustomerInfoDetailsComponent;
  let fixture: ComponentFixture<CustomerInfoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerInfoDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
