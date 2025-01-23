import { ICustomerType } from '../customer-type.model';

export interface CustomerCreateDto {
    name: string;
    email: string;
    phone: string;
    address: string;
    customerType: ICustomerType;
    createdData: Date;
}
