import { inject, Injectable, signal } from '@angular/core';
import { PaymentStatusRepositoryService } from '../../DataAccess/Repo/payment-status-repository.service';
import { PaymentStatus } from '../../DataAccess/Models/payment-status.model';
import { take, tap, throwError } from 'rxjs';
import { PaymentStatusCreateDto } from '../../DataAccess/Models/Dto/payment-status-create-dto';

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
    public createPaymentStatus(paymentStatusCreateDto: PaymentStatusCreateDto) {
        return this.paymentStatusRepositoryService.createPaymentStatus(
            'https://localhost:7276/api/',
            'PaymentStatuses',
            paymentStatusCreateDto
        );
    }

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

    public editPaymentStatus(id: number, paymentStatusCreateDto: PaymentStatusCreateDto) {
        return this.paymentStatusRepositoryService
            .updatePaymentStatus(
                'https://localhost:7276/api/',
                'PaymentStatuses/',
                id,
                paymentStatusCreateDto
            )
            .pipe(
                tap({
                    error: (err) => {
                        console.dir(err.error);
                    },
                })
            );
    }

    // Delete
    public deletePaymentStatus(id: number) {
        return this.paymentStatusRepositoryService.deletePaymentStatus(
            'https://localhost:7276/api/',
            `PaymentStatuses/`,
            id
        );
    }
}
