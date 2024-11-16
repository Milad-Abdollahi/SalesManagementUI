import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PaymentStatusService } from '../../shared/services/payment-status.service';
import { ColDef } from 'ag-grid-community';
import { EntityGridComponent } from '../../shared/components/entity-grid/entity-grid.component';

@Component({
    selector: 'app-payment-statuses',
    standalone: true,
    imports: [EntityGridComponent],
    templateUrl: './payment-statuses.component.html',
    styleUrl: './payment-statuses.component.css',
})
export class PaymentStatusesComponent {
    colDefs: ColDef[] = [
        { field: 'id', headerName: 'آیدی' },
        { field: 'statusName', headerName: 'وضعیت پرداخت' },
    ];

    public paymentStatusService = inject(PaymentStatusService);
}
