import {Timestamp} from "firebase/firestore";

export enum CUSTOMER_TYPE {
    AllCustomerTypes = "Svi",
    StandardCustomer = "Standard",
    PremiumCustomer = "Premium",
}

export class Customer {
    constructor(
        customerType: CUSTOMER_TYPE,
        customerFirstName: string,
        customerLastName: string,
        customerNumber: string,
        customerDateCreated: Timestamp | string,
        customerId?: string,
        customerDateUpdated?: Timestamp,
        customerDateDeleted?: Timestamp
    ) {
        this.customerId = customerId;
        this.customerType = customerType;
        this.customerFirstName = customerFirstName;
        this.customerLastName = customerLastName;
        this.customerNumber = customerNumber;
        this.customerDateCreated = customerDateCreated;
        this.customerDateUpdated = customerDateUpdated;
        this.customerDateDeleted = customerDateDeleted;
    }

    customerId?: string;
    customerType: CUSTOMER_TYPE;
    customerFirstName: string;
    customerLastName: string;
    customerNumber: string;
    customerDateCreated: Timestamp | string;
    customerDateUpdated?: Timestamp;
    customerDateDeleted?: Timestamp;
}
