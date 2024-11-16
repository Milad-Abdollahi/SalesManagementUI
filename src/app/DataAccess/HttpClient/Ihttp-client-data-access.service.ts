import { Observable } from 'rxjs';
// Todo: apply T and U after the name of the interface like this: IHttpClientDataAccessService<T, U>
export interface IHttpClientDataAccessService {
    postData<T, U>(baseUrl: string, controllerPath: string, body: U): Observable<T>;
    getDataArray<T>(baseUrl: string, controllerPath: string): Observable<T[]>;
    getData<T>(baseUrl: string, controllerPath: string): Observable<T>;
    putData<T>(baseUrl: string, controllerPath: string, parameters: T): Observable<any>;
    deleteData(baseUrl: string, controllerPath: string): Observable<any>;
}
