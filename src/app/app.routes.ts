import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CustomersComponent } from './customers/customers.component';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentMethodsComponent } from './payments/payment-methods/payment-methods.component';
import { PaymentMethodDetailsComponent } from './payments/payment-methods/payment-method-details/payment-method-details.component';
import { NewPaymentMethodComponent } from './payments/payment-methods/new-payment-method/new-payment-method.component';
import { PaymentStatusesComponent } from './payments/payment-statuses/payment-statuses.component';
import { PaymentStatusDetailsComponent } from './payments/payment-statuses/payment-status-details/payment-status-details/payment-status-details.component';

export const routes: Routes = [
    { path: 'users', component: UsersComponent },
    { path: 'customers', component: CustomersComponent },
    {
        path: 'payments',
        children: [
            { path: 'payments-info', component: PaymentsComponent },
            { path: 'payment-methods', component: PaymentMethodsComponent },
            { path: 'payment-methods/details/:id', component: PaymentMethodDetailsComponent },
            { path: 'payment-methods/new', component: NewPaymentMethodComponent },
            { path: 'payment-statuses', component: PaymentStatusesComponent },
            { path: 'payment-statuses/details/:id', component: PaymentStatusDetailsComponent },
        ],
    },
];
