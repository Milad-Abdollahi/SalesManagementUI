import { Component, computed, Input, numberAttribute, OnInit } from '@angular/core';
import { PaymentMethod } from '../../../shared/models/payment-method.model';
import { PaymentMethodService } from '../../../shared/services/payment-method.service';

@Component({
    selector: 'app-payment-method-details',
    standalone: true,
    imports: [],
    templateUrl: './payment-method-details.component.html',
    styleUrl: './payment-method-details.component.css',
})
export class PaymentMethodDetailsComponent {
    // id is imported from the url
    @Input({ transform: numberAttribute }) id = 0;

    constructor(private paymentMethodService: PaymentMethodService) {}

    // Todo: refactor the following code: () => this.paymentMethodService.getPaymentMethodById(this.id);
    public paymentMethod = computed(() => {
        const output = this.paymentMethodService.getPaymentMethodById(this.id);
        return output;
    });
}
