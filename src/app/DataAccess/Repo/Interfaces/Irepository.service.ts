import { Observable } from 'rxjs';

export interface IRepositoryService<TReturn, UDto> {
    // Create
    create(baseUrl: string, endpointPath: string, reqBody: UDto): Observable<TReturn>;

    // Read
    readAll(baseUrl: string, endpointPath: string): Observable<TReturn[]>;

    readById(baseUrl: string, endpointPath: string, id: number): Observable<TReturn>;

    // Todo: Observable<any> should be changed to strongly typed

    // Update
    update(baseUrl: string, endpointPath: string, id: number, createDto: UDto): Observable<any>;

    // Delete
    delete(baseUrl: string, endpointPath: string, id: number): Observable<any>;
}
