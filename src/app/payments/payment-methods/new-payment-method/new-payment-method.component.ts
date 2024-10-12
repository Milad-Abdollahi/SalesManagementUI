import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-new-payment-method',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './new-payment-method.component.html',
    styleUrl: './new-payment-method.component.css',
})
export class NewPaymentMethodComponent {
    public newPaymentMethodForm = new FormGroup({
        methodName: new FormControl<string | undefined>(undefined),
    });
    
}
