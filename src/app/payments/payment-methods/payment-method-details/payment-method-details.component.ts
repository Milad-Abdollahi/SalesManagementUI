import { Component, DestroyRef, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { PaymentMethodService } from '../../../shared/services/payment-method.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaymentMethodCreateDto } from '../../../shared/models/dtos/payment-methos-create-dto.model';
import { Router } from '@angular/router';

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
    private router = inject(Router);

    public paymentMethod = this.paymentMethodService.loadedPaymentMethod;

    public isEditing = false;

    public paymentMethodForm = new FormGroup({
        id: new FormControl<number | undefined>({ value: undefined, disabled: true }),
        methodName: new FormControl<string | undefined>({ value: undefined, disabled: true }),
    });

    ngOnInit(): void {
        const subscription = this.paymentMethodService.getById(this.id).subscribe({
            next: () => {
                this.paymentMethodForm.patchValue({
                    id: this.paymentMethod()?.id,
                    methodName: this.paymentMethod()?.methodName,
                });
            },
            error: (err) => console.log(err),
        });

        this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }

    onEditing() {
        this.isEditing = true;
        this.paymentMethodForm.get('methodName')?.enable();
    }

    onSubmit() {
        const data: PaymentMethodCreateDto = {
            methodName: this.paymentMethodForm.value.methodName!,
        };
        const updateSubscription = this.paymentMethodService.edit(this.id, data).subscribe({
            next: (resData) => {
                console.log(resData);
            },
            error: (err) => {
                window.alert(err);
            },
            complete: () => {
                this.paymentMethodForm.get('methodName')?.disable();
                this.isEditing = false;
            },
        });
        this.destroyRef.onDestroy(() => updateSubscription.unsubscribe());
    }

    onDelete() {
        const deleteSubscription = this.paymentMethodService.delete(this.id).subscribe({
            next: (resData) => {
                console.log(resData);
                this.router.navigate(['payments/payment-methods']);
            },
        });

        this.destroyRef.onDestroy(() => deleteSubscription.unsubscribe());
    }
}
