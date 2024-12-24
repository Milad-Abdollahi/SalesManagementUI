import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EntityFormComponent } from '../../../shared/components/entity-form/entity-form.component';
import { PaymentStatusService } from '../../../shared/services/payment-status.service';
import { PaymentStatusCreateDto } from '../../../DataAccess/Models/Dto/payment-status-create-dto';
import { HelperFunctions } from '../../../shared/helper-functions';
import { EntityDetailsComponent } from '../../../shared/base-classes/entity-details-compoenent';
import { IPaymentStatus } from '../../../DataAccess/Models/payment-status.model';

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
    override isEditingSignal = signal(true);

    protected override id: number = 0;

    private paymentStatusService = inject(PaymentStatusService);
    public router = inject(Router);
    private destroyRef = inject(DestroyRef);
    protected override navigateUrlAfterNewEntityAdded = 'payments/payment-statuses/details';

    entityService = inject(PaymentStatusService);

    public newPaymentStatusForm = new FormGroup({
        statusName: new FormControl<string | undefined>(undefined, Validators.required),
    });

    onSave() {
        const paymentStatusCreateDto: PaymentStatusCreateDto = {
            statusName: this.newPaymentStatusForm.value.statusName!,
        };

        const subscription = this.paymentStatusService.create(paymentStatusCreateDto).subscribe({
            next: (resData) => {
                console.log(resData);
                this.router.navigate(['payments/payment-statuses/details', resData.id]);
            },
            error: (err) => {
                window.alert(HelperFunctions.extractErrorMessages(err.error));
                throw new Error(err);
            },
        });

        this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
        });
    }
}
