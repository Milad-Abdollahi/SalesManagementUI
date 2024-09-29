import { inject, Injectable, signal } from '@angular/core';
import { PaymentMethod } from '../models/payment-method.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PaymentMethodService {
    private httpClient = inject(HttpClient);

    // Todo: ask about pipe and tap
    // fetchPaymentMethods(): Observable<PaymentMethod[]> {
    //     return this.httpClient
    //         .get<PaymentMethod[]>('https://your-api-url.com/api/GetAllPaymentMethods')
    //         .pipe(tap((paymentMethods) => this.paymentMethodsSignal.set(paymentMethods)));
    // }

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
        this.paymentMethodsSignal.set(this.paymentMethodsArray);
    }

    public getPaymentMethodById(id: number): PaymentMethod | undefined {
        const output = this.paymentMethodsArray.find((paymentMethod) => paymentMethod.id === id);
        return output;
    }
}
