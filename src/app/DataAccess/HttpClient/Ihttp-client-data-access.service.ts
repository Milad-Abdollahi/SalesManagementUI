import { Observable } from 'rxjs';

export interface IHttpClientDataAccessService {
    // LoadData<T>(): Observable<T>;
    LoadDataArray<T>(baseUrl: string, controllerPath: string): Observable<T[]>;
    LoadData<T>(baseUrl: string, controllerPath: string): Observable<T>;
}
