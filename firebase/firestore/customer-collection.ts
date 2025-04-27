import { Customer, CUSTOMER_TYPE } from "@/Entities/Customer.model";
import { db } from "@/config/firebase";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
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

export const addCustomer = async (
  customer: Customer
): Promise<boolean | string> => {
  //TODO proveriti da li postoji musterija sa istim imenom i prezimenom, kao i brojem telefona
  const existingCustomer = await searchCustomer(
    customer.customerNumber,
    undefined,
    undefined
  );

  if (existingCustomer.customers.length > 0) return false;

  const docRef = await addDoc(collection(db, "customers"), {
    customerDateCreated: customer.customerDateCreated,
    customerFirstName: customer.customerFirstName,
    customerLastName: customer.customerLastName,
    customerNumber: customer.customerNumber,
    customerType: customer.customerType,
  });
  return docRef.id;
};

/**
 * Fetches the first batch of customers, ordered by most recent.
 * @param {number} _limit The number of customers to fetch.
 * @returns {Promise<{ customers: Customer[], last: QueryDocumentSnapshot<DocumentData> | undefined }>} A promise which resolves with an object containing an array of Customer objects and the last QueryDocumentSnapshot of the query.
 */
export const getFirstBatch = async (_limit: number) => {
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
      data.customerDateCreated = new Date(
        data.customerDateCreated.seconds * 1000
      )
        .toISOString()
        .split("T")[0];

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

  return { customers: customersColl, last };
};

/**
 * Paginates customers by given limit and last customer ID. If last customer ID is undefined, it fetches the first batch of customers.
 * @param _limit {number} Number of customers to fetch
 * @param _lastCustomerId {QueryDocumentSnapshot<DocumentData, DocumentData> | undefined} Last customer ID that was fetched
 * @param _type {CUSTOMER_TYPE} Customer type to filter by
 * @returns {Promise<{ customers: Customer[]; last: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined }>} Promise that resolves with object containing array of Customer objects and last QueryDocumentSnapshot of the query
 */
export const paginatedCustomers = async (
  _limit: number,
  _lastCustomerId:
    | QueryDocumentSnapshot<DocumentData, DocumentData>
    | undefined,
  _type?: CUSTOMER_TYPE
): Promise<{
  customers: Customer[];
  last: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
}> => {
  let firstBatch;
  let constraints: QueryFieldFilterConstraint[] = [];

  if (
    _type === CUSTOMER_TYPE.StandardCustomer ||
    _type === CUSTOMER_TYPE.PremiumCustomer
  )
    constraints.push(where("customerType", "==", _type));

  if (_lastCustomerId === undefined) {
    firstBatch = query(
      collection(db, "customers"),
      orderBy("customerDateCreated", "desc"),
      ...constraints,
      limit(_limit)
    );
  } else {
    firstBatch = query(
      collection(db, "customers"),
      orderBy("customerDateCreated", "desc"),
      ...constraints,
      startAfter(_lastCustomerId),
      limit(_limit)
    );
  }

  const documentSnapshots = await getDocs(firstBatch);
  const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  const customersColl: Customer[] = [];
  let data;

  documentSnapshots.forEach((doc) => {
    if (doc.exists()) {
      data = doc.data();

      // TODO: remove
      // console.log("collection => ", data);
      data.customerDateCreated = new Date(
        data.customerDateCreated.seconds * 1000
      )
        .toISOString()
        .split("T")[0];

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

  return { customers: customersColl, last };
};

/**
 * Searches for customers based on the given phone number, customer type, and first name.
 *
 * @param {string} _phoneNumber - The phone number of the customer to search for.
 * @param {CUSTOMER_TYPE} [_type] - Optional. The type of the customer (Standard or Premium).
 * @param {string} [_firstName] - Optional. The first name of the customer to search for.
 * @returns {Promise<{ customers: Customer[]; last: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined; }>}
 * A promise that resolves with an object containing an array of Customer objects and the last QueryDocumentSnapshot of the query.
 */

export const searchCustomer = async (
  _phoneNumber?: string,
  _type?: CUSTOMER_TYPE,
  _firstName?: string
): Promise<{
  customers: Customer[];
  last: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
}> => {
  let firstBatch;
  let constraints: QueryFieldFilterConstraint[] = [];

  if (
    _type === CUSTOMER_TYPE.StandardCustomer ||
    _type === CUSTOMER_TYPE.PremiumCustomer
  )
    constraints.push(where("customerType", "==", _type));
  if (_firstName !== "" && _firstName !== undefined)
    constraints.push(where("customerFirstName", "==", _firstName));
  if (_phoneNumber !== "" && _phoneNumber !== undefined)
    constraints.push(where("customerNumber", "==", _phoneNumber));

  firstBatch = query(
    collection(db, "customers"),
    orderBy("customerDateCreated", "desc"),
    ...constraints
  );

  const documentSnapshots: QuerySnapshot<DocumentData, DocumentData> =
    await getDocs(firstBatch);
  const last = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  const customersColl: Customer[] = [];
  let data: DocumentData;

  documentSnapshots.forEach((doc) => {
    if (doc.exists()) {
      data = doc.data();

      data.customerDateCreated = new Date(
        data.customerDateCreated.seconds * 1000
      )
        .toISOString()
        .split("T")[0];

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

  return { customers: customersColl, last };
};

export const findOneById = async (id: string): Promise<Customer> => {
  const customerRef = doc(db, "customers", id);
  const customerSnap = await getDoc(customerRef);

  if (customerSnap.exists()) {
    const data = customerSnap.data();
    data.customerDateCreated = new Date(data.customerDateCreated.seconds * 1000)
      .toISOString()
      .split("T")[0];

    return new Customer(
      data.customerType,
      data.customerFirstName,
      data.customerLastName,
      data.customerNumber,
      data.customerDateCreated,
      customerSnap.id
    );
  } else {
    return {} as Customer;
  }
};
