import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EntityFormComponent } from '../../../shared/components/entity-form/entity-form.component';
import { EntityDetailsComponent } from '../../../shared/base-classes/entity-details-compoenent';
import { IPaymentMethod } from '../../../DataAccess/Models/payment-method.model';
import { PaymentMethodService } from '../payment-method.service';
import { PaymentMethodCreateDto } from '../../../DataAccess/Models/Dto/payment-method-create-dto';

@Component({
    selector: 'app-new-payment-method',
    standalone: true,
    imports: [ReactiveFormsModule, EntityFormComponent],
    templateUrl: './new-payment-method.component.html',
    styleUrl: './new-payment-method.component.css',
})
export class NewPaymentMethodComponent extends EntityDetailsComponent<
    IPaymentMethod,
    PaymentMethodCreateDto,
    PaymentMethodService
> {
    constructor() {
        super();
    }

    //Todo**: Ask AI wheter it's better for the next line to be inside constructor or not
    //Todo**: is the next line actually neccessary?

    override isEditingSignal: WritableSignal<boolean> = signal(true);

    protected override id: number = 0;

    public router = inject(Router);
    protected override navigateUrlAfterNewEntityAdded = 'payments/payment-methods/details';

    protected override entityService = inject(PaymentMethodService);
    public newPaymentMethodForm = new FormGroup({
        methodName: new FormControl<string | undefined>(undefined, Validators.required),
    });

    // private paymentMethodService = inject(PaymentMethodService);
    // private destroyRef = inject(DestroyRef);
    // onSave() {
    //     const paymentMethodCreateDto: PaymentMethodCreateDto = {
    //         methodName: this.newPaymentMethodForm.value.methodName!,
    //     };
    //     const subscription = this.paymentMethodService.create(paymentMethodCreateDto).subscribe({
    //         next: (resData) => {
    //             console.log(resData);
    //             this.router.navigate(['payments/payment-methods/details', resData.id]);
    //         },
    //         error: (err) => {
    //             window.alert(err);
    //         },
    //     });
    //     this.destroyRef.onDestroy(() => {
    //         subscription.unsubscribe();
    //     });
    // }
}
