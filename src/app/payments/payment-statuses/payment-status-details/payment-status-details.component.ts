import { Component, inject, Input, numberAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { EntityFormComponent } from '../../../shared/components/entity-form/entity-form.component';
import { EntityDetailsComponent } from '../../../shared/base-classes/entity-details-compoenent';
import { IPaymentStatus } from '../../../DataAccess/Models/payment-status.model';
import { PaymentStatusCreateDto } from '../../../DataAccess/Models/Dto/payment-status-create-dto';
import { PaymentStatusService } from '../payment-status.service';

@Component({
    selector: 'app-payment-status-details',
    standalone: true,
    imports: [ReactiveFormsModule, EntityFormComponent],
    templateUrl: './payment-status-details.component.html',
    styleUrl: './payment-status-details.component.css',
})
export class PaymentStatusDetailsComponent extends EntityDetailsComponent<
    IPaymentStatus,
    PaymentStatusCreateDto,
    PaymentStatusService
> {
    // id is imported from the url
    @Input({ transform: numberAttribute }) id = 0;

    entityService = inject(PaymentStatusService);

    //Todo**: try moving router into the base class
    router = inject(Router);

    constructor() {
        super();
    }
}
