import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { PaymentStatusRepositoryService } from '../../DataAccess/Repo/payment-status-repository.service';
import { IPaymentStatus } from '../../DataAccess/Models/payment-status.model';
import { Observable, tap } from 'rxjs';
import { PaymentStatusCreateDto } from '../../DataAccess/Models/Dto/payment-status-create-dto';
import { EntityService } from '../../shared/services/entity-service.interface';
import { FieldBase } from '../../shared/base-classes/field-base';
import { Validators } from '@angular/forms';

import { generateFields } from '../../shared/helper-functions';
import { FieldConfig } from '../../shared/interfaces/FieldConfig';

@Injectable({
    providedIn: 'root',
})
export class PaymentStatusService implements EntityService<IPaymentStatus, PaymentStatusCreateDto> {
    private paymentStatusRepositoryService = inject(PaymentStatusRepositoryService);

    private paymentStatuses = signal<IPaymentStatus[]>([]);
    public readonly loadedEntities = this.paymentStatuses.asReadonly();

    private selectedPaymentStatus = signal<IPaymentStatus | undefined>(undefined);
    public readonly loadedPaymentStatus = this.selectedPaymentStatus.asReadonly();

    public selectedPaymentStatusFormFields: WritableSignal<FieldBase<string>[]> = signal([]);

    // Create

    public create(paymentStatusCreateDto: PaymentStatusCreateDto): Observable<IPaymentStatus> {
        return this.paymentStatusRepositoryService
            .create('https://localhost:7276/api/', 'PaymentStatuses', paymentStatusCreateDto)
            .pipe(
                tap({
                    error: (err) => {
                        console.log(err);
                    },
                })
            );
    }

    // Read
    // Todo**: Ask AI wheter the following method creates 2 different IPaymentStatus[] one here and one in the component?

    public getAll(): Observable<IPaymentStatus[]> {
        return this.paymentStatusRepositoryService
            .readAll('https://localhost:7276/api/', 'PaymentStatuses')
            .pipe(
                tap({
                    next: (paymentStatuses) => {
                        this.paymentStatuses.set(paymentStatuses);
                    },
                })
            );
    }

    public getById(id: number): Observable<IPaymentStatus> {
        return this.paymentStatusRepositoryService
            .readById('https://localhost:7276/api/', 'PaymentStatuses/', id)
            .pipe(
                tap({
                    next: (paymentStatus) => {
                        this.selectedPaymentStatus.set(paymentStatus);
                    },
                })
            );
    }

    // Update

    public edit(
        id: number,
        paymentStatusCreateDto: PaymentStatusCreateDto
    ): Observable<IPaymentStatus> {
        return this.paymentStatusRepositoryService
            .update('https://localhost:7276/api/', 'PaymentStatuses/', id, paymentStatusCreateDto)
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
        return this.paymentStatusRepositoryService.delete(
            'https://localhost:7276/api/',
            `PaymentStatuses/`,
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
        statusName: {
            initialValue: '',
            required: true,
            key: 'statusName',
            label: 'Status Name',
            controlType: 'textbox',
            disabled: false,
            validators: [Validators.required],
            includeInDto: true,
            order: 2,
        },
    };

    // Todo**: try using a signal for this
    // Todo**: get from a remote source of field metadata
    getFields(): Observable<FieldBase<string>[]> {
        return generateFields<IPaymentStatus>(this.fieldsConfig);
    }
}
