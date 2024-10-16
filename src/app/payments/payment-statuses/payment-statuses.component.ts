import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PaymentStatusService } from '../../shared/services/payment-status.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Router } from '@angular/router';

@Component({
    selector: 'app-payment-statuses',
    standalone: true,
    imports: [AgGridAngular],
    templateUrl: './payment-statuses.component.html',
    styleUrl: './payment-statuses.component.css',
})
export class PaymentStatusesComponent implements OnInit {
    private paymentStatusService = inject(PaymentStatusService);
    private destroyRef = inject(DestroyRef);
    public paymentStatuses = this.paymentStatusService.loadedPaymentStatuses;
    private router = inject(Router);

    isFetching = signal(false);
    error = signal('');

    colDefs: ColDef[] = [
        { field: 'id', headerName: 'آیدی' },
        { field: 'statusName', headerName: 'وضعیت پرداخت' },
    ];

    ngOnInit(): void {
        this.isFetching.set(true);
        const subscription = this.paymentStatusService.GetAllPaymentStatuses().subscribe({
            error: (err: Error) => {
                this.error.set(err.message);
            },
            complete: () => {
                this.isFetching.set(false);
            },
        });
        this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
        });
    }

    onGridReady(params: any) {
        params.api.sizeColumnsToFit();
    }

    onRowDoubleClicked(event: any) {
        const id = event.data.id;
        this.router.navigate(['payments/payment-statuses/details', id]);
    }
}
