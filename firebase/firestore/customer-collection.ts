import {Customer, CUSTOMER_TYPE} from "@/Entities/Customer.model";
import {db} from "@/config/firebase";
import {
    addDoc,
    collection,
    DocumentData,
    getDocs,
    limit,
    orderBy,
    query,
    QueryDocumentSnapshot,
    QueryFieldFilterConstraint,
    QuerySnapshot,
    startAfter,
    where,
} from "firebase/firestore";

/**
 *
 * @returns Customer[]
 */
export const getAllCustomers = async (): Promise<Customer[]> => {
    const snapshot = await getDocs(collection(db, "customers"));
    const customersColl: Customer[] = [];
    let data;

    snapshot.forEach((doc) => {
        data = doc.data();

        customersColl.push(
            new Customer(
                data.customerType,
                data.customerFirstName,
                data.customerLastName,
                data.customerNumber,
                data.customerDateCreated,
                doc.id
            )
        );
    });

    return customersColl;
};

/**
 *
 * @param type Custorem_Type
 * @returns Customers[]
 */
export const getAllCustomersByType = async (
    type: CUSTOMER_TYPE
): Promise<Customer[]> => {
    const q = query(
        collection(db, "customers"),
        where("customerType", "==", type)
    );
    const snapshot = await getDocs(q);
    const customersColl: Customer[] = [];
    let data;

    snapshot.forEach((doc) => {
        data = doc.data();
        customersColl.push(
            new Customer(
                data.id,
                data.customerType,
                data.customerFirstName,
                data.customerLastName,
                data.customerNumber,
                data.customerDateCreated
            )
        );
    });

    return customersColl;
};

export const addCustomer = async (customer: Customer): Promise<string> => {
    const docRef = await addDoc(collection(db, "customers"), {
        customerDateCreated: customer.customerDateCreated,
        customerFirstName: customer.customerFirstName,
        customerLastName: customer.customerLastName,
        customerNumber: customer.customerNumber,
        customerType: customer.customerType,
    });
    return docRef.id;
};

export const getFirstBatch = async (_limit: number,) => {
    const firstBatch = query(
        collection(db, "customers"),
        orderBy("customerDateCreated", "desc"),
        limit(_limit)
    );

    const documentSnapshots = await getDocs(firstBatch);
    const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const customersColl: Customer[] = [];
    let data;

    documentSnapshots.forEach((doc) => {
        if (doc.exists()) {
            data = doc.data();
            data.customerDateCreated = new Date(data.customerDateCreated.seconds * 1000).toISOString().split("T")[0]

            customersColl.push(
                new Customer(
                    data.customerType,
                    data.customerFirstName,
                    data.customerLastName,
                    data.customerNumber,
                    data.customerDateCreated,
                    doc.id
                )
            );
        }
    });

    return {customers: customersColl, last};
}
export const paginatedCustomers = async (
    _limit: number,
    _lastCustomerId: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined,
    _type?: CUSTOMER_TYPE,
): Promise<{
    customers: Customer[];
    last: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
}> => {
    let firstBatch;
    let constraints: QueryFieldFilterConstraint[] = []

    if (_type === CUSTOMER_TYPE.StandardCustomer || _type === CUSTOMER_TYPE.PremiumCustomer) constraints.push(where("customerType", "==", _type))

    if (_lastCustomerId === undefined) {
        firstBatch = query(
            collection(db, "customers"),
            orderBy("customerDateCreated", "desc"),
            ...constraints,
            limit(_limit)
        )
    } else {
        firstBatch = query(
            collection(db, "customers"),
            orderBy("customerDateCreated", "desc"),
            ...constraints,
            startAfter(_lastCustomerId),
            limit(_limit)
        )
    }

    const documentSnapshots = await getDocs(firstBatch);
    const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const customersColl: Customer[] = [];
    let data;

    documentSnapshots.forEach((doc) => {
        if (doc.exists()) {
            data = doc.data();

            console.log("collection => ", data)
            data.customerDateCreated = new Date(data.customerDateCreated.seconds * 1000).toISOString().split("T")[0]

            customersColl.push(
                new Customer(
                    data.customerType,
                    data.customerFirstName,
                    data.customerLastName,
                    data.customerNumber,
                    data.customerDateCreated,
                    doc.id
                )
            );
        }
    });

    return {customers: customersColl, last};
};

export const searchCustomer = async (
    _type: CUSTOMER_TYPE,
    _firstName: string,
    _phoneNumber: string,
): Promise<{
    customers: Customer[];
    last: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
}> => {
    let firstBatch;
    let constraints: QueryFieldFilterConstraint[] = []

    if (_type === CUSTOMER_TYPE.StandardCustomer || _type === CUSTOMER_TYPE.PremiumCustomer) constraints.push(where("customerType", "==", _type))
    if (_firstName !== "") constraints.push(where("customerFirstName", "==", _firstName))
    if (_phoneNumber !== "") constraints.push(where("customerNumber", "==", _phoneNumber))

    firstBatch = query(
        collection(db, "customers"),
        orderBy("customerDateCreated", "desc"),
        ...constraints,
    )

    const documentSnapshots: QuerySnapshot<DocumentData, DocumentData> = await getDocs(firstBatch);
    const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const customersColl: Customer[] = [];
    let data: DocumentData;

    documentSnapshots.forEach((doc) => {
        if (doc.exists()) {
            data = doc.data();

            data.customerDateCreated = new Date(data.customerDateCreated.seconds * 1000).toISOString().split("T")[0]

            customersColl.push(
                new Customer(
                    data.customerType,
                    data.customerFirstName,
                    data.customerLastName,
                    data.customerNumber,
                    data.customerDateCreated,
                    doc.id
                )
            );
        }
    });

    return {customers: customersColl, last};
};
