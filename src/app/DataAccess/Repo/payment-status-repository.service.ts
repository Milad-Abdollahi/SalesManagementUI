import { inject, Injectable } from '@angular/core';
import { IPaymentStatusRepositoryService } from './Interfaces/Ipayment-status-repository.service';
import { Observable, retry, tap, throwError } from 'rxjs';
import { PaymentStatus } from '../Models/payment-status.model';
import { IHttpClientDataAccessService } from '../HttpClient/Ihttp-client-data-access.service';
import { HttpClientDataAccessService } from '../HttpClient/http-client-data-access.service';
import { PaymentStatusCreateDto } from '../Models/Dto/payment-status-create-dto';
import { NavigationSkipped } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class PaymentStatusRepositoryService implements IPaymentStatusRepositoryService {
    private httpClientDataAccessService: IHttpClientDataAccessService = inject(
        HttpClientDataAccessService
    );

    // Create
    createPaymentStatus(
        baseUrl: string,
        endpointPath: string,
        reqBody: PaymentStatusCreateDto
    ): Observable<PaymentStatus> {
        const result = this.httpClientDataAccessService.postData<
            PaymentStatus,
            PaymentStatusCreateDto
        >(baseUrl, endpointPath, reqBody);
        return result;
    }

    // Read

    GetAllPaymentStatuses(baseUrl: string, endpointPath: string): Observable<PaymentStatus[]> {
        const result = this.httpClientDataAccessService.LoadDataArray<PaymentStatus>(
            baseUrl,
            endpointPath
        );
        return result;
    }

    GetPaymentStatusById(
        baseUrl: string,
        endpointPath: string,
        id: number
    ): Observable<PaymentStatus> {
        const result = this.httpClientDataAccessService.LoadData<PaymentStatus>(
            baseUrl,
            `${endpointPath}${id}`
        );
        return result;
    }

    // Update
    public updatePaymentStatus(
        baseUrl: string,
        endpointPath: string,
        id: number,
        paymensStatusCreateDto: PaymentStatusCreateDto
    ) {
        const result = this.httpClientDataAccessService
            .saveData<PaymentStatusCreateDto>(
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
    deletePaymentStatus(baseUrl: string, endpointPath: string, id: number): Observable<any> {
        const result = this.httpClientDataAccessService.deleteData(baseUrl, `${endpointPath}${id}`);
        return result;
    }
}
