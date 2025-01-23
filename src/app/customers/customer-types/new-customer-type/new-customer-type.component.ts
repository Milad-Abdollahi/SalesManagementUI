import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EntityFormComponent } from '../../../shared/components/entity-form/entity-form.component';
import { EntityDetailsBase } from '../../../shared/base-classes/entity-details-base';
import { ICustomerType } from '../../../DataAccess/Models/customer-type.model';
import { CustomerTypeCreateDto } from '../../../DataAccess/Models/Dto/customer-type-create-dto';
import { CustomerTypeService } from '../customer-type.service';

@Component({
    selector: 'app-new-customer-type',
    standalone: true,
    imports: [ReactiveFormsModule, EntityFormComponent],
    templateUrl: './new-customer-type.component.html',
    styleUrl: './new-customer-type.component.css',
})
export class NewCustomerTypeComponent extends EntityDetailsBase<
    ICustomerType,
    CustomerTypeCreateDto,
    CustomerTypeService
> {
    constructor() {
        super();
    }

    //Todo**: Ask AI wheter it's better for the next line to be inside constructor or not
    //Todo**: is the next line actually neccessary?

    override isEditingSignal = signal(true);

    protected override id = 0;

    public override router = inject(Router);
    protected override navigateUrlAfterNewEntityAdded = 'customers/customer-types/details';

    // Todo**: push this indide the EntityDetailsComponent base class if possible
    protected override entityService = inject(CustomerTypeService);
}
