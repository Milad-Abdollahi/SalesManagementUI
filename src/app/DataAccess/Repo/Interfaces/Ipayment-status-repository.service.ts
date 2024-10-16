import { Observable } from 'rxjs';
import { PaymentStatus } from '../../Models/payment-status.model';

export interface IPaymentStatusRepositoryService {
    // Create

    // Read
    GetAllPaymentStatuses(baseUrl: string, endpointPath: string): Observable<PaymentStatus[]>;

    GetPaymentStatusById(
        baseUrl: string,
        endpointPath: string,
        id: number
    ): Observable<PaymentStatus>;

    // Update
    // Delete
}
