import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentMethodCreateDto } from '../../../shared/models/dtos/payment-methos-create-dto.model';
import { PaymentMethodService } from '../../../shared/services/payment-method.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-payment-method',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './new-payment-method.component.html',
    styleUrl: './new-payment-method.component.css',
})
export class NewPaymentMethodComponent {
    private paymentMethodService = inject(PaymentMethodService);
    private router = inject(Router);

    public newPaymentMethodForm = new FormGroup({
        methodName: new FormControl<string | undefined>(undefined, Validators.required),
    });

    onSave() {
        const paymentMethodCreateDto: PaymentMethodCreateDto = {
            methodName: this.newPaymentMethodForm.value.methodName!,
        };
        this.paymentMethodService.CreatePaymentMethod(paymentMethodCreateDto).subscribe({
            next: (resData) => {
                console.log(resData);
                this.router.navigate(['payments/payment-methods/details', resData.id]);
            },
            error: (err) => {
                window.alert(err);
            },
        });
    }
}
