"use client";
import { CUSTOMER_TYPE, Customer } from "@/Entities/Customer.model";
import { paginatedCustomers } from "@/firebase/firestore/customer-collection";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import CustomerCard from "../customer-card/customer-card.component";
import { Button } from "../ui/button";
import CustomerTypeSelect from "./customer-type-select";

export default function CustomersPaginated() {
  const [customerType, setCustomerType] = useState<CUSTOMER_TYPE>(
    CUSTOMER_TYPE.AllCustomerTypes
  );
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [last, setLast] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData> | undefined
  >(undefined);
  const [limit, setLimit] = useState<number>(5);

  const c: Customer[] = [];

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        return await paginatedCustomers(limit, undefined);
      } catch (err) {
        console.log(err);
        return { customers: [], last: undefined };
      }
    };

    fetchCustomers().then((res) => {
      res.customers.length > 0 ? setCustomers(res.customers) : setCustomers([]);
      res.last && setLast(res.last);
    });
  }, [limit]);

  const customerTypeHandler = (e: string) => {
    setCustomerType(
      e === CUSTOMER_TYPE.AllCustomerTypes
        ? CUSTOMER_TYPE.AllCustomerTypes
        : e === CUSTOMER_TYPE.StandardCustomer
        ? CUSTOMER_TYPE.StandardCustomer
        : CUSTOMER_TYPE.PremiumCustomer
    );
  };

  const paginationHandler = () => {
    const fetchCustomers = async () => {
      return await paginatedCustomers(limit, last);
    };

    fetchCustomers().then((res) => {
      res.customers.length > 0 && c.push(...customers, ...res.customers);
      res.customers.length > 0 && setCustomers(c);
      res.last && setLast(res.last);
    });
  };

  return (
    <>
      <CustomerTypeSelect customerTypeHandler={customerTypeHandler} />
      <div className="grid w-full grid-cols-4 p-2 gap-3">
        {customers &&
          customers.map((customer) => {
            switch (customerType) {
              case CUSTOMER_TYPE.PremiumCustomer:
                if (customer.customerType === CUSTOMER_TYPE.PremiumCustomer) {
                  return (
                    <CustomerCard
                      key={customer.customerId}
                      customer={customer}
                    />
                  );
                }
                break;
              case CUSTOMER_TYPE.StandardCustomer:
                if (customer.customerType === CUSTOMER_TYPE.StandardCustomer) {
                  return (
                    <CustomerCard
                      key={customer.customerId}
                      customer={customer}
                    />
                  );
                }
                break;
              case CUSTOMER_TYPE.AllCustomerTypes:
                return (
                  <CustomerCard key={customer.customerId} customer={customer} />
                );
            }
          })}
      </div>
      <Button className="self-center" type="submit" onClick={paginationHandler}>
        Load More
      </Button>
    </>
  );
}
