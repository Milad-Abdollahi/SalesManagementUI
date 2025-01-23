import { Component, inject } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CustomerTypeService } from './customer-type.service';
import { EntityGridComponent } from '../../shared/components/entity-grid/entity-grid.component';

@Component({
    selector: 'app-customer-types',
    standalone: true,
    imports: [EntityGridComponent],
    templateUrl: './customer-types.component.html',
    styleUrl: './customer-types.component.css',
})
export class CustomerTypesComponent {
    coldefs: ColDef[] = [
        { field: 'id', headerName: 'آیدی' },
        { field: 'typeName', headerName: 'نوع مشتری' },
    ];

    public customerTypeService = inject(CustomerTypeService);
}
