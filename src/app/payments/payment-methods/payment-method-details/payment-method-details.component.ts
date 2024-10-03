import {
    Component,
    computed,
    DestroyRef,
    inject,
    Input,
    numberAttribute,
    OnInit,
    signal,
} from '@angular/core';
import { PaymentMethod } from '../../../shared/models/payment-method.model';
import { PaymentMethodService } from '../../../shared/services/payment-method.service';
import { NgFor, NgIf } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { NotExpr } from '@angular/compiler';

@Component({
    selector: 'app-payment-method-details',
    standalone: true,
    imports: [AgGridAngular],
    templateUrl: './payment-method-details.component.html',
    styleUrl: './payment-method-details.component.css',
})
export class PaymentMethodDetailsComponent implements OnInit {
    // id is imported from the url
    @Input({ transform: numberAttribute }) id = 0;

    private paymentMethodService = inject(PaymentMethodService);
    private destroyRef = inject(DestroyRef);

    public paymentMethod = signal<PaymentMethod | undefined>(undefined);

    ngOnInit(): void {
        const subscription = this.paymentMethodService.getPaymentMethodById(this.id).subscribe({
            next: (resData) => {
                this.paymentMethod.set(resData);
            },
            error: (err) => console.log(err),
        });

        this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }
}
