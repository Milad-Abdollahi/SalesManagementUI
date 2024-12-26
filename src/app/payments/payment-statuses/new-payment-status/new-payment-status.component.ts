import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EntityFormComponent } from '../../../shared/components/entity-form/entity-form.component';
import { EntityDetailsComponent } from '../../../shared/base-classes/entity-details-compoenent';
import { IPaymentStatus } from '../../../DataAccess/Models/payment-status.model';
import { PaymentStatusCreateDto } from '../../../DataAccess/Models/Dto/payment-status-create-dto';
import { PaymentStatusService } from '../payment-status.service';

@Component({
    selector: 'app-new-payment-status',
    standalone: true,
    imports: [ReactiveFormsModule, EntityFormComponent],
    templateUrl: './new-payment-status.component.html',
    styleUrl: './new-payment-status.component.css',
})
export class NewPaymentStatusComponent extends EntityDetailsComponent<
    IPaymentStatus,
    PaymentStatusCreateDto,
    PaymentStatusService
> {
    constructor() {
        super();
    }

    //Todo**: Ask AI wheter it's better for the next line to be inside constructor or not
    //Todo**: is the next line actually neccessary?

    override isEditingSignal = signal(true);

    protected override id: number = 0;

    public router = inject(Router);
    protected override navigateUrlAfterNewEntityAdded = 'payments/payment-statuses/details';

    entityService = inject(PaymentStatusService);

    public newPaymentStatusForm = new FormGroup({
        statusName: new FormControl<string | undefined>(undefined, Validators.required),
    });
}
