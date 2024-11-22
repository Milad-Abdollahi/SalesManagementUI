import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { PaymentStatusRepositoryService } from '../../DataAccess/Repo/payment-status-repository.service';
import { IPaymentStatus } from '../../DataAccess/Models/payment-status.model';
import { Observable, of, take, tap, throwError } from 'rxjs';
import { PaymentStatusCreateDto } from '../../DataAccess/Models/Dto/payment-status-create-dto';
import { EntityService } from './entity-service.interface';
import { FieldBase } from '../base-classes/field-base';
import { DropdownField } from '../form-field-types/dropdown-field';
import { TextBoxField } from '../form-field-types/textbox-field';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

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

    // public isEditing = signal(false);

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
                        console.dir(err.error);
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

    fieldConfig: { [key: string]: FieldConfig } = {
        // Todo**: change the name of value to initialValue also make it optional
        id: {
            initialValue: 5,
            key: 'id',
            label: 'ID',
            controlType: 'textbox',
            disabled: true,
            includeInDto: false,
            order: 1,
        },
        statusName: {
            initialValue: 'aass',
            key: 'statusName',
            label: 'Status Name',
            controlType: 'textbox',
            disabled: true,
            validators: [Validators.required],
            includeInDto: true,
            order: 2,
        },
    };

    // TEST
    // Todo**: try using a signal for this
    // Todo**: get from a remote source of field metadata
    getFields(): Observable<FieldBase<string>[]> {
        return generateFields<IPaymentStatus>(this.fieldConfig);
    }
}

export interface FieldConfig {
    initialValue: any;
    key: string;
    label: string;
    controlType: string;
    type?: string;
    validators?: ValidatorFn[];
    required?: boolean;
    order?: number;
    disabled?: boolean;
    includeInDto?: boolean;
    options?: { key: string; value: string }[];
}

export function generateFields<T>(config: {
    [key: string]: FieldConfig;
}): Observable<FieldBase<string>[]> {
    const fields: FieldBase<string>[] = Object.keys(config).map((key, index) => {
        const fieldConfig = config[key];
        return new FieldBase<string>({
            initialValue: fieldConfig.initialValue,
            key,
            label: fieldConfig?.label || key,
            controlType: fieldConfig?.controlType || 'textbox',
            type: fieldConfig?.type,
            validators: fieldConfig?.validators || [],
            required: fieldConfig?.required,
            order: fieldConfig?.order || index + 1,
            disabled: fieldConfig?.disabled,
            includeInDto: fieldConfig?.includeInDto,
            options: fieldConfig?.options || [],
        });
    });
    return of(fields.sort((a, b) => a.order - b.order));
}
