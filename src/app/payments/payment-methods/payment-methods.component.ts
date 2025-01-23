import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ColDef } from 'ag-grid-community';

import { PaymentMethodService } from './payment-method.service';
import { EntityGridComponent } from '../../shared/components/entity-grid/entity-grid.component';

// URL: /payment-methods

@Component({
    selector: 'app-payment-methods',
    standalone: true,
    imports: [EntityGridComponent],
    templateUrl: './payment-methods.component.html',
    styleUrl: './payment-methods.component.css',
})
export class PaymentMethodsComponent {
    colDefs: ColDef[] = [
        { field: 'id', headerName: 'آیدی' },
        { field: 'methodName', headerName: 'روش پرداخت' },
    ];

    public paymentMethodService = inject(PaymentMethodService);
}
