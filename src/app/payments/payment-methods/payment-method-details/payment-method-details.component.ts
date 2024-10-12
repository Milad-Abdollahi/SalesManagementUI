import { Component, DestroyRef, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { PaymentMethodService } from '../../../shared/services/payment-method.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaymentMethodCreateDto } from '../../../shared/models/dtos/payment-methos-create-dto.model';

@Component({
    selector: 'app-payment-method-details',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './payment-method-details.component.html',
    styleUrl: './payment-method-details.component.css',
})
export class PaymentMethodDetailsComponent implements OnInit {
    // id is imported from the url
    @Input({ transform: numberAttribute }) id = 0;
    private paymentMethodService = inject(PaymentMethodService);
    private destroyRef = inject(DestroyRef);
    public paymentMethod = this.paymentMethodService.loadedPaymentMethod;
    public isEditing = false;

    public paymentMethodForm = new FormGroup({
        id: new FormControl<number | undefined>({ value: undefined, disabled: true }),
        metodName: new FormControl<string | undefined>({
            value: undefined,
            disabled: true,
        }),
    });

    ngOnInit(): void {
        const subscription = this.paymentMethodService.getPaymentMethodById(this.id).subscribe({
            next: () => {
                this.paymentMethodForm.patchValue({
                    id: this.paymentMethod()?.id,
                    metodName: this.paymentMethod()?.metodName,
                });
            },
            error: (err) => console.log(err),
        });

        this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }

    onEditing() {
        this.isEditing = true;
        this.paymentMethodForm.get('metodName')?.enable();
    }

    onSubmit() {
        const data: PaymentMethodCreateDto = { metodName: this.paymentMethodForm.value.metodName! };
        const updateSubscription = this.paymentMethodService
            .updatePaymentMethodById(this.id, data)
            .subscribe({
                next: (resData) => {
                    console.log(resData);
                },
                error: (err) => {
                    window.alert(err);
                },
                complete: () => {
                    this.paymentMethodForm.get('metodName')?.disable();
                    this.isEditing = false;
                },
            });
        this.destroyRef.onDestroy(() => updateSubscription.unsubscribe());
    }
}
