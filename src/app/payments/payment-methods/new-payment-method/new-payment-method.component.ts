import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentMethodCreateDto } from '../../../shared/models/dtos/payment-methos-create-dto.model';
import { PaymentMethodService } from '../../../shared/services/payment-method.service';

@Component({
    selector: 'app-new-payment-method',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './new-payment-method.component.html',
    styleUrl: './new-payment-method.component.css',
})
export class NewPaymentMethodComponent {
    private paymentMethodService = inject(PaymentMethodService);

    public newPaymentMethodForm = new FormGroup({
        methodName: new FormControl<string | undefined>(undefined, Validators.required),
    });

    onSave() {
        console.log(this.newPaymentMethodForm);

        const paymentMethodCreateDto: PaymentMethodCreateDto = {
            metodName: this.newPaymentMethodForm.value.methodName!,
        };
        console.log(paymentMethodCreateDto);
        this.paymentMethodService.CreatePaymentMethod(paymentMethodCreateDto).subscribe({
            next: (resData) => {
                console.log(resData);
            },
            error: (err) => {
                window.alert(err);
            },
        });
    }
}