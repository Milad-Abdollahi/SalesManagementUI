import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TableComponent } from './shared/table/table.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, TableComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'SalesManagementUI';

    // users = [
    //     { id: 1, firstName: 'John', lastName: 'Doe' },
    //     { id: 2, firstName: 'Jane', lastName: 'Smith' },
    // ];

    // userColumns = [
    //     { key: 'firstName', label: 'First Name' },
    //     { key: 'lastName', label: 'Last Name' },
    // ];
}
