import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Router } from '@angular/router';

import { PaymentMethodService } from '../../shared/services/payment-method.service';
import { EntityGridComponent } from '../../shared/components/entity-grid/entity-grid.component';

// URL: /payment-methods

@Component({
    selector: 'app-payment-methods',
    standalone: true,
    imports: [AgGridAngular, EntityGridComponent],
    templateUrl: './payment-methods.component.html',
    styleUrl: './payment-methods.component.css',
})
export class PaymentMethodsComponent {
    colDefs: ColDef[] = [
        { field: 'id', headerName: 'آیدی' },
        { field: 'methodName', headerName: 'روش پرداخت' },
    ];

    public paymentMethodService = inject(PaymentMethodService);

    // private router = inject(Router);
    // private paymentMethodService = inject(PaymentMethodService);
    // private destroyRef = inject(DestroyRef);
    // public paymentMethods = this.paymentMethodService.loadedPaymentMethods;
    // isFetching = signal(false);
    // error = signal('');
    // colDefs: ColDef[] = [
    //     { field: 'id', headerName: 'آیدی' },
    //     { field: 'methodName', headerName: 'روش پرداخت' },
    // ];
    // ngOnInit(): void {
    //     this.isFetching.set(true);
    //     const subscription = this.paymentMethodService.getAllPaymentMethods().subscribe({
    //         error: (err: Error) => {
    //             this.error.set(err.message);
    //         },
    //         complete: () => {
    //             this.isFetching.set(false);
    //         },
    //     });
    //     this.destroyRef.onDestroy(() => {
    //         subscription.unsubscribe();
    //     });
    // }
    // onGridReady(params: any) {
    //     params.api.sizeColumnsToFit();
    // }
    // onClicklAddBtn() {
    //     this.router.navigate(['payments/payment-methods/new']);
    // }
    // onRowDoubleClicked(event: any) {
    //     const id = event.data.id;
    //     this.router.navigate(['payments/payment-methods/details', id]);
    // }
}
