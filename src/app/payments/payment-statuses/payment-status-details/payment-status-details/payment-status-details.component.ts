import { Component, DestroyRef, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { PaymentStatusService } from '../../../../shared/services/payment-status.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaymentStatusCreateDto } from '../../../../DataAccess/Models/Dto/payment-status-create-dto';

@Component({
    selector: 'app-payment-status-details',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './payment-status-details.component.html',
    styleUrl: './payment-status-details.component.css',
})
export class PaymentStatusDetailsComponent implements OnInit {
    // id is imported from the url
    @Input({ transform: numberAttribute }) id = 0;

    private paymentStatusService = inject(PaymentStatusService);
    private destroyRef = inject(DestroyRef);
    private router = inject(Router);

    public paymentStatus = this.paymentStatusService.loadedPaymentStatus;

    public isEditing = false;

    public paymentStatusForm = new FormGroup({
        id: new FormControl<number | undefined>({ value: undefined, disabled: true }),
        statusName: new FormControl<string | undefined>({ value: undefined, disabled: true }),
    });

    ngOnInit(): void {
        const subscription = this.paymentStatusService.getPaymentStatusById(this.id).subscribe({
            next: () => {
                this.paymentStatusForm.patchValue({
                    id: this.paymentStatus()?.id,
                    statusName: this.paymentStatus()?.statusName,
                });
            },
            error: (err) => console.log(err),
        });

        this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }

    onEditing() {
        this.isEditing = true;
        this.paymentStatusForm.get('statusName')?.enable();
    }

    onSubmit() {
        const data: PaymentStatusCreateDto = {
            statusName: this.paymentStatusForm.value.statusName!,
        };
        const subscription = this.paymentStatusService.editPaymentStatus(this.id, data).subscribe({
            next: (resData) => {
                console.log(resData);
                console.log(resData.message);
            },
            error: (err) => {
                console.dir(err.error.message);
                window.alert(err.error.message + err.error.details);
            },
            complete: () => {
                this.paymentStatusForm.get('statusName')?.disable();
                this.isEditing = false;
            },
        });
        this.destroyRef.onDestroy(() => subscription.unsubscribe);
    }

    onDelete() {
        const deleteSubscription = this.paymentStatusService
            .deletePaymentStatus(this.id)
            .subscribe({
                next: (resData) => {
                    console.log(resData);
                    this.router.navigate(['payments/payment-statuses']);
                },
            });
    }
}
