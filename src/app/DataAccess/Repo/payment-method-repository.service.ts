import { inject, Injectable } from '@angular/core';
import { IRepositoryService } from './Interfaces/Irepository.service';
import { PaymentMethod } from '../../shared/models/payment-method.model';
import { PaymentMethodCreateDto } from '../../shared/models/dtos/payment-methos-create-dto.model';
import { Observable } from 'rxjs';
import { IHttpClientDataAccessService } from '../HttpClient/Ihttp-client-data-access.service';
import { HttpClientDataAccessService } from '../HttpClient/http-client-data-access.service';

@Injectable({ providedIn: 'root' })
export class PaymentMethodRepositoryService
    implements IRepositoryService<PaymentMethod, PaymentMethodCreateDto>
{
    private httpClientDataAccessService: IHttpClientDataAccessService = inject(
        HttpClientDataAccessService
    );

    // Create
    create(
        baseUrl: string,
        endpointPath: string,
        reqBody: PaymentMethodCreateDto
    ): Observable<PaymentMethod> {
        const result = this.httpClientDataAccessService.postData<
            PaymentMethod,
            PaymentMethodCreateDto
        >(baseUrl, endpointPath, reqBody);
        return result;
    }

    // Read
    readAll(baseUrl: string, endpointPath: string): Observable<PaymentMethod[]> {
        const result = this.httpClientDataAccessService.getDataArray<PaymentMethod>(
            baseUrl,
            endpointPath
        );
        return result;
    }

    readById(baseUrl: string, endpointPath: string, id: number): Observable<PaymentMethod> {
        const result = this.httpClientDataAccessService.getData<PaymentMethod>(
            baseUrl,
            `${endpointPath}${id}`
        );
        return result;
    }

    update(
        baseUrl: string,
        endpointPath: string,
        id: number,
        createDto: PaymentMethodCreateDto
    ): Observable<any> {
        const result = this.httpClientDataAccessService.putData(
            baseUrl,
            `${endpointPath}${id}`,
            createDto
        );
        return result;
    }

    delete(baseUrl: string, endpointPath: string, id: number): Observable<any> {
        const result = this.httpClientDataAccessService.deleteData(baseUrl, `${endpointPath}${id}`);
        return result;
    }
}
