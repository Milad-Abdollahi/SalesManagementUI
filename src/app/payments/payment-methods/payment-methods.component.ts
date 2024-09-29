import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';

import { PaymentMethodService } from '../../shared/services/payment-method.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-payment-methods',
    standalone: true,
    imports: [AgGridAngular],
    templateUrl: './payment-methods.component.html',
    styleUrl: './payment-methods.component.css',
})
export class PaymentMethodsComponent implements OnInit {
    constructor(public paymentMethodService: PaymentMethodService, private router: Router) {}
    private httpClient = inject(HttpClient);
    private destroyRef = inject(DestroyRef);

    public paymentMethods = computed(() => this.paymentMethodService.paymentMethods());

    ngOnInit(): void {
        const subscription = this.httpClient
            .get('https://localhost:7276/api/PaymentMetods', { observe: 'body' })
            .subscribe({
                next: (resData) => {
                    console.log(resData);
                },
            });

        this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }

    addPaymentMethod() {
        const newId = this.paymentMethods().length + 1;
        const newName = 'ravesh pardakht jadid';
        this.paymentMethodService.addPaymentMethod(newId, newName);
    }

    colDefs: ColDef[] = [
        { field: 'id', headerName: 'آیدی' },
        { field: 'name', headerName: 'روش پرداخت' },
    ];

    onRowDoubleClicked(event: any) {
        const id = event.data.id;
        this.router.navigate(['payments/payment-methods', id]);
    }

    // Todo:
    // ngOnInit(): void {
    //     this.paymentMethodsService.fetchPaymentMethods().subscribe();
    // }
}
