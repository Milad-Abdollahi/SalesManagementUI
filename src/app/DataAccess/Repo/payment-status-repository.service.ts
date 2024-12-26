import { inject, Injectable } from '@angular/core';
import { IRepositoryService } from './Interfaces/Irepository.service';
import { Observable, tap, throwError } from 'rxjs';

import { IHttpClientDataAccessService } from '../HttpClient/Ihttp-client-data-access.service';
import { HttpClientDataAccessService } from '../HttpClient/http-client-data-access.service';
import { IPaymentStatus } from '../Models/payment-status.model';
import { PaymentStatusCreateDto } from '../Models/Dto/payment-status-create-dto';

@Injectable({
    providedIn: 'root',
})
export class PaymentStatusRepositoryService
    implements IRepositoryService<IPaymentStatus, PaymentStatusCreateDto>
{
    private httpClientDataAccessService: IHttpClientDataAccessService = inject(
        HttpClientDataAccessService
    );

    // Create
    // Todo**: change the name of endpointPath to something more meaningfull according to what backend needs

    create(
        baseUrl: string,
        endpointPath: string,
        reqBody: PaymentStatusCreateDto
    ): Observable<IPaymentStatus> {
        const result = this.httpClientDataAccessService.postData<
            IPaymentStatus,
            PaymentStatusCreateDto
        >(baseUrl, endpointPath, reqBody);
        return result;
    }

    // Read

    readAll(baseUrl: string, endpointPath: string): Observable<IPaymentStatus[]> {
        const result = this.httpClientDataAccessService.getDataArray<IPaymentStatus>(
            baseUrl,
            endpointPath
        );
        return result;
    }

    readById(baseUrl: string, endpointPath: string, id: number): Observable<IPaymentStatus> {
        const result = this.httpClientDataAccessService.getData<IPaymentStatus>(
            baseUrl,
            `${endpointPath}${id}`
        );
        return result;
    }

    // Todo: this class is only responsible for data access not handling errors~!
    // Update

    public update(
        baseUrl: string,
        endpointPath: string,
        id: number,
        paymensStatusCreateDto: PaymentStatusCreateDto
    ): Observable<any> {
        const result = this.httpClientDataAccessService
            .putData<PaymentStatusCreateDto>(
                baseUrl,
                `${endpointPath}${id}`,
                paymensStatusCreateDto
            )
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

    delete(baseUrl: string, endpointPath: string, id: number): Observable<any> {
        const result = this.httpClientDataAccessService.deleteData(baseUrl, `${endpointPath}${id}`);
        return result;
    }
}
