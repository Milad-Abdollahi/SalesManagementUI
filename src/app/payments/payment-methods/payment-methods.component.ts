import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PaymentMethodService } from '../../shared/services/payment-method.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PaymentMethod, PaymentMethodFromAPI } from '../../shared/models/payment-method.model';
import { catchError, throwError } from 'rxjs';

@Component({
    selector: 'app-payment-methods',
    standalone: true,
    imports: [AgGridAngular],
    templateUrl: './payment-methods.component.html',
    styleUrl: './payment-methods.component.css',
})
export class PaymentMethodsComponent implements OnInit {
    constructor(public paymentMethodService: PaymentMethodService, private router: Router) {}
    private destroyRef = inject(DestroyRef);

    public paymentMethods = signal<PaymentMethod[] | undefined>(undefined);
    isFetching = signal(false);
    error = signal('');

    ngOnInit(): void {
        this.isFetching.set(true);
        const subscription = this.paymentMethodService.getAllPaymentMethods().subscribe({
            next: (resData) => {
                this.paymentMethods.set(resData);
            },
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

    addPaymentMethod() {
        // const newId = this.paymentMethods().length + 1;
        // const newName = 'ravesh pardakht jadid';
        // this.paymentMethodService.addPaymentMethod(newId, newName);
    }

    colDefs: ColDef[] = [
        { field: 'id', headerName: 'آیدی' },
        { field: 'metodName', headerName: 'روش پرداخت' },
    ];

    onRowDoubleClicked(event: any) {
        const id = event.data.id;
        this.router.navigate(['payments/payment-methods', id]);
    }
}
