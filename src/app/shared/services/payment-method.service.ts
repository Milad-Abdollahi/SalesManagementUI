import { inject, Injectable, signal } from '@angular/core';
import { PaymentMethod } from '../models/payment-method.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PaymentMethodCreateDto } from '../models/dtos/payment-methos-create-dto.model';

@Injectable({
    providedIn: 'root',
})
export class PaymentMethodService {
    private httpClient = inject(HttpClient);

    private paymentMethods = signal<PaymentMethod[]>([]);
    public readonly loadedPaymentMethods = this.paymentMethods.asReadonly();

    private selectedPaymentMethod = signal<PaymentMethod | undefined>(undefined);
    public readonly loadedPaymentMethod = this.selectedPaymentMethod.asReadonly();

    // public updatePaymentMethod(paymentMethod: PaymentMethod) {}

    // Read

    public getAllPaymentMethods() {
        return this.fetchPaymentMethods(
            'https://localhost:7276/api/PaymentMetods',
            'something went wrong fetching payment methods!'
        ).pipe(tap({ next: (paymentMethods) => this.paymentMethods.set(paymentMethods) }));
    }

    public getPaymentMethodById(id: number): Observable<PaymentMethod> {
        const url = `https://localhost:7276/api/PaymentMetods/${id}`;
        return this.fetchPaymentMethod(url, 'there was en error!').pipe(
            tap({ next: (paymentMethod) => this.selectedPaymentMethod.set(paymentMethod) })
        );
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

    //Update

    public updatePaymentMethodById(id: number, paymentMethodCreateDto: PaymentMethodCreateDto) {
        return this.updatePaymentMethod(
            `https://localhost:7276/api/PaymentMetods/${id}`,
            'something went wrong updating a payment method',
            paymentMethodCreateDto
        );
    }

    private updatePaymentMethod(
        url: string,
        errorMessge: string,
        paymentMethodCreateDto: PaymentMethodCreateDto
    ) {
        return this.httpClient
            .put((url = url), (paymentMethodCreateDto = paymentMethodCreateDto), {
                observe: 'body',
            })
            .pipe(
                catchError((err) => {
                    console.log(err.error);
                    return throwError(
                        () =>
                            new Error(
                                errorMessge + '\n' + err.error.message + '\n' + err.error.title
                            )
                    );
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
