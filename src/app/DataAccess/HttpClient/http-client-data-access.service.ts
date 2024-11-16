import { inject, Injectable } from '@angular/core';
import { IHttpClientDataAccessService } from './Ihttp-client-data-access.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class HttpClientDataAccessService implements IHttpClientDataAccessService {
    private httpClient = inject(HttpClient);

    postData<T, U>(baseUrl: string, controllerPath: string, reqBody: U): Observable<T> {
        var result = this.httpClient.post<T>(`${baseUrl}${controllerPath}`, reqBody);
        return result;
    }

    getDataArray<T>(baseUrl: string, controllerPath: string): Observable<T[]> {
        var result = this.httpClient.get<T[]>(`${baseUrl}${controllerPath}`, { observe: 'body' });
        return result;
    }

    getData<T>(baseUrl: string, controllerPath: string): Observable<T> {
        var result = this.httpClient.get<T>(`${baseUrl}${controllerPath}`, { observe: 'body' });
        return result;
    }

    putData<T>(baseUrl: string, controllerPath: string, parameters: T): Observable<any> {
        var result = this.httpClient.put(`${baseUrl}${controllerPath}`, parameters, {
            observe: 'body',
        });
        return result;
    }

    deleteData(baseUrl: string, controllerPath: string): Observable<any> {
        const result = this.httpClient.delete(`${baseUrl}${controllerPath}`);
        return result;
    }
}
