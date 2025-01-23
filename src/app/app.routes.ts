import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CustomersComponent } from './customers/customers.component';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentMethodsComponent } from './payments/payment-methods/payment-methods.component';
import { PaymentMethodDetailsComponent } from './payments/payment-methods/payment-method-details/payment-method-details.component';
import { NewPaymentMethodComponent } from './payments/payment-methods/new-payment-method/new-payment-method.component';
import { PaymentStatusesComponent } from './payments/payment-statuses/payment-statuses.component';
import { PaymentStatusDetailsComponent } from './payments/payment-statuses/payment-status-details/payment-status-details.component';
import { NewPaymentStatusComponent } from './payments/payment-statuses/new-payment-status/new-payment-status.component';
import { CustomerTypesComponent } from './customers/customer-types/customer-types.component';
import { CustomerTypeDetailsComponent } from './customers/customer-types/customer-type-details/customer-type-details.component';
import { NewCustomerTypeComponent } from './customers/customer-types/new-customer-type/new-customer-type.component';
import { CustomersInfoComponent } from './customers/customers-info/customers-info.component';
import { CustomerInfoDetailsComponent } from './customers/customers-info/customer-info-details/customer-info-details.component';

export const routes: Routes = [
    { path: 'users', component: UsersComponent },
    {
        path: 'customers',
        component: CustomersComponent,
        children: [
            { path: 'customer-info', component: CustomersInfoComponent },
            { path: 'customer-info/details/:id', component: CustomerInfoDetailsComponent },
            { path: 'customer-types', component: CustomerTypesComponent },
            { path: 'customer-types/details/:id', component: CustomerTypeDetailsComponent },
            { path: 'customer-types/new', component: NewCustomerTypeComponent },
        ],
    },
    {
        path: 'payments',
        component: PaymentsComponent,
        children: [
            //
            { path: 'payment-methods', component: PaymentMethodsComponent },
            { path: 'payment-methods/details/:id', component: PaymentMethodDetailsComponent },
            { path: 'payment-methods/new', component: NewPaymentMethodComponent },
            //
            { path: 'payment-statuses', component: PaymentStatusesComponent },
            { path: 'payment-statuses/details/:id', component: PaymentStatusDetailsComponent },
            { path: 'payment-statuses/new', component: NewPaymentStatusComponent },
        ],
    },
];
