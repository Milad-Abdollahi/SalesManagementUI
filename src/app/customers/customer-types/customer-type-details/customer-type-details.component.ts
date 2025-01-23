import { Component, inject, Input, numberAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { EntityFormComponent } from '../../../shared/components/entity-form/entity-form.component';
import { EntityDetailsBase } from '../../../shared/base-classes/entity-details-base';
import { ICustomerType } from '../../../DataAccess/Models/customer-type.model';
import { CustomerTypeCreateDto } from '../../../DataAccess/Models/Dto/customer-type-create-dto';
import { CustomerTypeService } from '../customer-type.service';

@Component({
    selector: 'app-customer-type-details',
    standalone: true,
    imports: [
        // ReactiveFormsModule,
        EntityFormComponent,
    ],
    templateUrl: './customer-type-details.component.html',
    styleUrl: './customer-type-details.component.css',
})
export class CustomerTypeDetailsComponent extends EntityDetailsBase<
    ICustomerType,
    CustomerTypeCreateDto,
    CustomerTypeService
> {
    // id is imported from the url
    @Input({ transform: numberAttribute }) id = 0;

    protected override entityService: CustomerTypeService = inject(CustomerTypeService);

    //Todo**: try moving router into the base class
    protected override router: Router = inject(Router);

    constructor() {
        super();
    }
}
