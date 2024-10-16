import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { PaymentStatusService } from '../../../../shared/services/payment-status.service';

@Component({
    selector: 'app-payment-status-details',
    standalone: true,
    imports: [],
    templateUrl: './payment-status-details.component.html',
    styleUrl: './payment-status-details.component.css',
})
export class PaymentStatusDetailsComponent implements OnInit {
    // id is imported from the url
    @Input({ transform: numberAttribute }) id = 0;
    private paymentStatusService = inject(PaymentStatusService);
    public paymentStatus = this.paymentStatusService.loadedPaymentStatus;

    ngOnInit(): void {
        const subscription = this.paymentStatusService.getPaymentStatusById(this.id).subscribe({
            next: () => {
                console.log(this.paymentStatus());
            },
        });
    }
}
