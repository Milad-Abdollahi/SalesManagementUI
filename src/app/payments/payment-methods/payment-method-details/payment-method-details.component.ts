import { Component, DestroyRef, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { EntityFormComponent } from '../../../shared/components/entity-form/entity-form.component';
import { EntityDetailsComponent } from '../../../shared/base-classes/entity-details-compoenent';
import { PaymentMethodCreateDto } from '../../../DataAccess/Models/Dto/payment-method-create-dto';
import { IPaymentMethod } from '../../../DataAccess/Models/payment-method.model';
import { PaymentMethodService } from '../payment-method.service';

@Component({
    selector: 'app-payment-method-details',
    standalone: true,
    imports: [ReactiveFormsModule, EntityFormComponent],
    templateUrl: './payment-method-details.component.html',
    styleUrl: './payment-method-details.component.css',
})
export class PaymentMethodDetailsComponent extends EntityDetailsComponent<
    IPaymentMethod,
    PaymentMethodCreateDto,
    PaymentMethodService
> {
    // id is imported from the url
    @Input({ transform: numberAttribute }) id = 0;

    protected override entityService = inject(PaymentMethodService);

    //Todo**: try moving router into the base class
    router = inject(Router);
    
    constructor() {
        super();
    }
}
