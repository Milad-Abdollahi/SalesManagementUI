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
            name: 'Customers',
            nestedItems: [
                { name: 'Customers Info', path: '/customers' },
                { name: 'Customer Types', path: '/customer-types' },
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
            name: 'Payments',
            nestedItems: [
                { name: 'Payments Info', path: '/payments' },
                { name: 'Payment Methods', path: 'payments/payment-methods' },
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
