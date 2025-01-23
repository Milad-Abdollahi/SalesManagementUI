import { Component, inject } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CustomerInfoService } from './customer-info.service';
import { EntityGridComponent } from '../../shared/components/entity-grid/entity-grid.component';

@Component({
    selector: 'app-customers-info',
    standalone: true,
    imports: [EntityGridComponent],
    templateUrl: './customers-info.component.html',
    styleUrl: './customers-info.component.css',
})
export class CustomersInfoComponent {
    colDefs: ColDef[] = [
        { field: 'id', headerName: 'آیدی' },
        { field: 'name', headerName: 'نام مشتری' },
    ];

    public customerInfoService = inject(CustomerInfoService);
}
