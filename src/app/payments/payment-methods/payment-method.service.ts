import { Injectable, signal } from '@angular/core';
import { PaymentMethod } from './payment-method.model';

@Injectable({
    providedIn: 'root',
})
export class PaymentMethodService {
    paymentMethodsArray: PaymentMethod[] = [
        { id: 1, name: 'نقد' },
        { id: 2, name: 'چکی' },
        { id: 3, name: 'اقساطی' },
        { id: 4, name: 'اقساطی دو' },
    ];

    private paymentMethodsSignal = signal<PaymentMethod[]>(this.paymentMethodsArray);

    readonly paymentMethods = this.paymentMethodsSignal.asReadonly();

    addPaymentMethod(id: number, name: string) {
        const newPaymentMethod: PaymentMethod = { id: id, name: name };
        const updatedPaymentMethods = [...this.paymentMethodsArray, newPaymentMethod];
        this.paymentMethodsArray = updatedPaymentMethods;
        this.paymentMethodsSignal.set(updatedPaymentMethods);
    }
}
