import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentStatusService } from '../../../shared/services/payment-status.service';
import { PaymentStatusCreateDto } from '../../../DataAccess/Models/Dto/payment-status-create-dto';

@Component({
    selector: 'app-new-payment-status',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './new-payment-status.component.html',
    styleUrl: './new-payment-status.component.css',
})
export class NewPaymentStatusComponent {
    private paymentStatusService = inject(PaymentStatusService);
    private router = inject(Router);
    private destroyRef = inject(DestroyRef);

    public newPaymentStatusForm = new FormGroup({
        statusName: new FormControl<string | undefined>(undefined, Validators.required),
    });

    onSave() {
        const paymentStatusCreateDto: PaymentStatusCreateDto = {
            statusName: this.newPaymentStatusForm.value.statusName!,
        };

        const subscription = this.paymentStatusService
            .createPaymentStatus(paymentStatusCreateDto)
            .subscribe({
                next: (resData) => {
                    console.log(resData);
                    this.router.navigate(['payments/payment-statuses/details', resData.id]);
                },
            });

        this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
        });
    }
}
