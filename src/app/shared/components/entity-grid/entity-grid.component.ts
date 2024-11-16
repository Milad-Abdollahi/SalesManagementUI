import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    signal,
    inject,
    DestroyRef,
    Signal,
} from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { EntityService } from '../../services/entity-service.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-entity-grid',
    standalone: true,
    imports: [AgGridAngular],
    templateUrl: './entity-grid.component.html',
    styleUrl: './entity-grid.component.css',
})
export class EntityGridComponent<T, Dto> implements OnInit {
    @Input() service!: EntityService<T, Dto>;
    @Input() colDefs: ColDef[] = [];
    @Input() detailRoute: string = '';
    @Input() addNewRoute: string = '';

    private destroyRef = inject(DestroyRef);
    public entities!: Signal<T[]>;
    private router = inject(Router);

    isFetching = signal(false);
    error = signal('');

    ngOnInit(): void {
        this.entities = this.service.loadedEntities;
        this.fetchEntities();
    }

    fetchEntities(): void {
        this.isFetching.set(true);
        const subscription = this.service.getAll().subscribe({
            error: (err) => {
                this.error.set(err.message);
            },
            complete: () => {
                this.isFetching.set(false);
            },
        });
        this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
        });
    }

    onGridReady(params: any) {
        params.api.sizeColumnsToFit();
    }

    onClickAddBtn() {
        this.router.navigate([this.addNewRoute]);
    }

    onRowDoubleClicked(event: any) {
        const id = event.data.id;
        this.router.navigate([`${this.detailRoute}/${id}`]);
    }
}
