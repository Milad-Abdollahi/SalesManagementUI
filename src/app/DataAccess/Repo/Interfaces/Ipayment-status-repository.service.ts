import { Observable } from 'rxjs';
import { PaymentStatus } from '../../Models/payment-status.model';
import { PaymentStatusCreateDto } from '../../Models/Dto/payment-status-create-dto';

export interface IPaymentStatusRepositoryService {
    // Create
    createPaymentStatus(
        baseUrl: string,
        endpointPath: string,
        reqBody: PaymentStatusCreateDto
    ): Observable<PaymentStatus>;

    // Read
    GetAllPaymentStatuses(baseUrl: string, endpointPath: string): Observable<PaymentStatus[]>;

    GetPaymentStatusById(
        baseUrl: string,
        endpointPath: string,
        id: number
    ): Observable<PaymentStatus>;

    // Update
    updatePaymentStatus(
        baseUrl: string,
        endpointPath: string,
        id: number,
        paymensStatusCreateDto: PaymentStatusCreateDto
    ): Observable<any>;

    // Delete
    deletePaymentStatus(baseUrl: string, endpointPath: string, id: number): Observable<any>;
}
