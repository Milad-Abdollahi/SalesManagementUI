import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CustomersComponent } from './customers/customers.component';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentMethodsComponent } from './payments/payment-methods/payment-methods.component';
import { PaymentMethodDetailsComponent } from './payments/payment-methods/payment-method-details/payment-method-details.component';

export const routes: Routes = [
    { path: 'users', component: UsersComponent },
    { path: 'customers', component: CustomersComponent },
    {
        path: 'payments',
        children: [
            { path: 'payments-info', component: PaymentsComponent },
            { path: 'payment-methods', component: PaymentMethodsComponent },
            { path: 'payment-methods/:id', component: PaymentMethodDetailsComponent },
        ],
    },
];
