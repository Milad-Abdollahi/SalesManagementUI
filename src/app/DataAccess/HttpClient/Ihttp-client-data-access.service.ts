import { Observable } from 'rxjs';

export interface IHttpClientDataAccessService {
    postData<T, U>(baseUrl: string, controllerPath: string, body: U): Observable<T>;
    LoadDataArray<T>(baseUrl: string, controllerPath: string): Observable<T[]>;
    LoadData<T>(baseUrl: string, controllerPath: string): Observable<T>;
    saveData<T>(baseUrl: string, controllerPath: string, parameters: T): Observable<any>;
    deleteData(baseUrl: string, controllerPath: string): Observable<any>;
}
