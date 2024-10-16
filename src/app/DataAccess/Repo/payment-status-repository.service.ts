import { inject, Injectable } from '@angular/core';
import { IPaymentStatusRepositoryService } from './Interfaces/Ipayment-status-repository.service';
import { Observable } from 'rxjs';
import { PaymentStatus } from '../Models/payment-status.model';
import { IHttpClientDataAccessService } from '../HttpClient/Ihttp-client-data-access.service';
import { HttpClientDataAccessService } from '../HttpClient/http-client-data-access.service';

@Injectable({
    providedIn: 'root',
})
export class PaymentStatusRepositoryService implements IPaymentStatusRepositoryService {
    private httpClientDataAccess: IHttpClientDataAccessService = inject(
        HttpClientDataAccessService
    );
    // Create

    // Read

    GetAllPaymentStatuses(baseUrl: string, endpointPath: string): Observable<PaymentStatus[]> {
        const result = this.httpClientDataAccess.LoadDataArray<PaymentStatus>(
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
        const result = this.httpClientDataAccess.LoadData<PaymentStatus>(
            baseUrl,
            `${endpointPath}${id}`
        );
        return result;
    }

    // Update

    // Delete
}
