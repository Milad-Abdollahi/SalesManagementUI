import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { EntityService } from '../../shared/services/entity-service.interface';
import { ICustomerType } from '../../DataAccess/Models/customer-type.model';
import { CustomerTypeRepositoryService } from '../../DataAccess/Repo/customer-type-repository.service';
import { CustomerTypeCreateDto } from '../../DataAccess/Models/Dto/customer-type-create-dto';
import { ICustomerTypeDropdownDto } from '../../DataAccess/Models/Dto/customer-type-dropdown-dto';
import { FieldBase } from '../../shared/base-classes/field-base';
import { FieldConfig } from '../../shared/interfaces/FieldConfig';
import { generateFields } from '../../shared/helper-functions';

@Injectable({ providedIn: 'root' })
export class CustomerTypeService implements EntityService<ICustomerType, CustomerTypeCreateDto> {
    private customerTypeRepositoryService = inject(CustomerTypeRepositoryService);

    private customerTypes = signal<ICustomerType[]>([]);
    public readonly loadedEntities: Signal<ICustomerType[]> = this.customerTypes.asReadonly();

    private selectedCustomerType = signal<ICustomerType | undefined>(undefined);
    public readonly loadedCustomerType = this.selectedCustomerType.asReadonly();

    public selectedCustomerTypeFormFields: WritableSignal<FieldBase<string>[]> = signal([]);

    // Create

    create(dto: CustomerTypeCreateDto): Observable<ICustomerType> {
        return this.customerTypeRepositoryService
            .create('https://localhost:7276/api/', 'CustomerTypes', dto)
            .pipe(
                tap({
                    error: (err) => {
                        console.log(err);
                    },
                })
            );
    }

    // Read

    public getAll(): Observable<ICustomerType[]> {
        return this.customerTypeRepositoryService
            .readAll('https://localhost:7276/api/', 'CustomerTypes')
            .pipe(
                tap({
                    next: (customerTypes) => {
                        this.customerTypes.set(customerTypes);
                    },
                })
            );
    }

    public getById(id: number): Observable<ICustomerType> {
        return this.customerTypeRepositoryService
            .readById('https://localhost:7276/api/', 'CustomerTypes/', id)
            .pipe(
                tap({
                    next: (customerType) => {
                        this.selectedCustomerType.set(customerType);
                    },
                })
            );
    }

    // public getAllDropdownOpts(): Observable<ICustomerTypeDropdownDto> {}

    // Update

    public edit(id: number, dto: CustomerTypeCreateDto): Observable<ICustomerType> {
        return this.customerTypeRepositoryService
            .update('https://localhost:7276/api/', 'CustomerTypes/', id, dto)
            .pipe(
                tap({
                    error: (err) => {
                        console.dir(err);
                    },
                })
            );
    }

    // Delete

    delete(id: number): Observable<void> {
        return this.customerTypeRepositoryService.delete(
            'https://localhost:7276/api/',
            'CustomerTypes/',
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
        typeName: {
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
    };

    public getFields(): Observable<FieldBase<string>[]> {
        return generateFields<ICustomerType>(this.fieldsConfig);
    }
}
