import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersInfoComponent } from './customers-info.component';

describe('CustomersInfoComponent', () => {
  let component: CustomersInfoComponent;
  let fixture: ComponentFixture<CustomersInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
