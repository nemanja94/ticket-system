"use client";

import { db } from "@/config/firebase";
import { Customer, CUSTOMER_TYPE } from "@/Entities/Customer.model";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState<boolean>(true);
  const [customersError, setCustomersError] = useState<Error | null>(null);

  useEffect(() => {
    const customersRef = collection(db, "customers");

    const unsubscribe = onSnapshot(
      customersRef,
      (querySnapshot) => {
        const allCustomers: Customer[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          allCustomers.push(
            new Customer(
              data.customerType as CUSTOMER_TYPE,
              data.customerFirstName,
              data.customerLastName,
              data.customerNumber,
              data.customerDateCreated,
              doc.id,
              data.customerDateUpdated,
              data.customerDateDeleted
            )
          );
        });

        setCustomers(allCustomers);
        setIsLoadingCustomers(false);
        setCustomersError(null);
      },
      (error) => {
        setCustomersError(error);
        setIsLoadingCustomers(false);
      }
    );

    return () => {
      unsubscribe(); // Clean up on unmount
    };
  }, []);

  return {
    customers,
    isLoadingCustomers,
    customersError,
  };
}