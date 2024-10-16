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

    // Create

    public CreatePaymentMethod(paymentMethodCreateDto: PaymentMethodCreateDto) {
        return this.addPaymentMethod(
            'https://localhost:7276/api/PaymentMethods',
            'something went wrong creating payment method!',
            paymentMethodCreateDto
        );
    }

    private addPaymentMethod(
        url: string,
        errorMessage: string,
        paymentMethodCreateDto: PaymentMethodCreateDto
    ): Observable<PaymentMethod> {
        return this.httpClient
            .post<PaymentMethod>(url, paymentMethodCreateDto, { observe: 'body' })
            .pipe(catchError(handleError(errorMessage)));
    }

    // Read

    public getAllPaymentMethods() {
        return this.fetchPaymentMethods(
            'https://localhost:7276/api/PaymentMethods',
            'something went wrong fetching payment methods!'
        ).pipe(tap({ next: (paymentMethods) => this.paymentMethods.set(paymentMethods) }));
    }

    public getPaymentMethodById(id: number): Observable<PaymentMethod> {
        const url = `https://localhost:7276/api/PaymentMethods/${id}`;
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
            `https://localhost:7276/api/PaymentMethods/${id}`,
            'something went wrong updating a payment method',
            paymentMethodCreateDto
        );
    }

    private updatePaymentMethod(
        url: string,
        errorMessage: string,
        paymentMethodCreateDto: PaymentMethodCreateDto
    ) {
        return this.httpClient
            .put((url = url), (paymentMethodCreateDto = paymentMethodCreateDto), {
                observe: 'body',
            })
            .pipe(catchError(handleError(errorMessage)));
    }

    // Delete

    public deletePaymentMethodById(id: number) {
        return this.deletePaymentMethod(
            `https://localhost:7276/api/PaymentMethods/${id}`,
            'something went wrong deleting the payment method'
        );
    }

    private deletePaymentMethod(url: string, errorMessage: string) {
        return this.httpClient.delete(url).pipe(catchError(handleError(errorMessage)));
    }
}

function handleError(errorMessage: string) {
    return (err: any) => {
        console.log(err.error);
        return throwError(
            () => new Error(errorMessage + '\n' + err.error.message + '\n' + err.error.title)
        );
    };
}
