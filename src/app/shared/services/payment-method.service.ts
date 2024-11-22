import { inject, Injectable, Signal, signal } from '@angular/core';
import { PaymentMethod } from '../models/payment-method.model';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PaymentMethodCreateDto } from '../models/dtos/payment-methos-create-dto.model';
import { EntityService } from './entity-service.interface';
import { PaymentMethodRepositoryService } from '../../DataAccess/Repo/payment-method-repository.service';
import { FieldBase } from '../base-classes/field-base';
@Injectable({
    providedIn: 'root',
})
export class PaymentMethodService implements EntityService<PaymentMethod, PaymentMethodCreateDto> {
    getFields(): Observable<FieldBase<string>[]> {
        throw new Error('Method not implemented.');
    }
    private paymentMethodRepositoryService = inject(PaymentMethodRepositoryService);

    // **Todo: Add paymentMethods signal to the interface
    private paymentMethods = signal<PaymentMethod[]>([]);
    public readonly loadedEntities = this.paymentMethods.asReadonly();

    private selectedPaymentMethod = signal<PaymentMethod | undefined>(undefined);
    public readonly loadedPaymentMethod = this.selectedPaymentMethod.asReadonly();

    // Create
    public create(paymentMethodCreateDto: PaymentMethodCreateDto): Observable<PaymentMethod> {
        return this.paymentMethodRepositoryService
            .create('https://localhost:7276/api/', 'PaymentMethods', paymentMethodCreateDto)
            .pipe(
                tap({
                    error: (err) => {
                        console.log(err);
                    },
                })
            );
    }

    // Read
    public getAll(): Observable<PaymentMethod[]> {
        return this.paymentMethodRepositoryService
            .readAll('https://localhost:7276/api/', 'PaymentMethods')
            .pipe(
                tap({
                    next: (paymentMethods) => {
                        this.paymentMethods.set(paymentMethods);
                    },
                })
            );
    }

    public getById(id: number): Observable<PaymentMethod> {
        return this.paymentMethodRepositoryService
            .readById('https://localhost:7276/api/', 'PaymentMethods/', id)
            .pipe(
                tap({
                    next: (paymentMethod) => {
                        this.selectedPaymentMethod.set(paymentMethod);
                    },
                })
            );
    }

    // Update

    public edit(
        id: number,
        paymentMethodCreateDto: PaymentMethodCreateDto
    ): Observable<PaymentMethod> {
        return this.paymentMethodRepositoryService
            .update('https://localhost:7276/api/', 'PaymentMethods/', id, paymentMethodCreateDto)
            .pipe(
                tap({
                    error: (err) => {
                        console.dir(err.error);
                    },
                })
            );
    }

    // Delete
    public delete(id: number): Observable<void> {
        return this.paymentMethodRepositoryService.delete(
            'https://localhost:7276/api/',
            'PaymentMethods/',
            id
        );
    }
}
