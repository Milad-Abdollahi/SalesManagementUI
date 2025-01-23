import { inject, Injectable } from '@angular/core';
import { IRepositoryService } from './Interfaces/Irepository.service';
import { ICustomer } from '../Models/customer.model';
import { CustomerCreateDto } from '../Models/Dto/customer-create-dto';
import { Observable } from 'rxjs';
import { HttpClientDataAccessService } from '../HttpClient/http-client-data-access.service';

@Injectable({
    providedIn: 'root',
})
export class CustomerRepositoryService implements IRepositoryService<ICustomer, CustomerCreateDto> {
    private httpClientDataAccessSerivice = inject(HttpClientDataAccessService);

    // Create

    create(
        baseUrl: string,
        endpointPath: string,
        reqBody: CustomerCreateDto
    ): Observable<ICustomer> {
        const result = this.httpClientDataAccessSerivice.postData<ICustomer, CustomerCreateDto>(
            baseUrl,
            endpointPath,
            reqBody
        );
        return result;
    }

    // Read
    readAll(baseUrl: string, endpointPath: string): Observable<ICustomer[]> {
        const result = this.httpClientDataAccessSerivice.getDataArray<ICustomer>(
            baseUrl,
            endpointPath
        );
        return result;
    }

    readById(baseUrl: string, endpointPath: string, id: number): Observable<ICustomer> {
        const result = this.httpClientDataAccessSerivice.getData<ICustomer>(
            baseUrl,
            `${endpointPath}${id}`
        );
        return result;
    }
    update(
        baseUrl: string,
        endpointPath: string,
        id: number,
        createDto: CustomerCreateDto
    ): Observable<any> {
        throw new Error('Method not implemented.');
    }

    // Delete
    delete(baseUrl: string, endpointPath: string, id: number): Observable<any> {
        throw new Error('Method not implemented.');
    }
}
