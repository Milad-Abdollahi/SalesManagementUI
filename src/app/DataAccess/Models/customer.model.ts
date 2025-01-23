import { ICustomerType } from './customer-type.model';

export interface ICustomer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    customerType: ICustomerType;
    createdData: Date;
}
