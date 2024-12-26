import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { PaymentMethodRepositoryService } from '../../DataAccess/Repo/payment-method-repository.service';
import { IPaymentMethod } from '../../DataAccess/Models/payment-method.model';
import { Observable, of, tap } from 'rxjs';
import { PaymentMethodCreateDto } from '../../DataAccess/Models/Dto/payment-method-create-dto';
import { EntityService } from '../../shared/services/entity-service.interface';
import { FieldBase } from '../../shared/base-classes/field-base';
import { ValidatorFn, Validators } from '@angular/forms';

import { FieldConfig } from '../../shared/interfaces/FieldConfig';
import { generateFields } from '../../shared/helper-functions';

@Injectable({
    providedIn: 'root',
})
export class PaymentMethodService implements EntityService<IPaymentMethod, PaymentMethodCreateDto> {
    private paymentMethodRepositoryService = inject(PaymentMethodRepositoryService);

    private paymentMethods = signal<IPaymentMethod[]>([]);
    public readonly loadedEntities: Signal<IPaymentMethod[]> = this.paymentMethods.asReadonly();

    private selectedPaymentMethod = signal<IPaymentMethod | undefined>(undefined);
    public readonly loadedPaymentMethod = this.selectedPaymentMethod.asReadonly();

    public selectedPaymentMethodFormFields: WritableSignal<FieldBase<string>[]> = signal([]);

    // Create

    public create(paymentMethodCreateDto: PaymentMethodCreateDto): Observable<IPaymentMethod> {
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
    // Todo**: Ask AI wheter the following method creates 2 different IPaymentMethods[] one here and one in the component?

    public getAll(): Observable<IPaymentMethod[]> {
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

    public getById(id: number): Observable<IPaymentMethod> {
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
    ): Observable<IPaymentMethod> {
        return this.paymentMethodRepositoryService
            .update('https://localhost:7276/api/', 'PaymentMethods/', id, paymentMethodCreateDto)
            .pipe(
                tap({
                    error: (err) => {
                        console.dir(err);
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

    fieldsConfig: { [key: string]: FieldConfig } = {
        id: {
            initialValue: 0,
            required: false,
            key: 'id',
            label: 'ID',
            controlType: 'textbox',
            disabled: false,
            includeInDto: false,
            order: 1,
        },
        methodName: {
            initialValue: '',
            required: true,
            key: 'methodName',
            label: 'Method Name',
            controlType: 'textbox',
            disabled: false,
            validators: [Validators.required],
            includeInDto: true,
            order: 2,
        },
    };

    public getFields(): Observable<FieldBase<string>[]> {
        return generateFields<IPaymentMethod>(this.fieldsConfig);
    }
}
