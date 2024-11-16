import { Signal } from '@angular/core';
import { Observable } from 'rxjs';

export interface EntityService<TReturn, UDto> {
    create(dto: UDto): Observable<TReturn>;
    getAll(): Observable<TReturn[]>;
    getById(id: number): Observable<TReturn>;
    edit(id: number, dto: UDto): Observable<TReturn>;
    delete(id: number): Observable<void>;
    readonly loadedEntities: Signal<TReturn[]>;
}
