import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Validators } from '@angular/forms';
import { EntityService } from '../../shared/services/entity-service.interface';
import { ICustomer } from '../../DataAccess/Models/customer.model';
import { CustomerCreateDto as CustomerCreateDto } from '../../DataAccess/Models/Dto/customer-create-dto';
import { identity, Observable, tap } from 'rxjs';
import { FieldBase } from '../../shared/base-classes/field-base';
import { CustomerRepositoryService } from '../../DataAccess/Repo/customer-repository.service';
import { FieldConfig } from '../../shared/interfaces/FieldConfig';
import { generateFields } from '../../shared/helper-functions';
import { CustomerTypeService } from '../customer-types/customer-type.service';

@Injectable({
    providedIn: 'root',
})
export class CustomerInfoService implements EntityService<ICustomer, CustomerCreateDto> {
    private customerRepositoryService = inject(CustomerRepositoryService);
    private customerTypeService = inject(CustomerTypeService);

    private customers = signal<ICustomer[]>([]);
    public readonly loadedEntities: Signal<ICustomer[]> = this.customers.asReadonly();

    private selectedCustomer = signal<ICustomer | undefined>(undefined);
    public readonly loadedCustomer = this.selectedCustomer.asReadonly();

    public selectedCustomerFormFields: WritableSignal<FieldBase<string>[]> = signal([]);

    baseUrl = 'https://localhost:7276/api/';

    constructor() {}

    create(dto: CustomerCreateDto): Observable<ICustomer> {
        throw new Error('Method not implemented.');
    }

    //Read

    getAll(): Observable<ICustomer[]> {
        return this.customerRepositoryService
            .readAll('https://localhost:7276/api/', 'Customers')
            .pipe(
                tap({
                    next: (customers) => {
                        this.customers.set(customers);
                    },
                })
            );
    }
    getById(id: number): Observable<ICustomer> {
        return this.customerRepositoryService
            .readById('https://localhost:7276/api/', 'Customers/', id)
            .pipe(
                tap({
                    next: (customer) => {
                        this.selectedCustomer.set(customer);
                    },
                })
            );
    }

    // Update

    edit(id: number, customerCreateDto: CustomerCreateDto): Observable<ICustomer> {
        return this.customerRepositoryService.update(
            this.baseUrl,
            'Customers/',
            id,
            customerCreateDto
        );
    }

    // Delete
    delete(id: number): Observable<void> {
        throw new Error('Method not implemented.');
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
        name: {
            initialValue: '',
            required: true,
            key: 'typeName',
            label: 'Customer Type Name',
            controlType: 'textbox',
            disabled: false,
            validators: [Validators.required],
            includeInDto: true,
            order: 2,
        },
        address: {
            initialValue: '',
            required: true,
            key: 'address',
            label: 'آدرس',
            controlType: 'textbox',
        },
        email: {
            initialValue: '',
            required: true,
            key: 'email',
            label: 'ایمیل',
            controlType: 'textbox',
        },
        customerType_id: {
            initialValue: 'initial value',
            required: true,
            key: 'customerType_id',
            label: 'نوع مشتری',
            controlType: 'dropdown',
            options: [
                { key: '1', value: 'customer-info-service حقیقی' },
                { key: '2', value: 'customer-info-service حقوقی' },
            ],
        },
        createdDate: {
            initialValue: '',
            required: true,
            key: 'createdDate',
            label: 'تاریخ ثبت',
            controlType: 'textbox',
        },
    };

    public getFields(): Observable<FieldBase<string>[]> {
        return generateFields<ICustomer>(this.fieldsConfig);
    }
}
