"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "@/config/firebase";
import { Customer, CUSTOMER_TYPE } from "@/Entities/Customer.model";

interface UseCustomersResult {
  customers: Customer[];
  isLoading: boolean;
  error: Error | null;
}

export default function useCustomers(): UseCustomersResult {
  const [state, setState] = useState<UseCustomersResult>({
    customers: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const customersRef = collection(db, "customers");
    const unsubscribe = onSnapshot(
      customersRef,
      (querySnapshot) => {
        const customers = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return new Customer(
            data.customerType as CUSTOMER_TYPE,
            data.customerFirstName,
            data.customerLastName,
            data.customerNumber,
            data.customerDateCreated,
            doc.id,
            data.customerDateUpdated,
            data.customerDateDeleted
          );
        });
        setState({ customers, isLoading: false, error: null });
      },
      (error) => {
        setState((prev) => ({ ...prev, isLoading: false, error }));
      }
    );
    return unsubscribe;
  }, []);

  return state;
}