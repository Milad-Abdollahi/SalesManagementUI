import { NgFor } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [NgFor],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css',
})
export class TableComponent {
    columns = input<{ key: string; label: string }[]>([]);
    data = input<any[]>([]);
}
