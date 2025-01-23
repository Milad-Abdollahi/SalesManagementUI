import { Component, inject, Input, numberAttribute } from '@angular/core';
import { EntityDetailsBase } from '../../../shared/base-classes/entity-details-base';
import { ICustomer } from '../../../DataAccess/Models/customer.model';
import { CustomerCreateDto } from '../../../DataAccess/Models/Dto/customer-create-dto';
import { CustomerInfoService } from '../customer-info.service';
import { Router } from '@angular/router';
import { EntityFormComponent } from '../../../shared/components/entity-form/entity-form.component';
import { CustomerTypeService } from '../../customer-types/customer-type.service';
import { finalize, takeUntil } from 'rxjs';

@Component({
    selector: 'app-customer-info-details',
    standalone: true,
    imports: [EntityFormComponent],
    templateUrl: './customer-info-details.component.html',
    styleUrl: './customer-info-details.component.css',
})
export class CustomerInfoDetailsComponent extends EntityDetailsBase<
    ICustomer,
    CustomerCreateDto,
    CustomerInfoService
> {
    // id is impoeted from the url
    @Input({ transform: numberAttribute }) id = 0;

    protected override entityService: CustomerInfoService = inject(CustomerInfoService);
    public customerTypeService = inject(CustomerTypeService);

    //Todo**: try moving router into the base class
    protected override router = inject(Router);

    override setOptions(): void {
        const customerType_idField = this.fields.find((field) => {
            return field.key == 'customerType_id';
        });

        if (!customerType_idField) return;

        this.customerTypeService
            .getAll()
            .pipe(
                takeUntil(this.destroy$),
                finalize(() =>
                    console.log(
                        'Subscription finalized for customerTypeService inside CustomerInfoDetailsComponent'
                    )
                )
            )
            .subscribe({
                next: (customerTypes) => {
                    // Map the fetched data to the dropdown {key, value} format
                    customerType_idField.options = customerTypes.map((ct) => ({
                        key: ct.id.toString(),
                        value: ct.typeName,
                    }));
                },
                error: (err) => {
                    // Handle errors if necessary
                    console.error('Error fetching customer types', err);
                },
            });
    }

    constructor() {
        super();
    }

    // // Delete Later
    // onLogFormValue() {
    //     // this.form.patchValue({
    //     //     id: 50,
    //     //     customerType: 'salam'
    //     // });
    //     console.dir(this.form);
    // }
}
