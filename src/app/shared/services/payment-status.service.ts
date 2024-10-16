import { inject, Injectable, signal } from '@angular/core';
import { PaymentStatusRepositoryService } from '../../DataAccess/Repo/payment-status-repository.service';
import { PaymentStatus } from '../../DataAccess/Models/payment-status.model';
import { take, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PaymentStatusService {
    private paymentStatusRepositoryService = inject(PaymentStatusRepositoryService);

    private paymentStatuses = signal<PaymentStatus[]>([]);
    public readonly loadedPaymentStatuses = this.paymentStatuses.asReadonly();

    private selectedPaymentStatus = signal<PaymentStatus | undefined>(undefined);
    public readonly loadedPaymentStatus = this.selectedPaymentStatus.asReadonly();

    // Create

    // Read

    public GetAllPaymentStatuses() {
        return this.paymentStatusRepositoryService
            .GetAllPaymentStatuses('https://localhost:7276/api/', 'PaymentStatuses')
            .pipe(
                tap({
                    next: (paymentStatuses) => {
                        this.paymentStatuses.set(paymentStatuses);
                    },
                })
            );
    }

    public getPaymentStatusById(id: number) {
        return this.paymentStatusRepositoryService
            .GetPaymentStatusById('https://localhost:7276/api/', 'PaymentStatuses/', id)
            .pipe(
                tap({
                    next: (paymentStatus) => {
                        this.selectedPaymentStatus.set(paymentStatus);
                    },
                })
            );
    }

    // Update

    // Delete
}
