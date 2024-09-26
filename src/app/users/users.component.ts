import { Component } from '@angular/core';
import { TableComponent } from "../shared/table/table.component";

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [TableComponent],
    templateUrl: './users.component.html',
    styleUrl: './users.component.css',
})
export class UsersComponent {
    users = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' },
    ];

    userColumns = [
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
    ];
}
