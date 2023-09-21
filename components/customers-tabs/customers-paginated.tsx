"use client";
import { CUSTOMER_TYPE, Customer } from "@/Entities/Customer.model";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  getFirstBatch,
  paginatedCustomers,
} from "@/firebase/firestore/customer-collection";
import CustomerCard from "../customer-card/customer-card.component";
import { Label } from "../ui/label";

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

  const customerTypeHandler = (e: any) => {
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
      <div className="flex flex-col w-[7rem] self-center">
        <Label />
        <Select
          onValueChange={(e) => customerTypeHandler(e)}
          defaultValue={CUSTOMER_TYPE.AllCustomerTypes}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tip musterije" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={CUSTOMER_TYPE.AllCustomerTypes}>
              {CUSTOMER_TYPE.AllCustomerTypes}
            </SelectItem>
            <SelectItem value={CUSTOMER_TYPE.StandardCustomer}>
              {CUSTOMER_TYPE.StandardCustomer}
            </SelectItem>
            <SelectItem value={CUSTOMER_TYPE.PremiumCustomer}>
              {CUSTOMER_TYPE.PremiumCustomer}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

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
