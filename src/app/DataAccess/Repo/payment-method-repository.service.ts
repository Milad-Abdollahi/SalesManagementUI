import { inject, Injectable } from '@angular/core';
import { IRepositoryService } from './Interfaces/Irepository.service';
import { Observable, tap, throwError } from 'rxjs';

import { IHttpClientDataAccessService } from '../HttpClient/Ihttp-client-data-access.service';
import { HttpClientDataAccessService } from '../HttpClient/http-client-data-access.service';
import { IPaymentMethod } from '../Models/payment-method.model';
import { PaymentMethodCreateDto } from '../Models/Dto/payment-method-create-dto';

@Injectable({
    providedIn: 'root',
})
export class PaymentMethodRepositoryService
    implements IRepositoryService<IPaymentMethod, PaymentMethodCreateDto>
{
    private httpClientDataAccessService: IHttpClientDataAccessService = inject(
        HttpClientDataAccessService
    );

    // Create

    create(
        baseUrl: string,
        endpointPath: string,
        reqBody: PaymentMethodCreateDto
    ): Observable<IPaymentMethod> {
        const result = this.httpClientDataAccessService.postData<
            IPaymentMethod,
            PaymentMethodCreateDto
        >(baseUrl, endpointPath, reqBody);
        return result;
    }

    // Read

    readAll(baseUrl: string, endpointPath: string): Observable<IPaymentMethod[]> {
        const result = this.httpClientDataAccessService.getDataArray<IPaymentMethod>(
            baseUrl,
            endpointPath
        );
        return result;
    }

    readById(baseUrl: string, endpointPath: string, id: number): Observable<IPaymentMethod> {
        const result = this.httpClientDataAccessService.getData<IPaymentMethod>(
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
        paymentMethodCreateDto: PaymentMethodCreateDto
    ): Observable<any> {
        const result = this.httpClientDataAccessService
            .putData<PaymentMethodCreateDto>(
                baseUrl,
                `${endpointPath}${id}`,
                paymentMethodCreateDto
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
