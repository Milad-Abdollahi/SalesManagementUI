import { inject, Injectable, signal } from '@angular/core';
import { PaymentMethod } from '../models/payment-method.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PaymentMethodService {
    private httpClient = inject(HttpClient);

    private paymentMethods = signal<PaymentMethod[]>([]);
    public readonly loadedPaymentMethods = this.paymentMethods.asReadonly();

    public getAllPaymentMethods() {
        return this.fetchPaymentMethods(
            'https://localhost:7276/api/PaymentMetods',
            'something went wrong'
        ).pipe(tap({ next: (paymentMethods) => this.paymentMethods.set(paymentMethods) }));
    }

    public getPaymentMethodById(id: number): Observable<PaymentMethod> {
        const url = 'https://localhost:7276/api/PaymentMetods/' + id;
        return this.fetchPaymentMethod(url, 'there was en error!');
    }

    private fetchPaymentMethods(url: string, errorMessge: string): Observable<PaymentMethod[]> {
        return this.httpClient
            .get<PaymentMethod[]>(url, {
                observe: 'body',
            })
            .pipe(
                catchError((err) => {
                    console.log(err);
                    return throwError(() => new Error(errorMessge));
                })
            );
    }

    private fetchPaymentMethod(url: string, errorMessge: string): Observable<PaymentMethod> {
        return this.httpClient
            .get<PaymentMethod>(url, {
                observe: 'body',
            })
            .pipe(
                catchError((err) => {
                    console.log(err);
                    return throwError(() => new Error(errorMessge));
                })
            );
    }

    addPaymentMethod(id: number, metodName: string) {
        // const newPaymentMethod: PaymentMethod = { id: id, metodName: metodName };
        // const updatedPaymentMethods = [...this.paymentMethodsArray, newPaymentMethod];
        // this.paymentMethodsArray = updatedPaymentMethods;
        // this.paymentMethodsSignal.set(this.paymentMethodsArray);
    }
}
