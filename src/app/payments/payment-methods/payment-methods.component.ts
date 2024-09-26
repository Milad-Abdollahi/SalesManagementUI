import { Component, computed } from '@angular/core';
import { PaymentMethodService } from './payment-method.service';

@Component({
    selector: 'app-payment-methods',
    standalone: true,
    imports: [],
    templateUrl: './payment-methods.component.html',
    styleUrl: './payment-methods.component.css',
})
export class PaymentMethodsComponent {
    constructor(public paymentMethodsService: PaymentMethodService) {}

    public paymentMethods = computed(() => this.paymentMethodsService.paymentMethods());

    addPaymentMethod() {
        const newId = this.paymentMethods().length + 1;
        const newName = 'ravesh pardakht jadid';
        this.paymentMethodsService.addPaymentMethod(newId, newName);
    }
}
