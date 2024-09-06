import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
})
export class NavbarComponent {
    navbarDropdowns = [
        { name: 'Users', nestedItems: ['Users Info', 'User Roles'] },
        { name: 'Customers', nestedItems: ['Customers Info', 'Customer Types'] },
    ];
}
