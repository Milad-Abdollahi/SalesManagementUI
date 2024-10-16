import { inject, Injectable } from '@angular/core';
import { IHttpClientDataAccessService } from './Ihttp-client-data-access.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class HttpClientDataAccessService implements IHttpClientDataAccessService {
    private httpClient = inject(HttpClient);

    LoadDataArray<T>(baseUrl: string, controllerPath: string): Observable<T[]> {
        var result = this.httpClient.get<T[]>(`${baseUrl}${controllerPath}`, { observe: 'body' });
        return result;
    }

    LoadData<T>(baseUrl: string, controllerPath: string): Observable<T> {
        var result = this.httpClient.get<T>(`${baseUrl}${controllerPath}`, { observe: 'body' });
        return result;
    }
}
