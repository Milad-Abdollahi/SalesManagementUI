import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusesComponent } from '../payment-statuses.component';

describe('PaymentStatusesComponent', () => {
    let component: PaymentStatusesComponent;
    let fixture: ComponentFixture<PaymentStatusesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PaymentStatusesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PaymentStatusesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
