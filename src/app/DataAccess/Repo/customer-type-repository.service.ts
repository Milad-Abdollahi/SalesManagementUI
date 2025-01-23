import { inject, Injectable } from '@angular/core';
import { IRepositoryService } from './Interfaces/Irepository.service';
import { Observable, tap, throwError } from 'rxjs';

import { IHttpClientDataAccessService } from '../HttpClient/Ihttp-client-data-access.service';
import { HttpClientDataAccessService } from '../HttpClient/http-client-data-access.service';
import { ICustomerType } from '../Models/customer-type.model';
import { CustomerTypeCreateDto } from '../Models/Dto/customer-type-create-dto';

@Injectable({
    providedIn: 'root',
})
export class CustomerTypeRepositoryService
    implements IRepositoryService<ICustomerType, CustomerTypeCreateDto>
{
    private httpClientDataAccessService: IHttpClientDataAccessService = inject(
        HttpClientDataAccessService
    );

    create(
        baseUrl: string,
        endpointPath: string,
        reqBody: CustomerTypeCreateDto
    ): Observable<ICustomerType> {
        const result = this.httpClientDataAccessService.postData<
            ICustomerType,
            CustomerTypeCreateDto
        >(baseUrl, endpointPath, reqBody);
        return result;
    }

    // Read

    readAll(baseUrl: string, endpointPath: string): Observable<ICustomerType[]> {
        const result = this.httpClientDataAccessService.getDataArray<ICustomerType>(
            baseUrl,
            endpointPath
        );
        return result;
    }
    readById(baseUrl: string, endpointPath: string, id: number): Observable<ICustomerType> {
        const result = this.httpClientDataAccessService.getData<ICustomerType>(
            baseUrl,
            `${endpointPath}${id}`
        );
        return result;
    }

    // Update

    public update(
        baseUrl: string,
        endpointPath: string,
        id: number,
        customerTypeCreateDto: CustomerTypeCreateDto
    ): Observable<any> {
        const result = this.httpClientDataAccessService
            .putData<CustomerTypeCreateDto>(baseUrl, `${endpointPath}${id}`, customerTypeCreateDto)
            .pipe(
                tap({
                    error: (err) => {
                        console.log(err);
                        return throwError(
                            () => new Error(err.error.message + '\n' + err.error.title)
                        );
                    },
                })
            );
        return result;
    }

    // Delete

    public delete(baseUrl: string, endpointPath: string, id: number): Observable<any> {
        const result = this.httpClientDataAccessService.deleteData(baseUrl, `${endpointPath}${id}`);
        return result;
    }
}
