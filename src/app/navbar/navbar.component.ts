import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterOutlet],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent {
    navbarDropdowns: NavbarDropdown[] = [
        {
            name: 'Users And Security',
            nestedItems: [
                { name: 'Users', path: '/users' },
                { name: 'User Roles', path: '/user-roles' },
            ],
        },
        {
            name: 'مشتریان',
            nestedItems: [
                { name: 'Customers Info', path: '/customers' },
                { name: 'انواع مشتریان', path: '/customers/customer-types' },
            ],
        },
        {
            name: 'Products',
            nestedItems: [
                { name: 'Products Info', path: '/products' },
                { name: 'Product Types', path: '/product-types' },
                { name: 'Product Categories', path: '/product-categories' },
            ],
        },
        {
            name: 'پرداخت ها',
            nestedItems: [
                { name: 'Payments Info', path: '/payments' },
                { name: 'روش های پرداخت', path: 'payments/payment-methods' },
                { name: 'وضعیت های پرداخت', path: 'payments/payment-statuses' },
            ],
        },
    ];
}

interface NestedItem {
    name: string;
    path: string;
}

interface NavbarDropdown {
    name: string;
    nestedItems: NestedItem[];
}
