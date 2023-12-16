"use client";
import { Customer } from "@/Entities/Customer.model";
import { db } from "@/config/firebase";
import { error } from "console";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLocadingCustomers, setIsLoadingCustomers] = useState<boolean>(false);
  const [customersError, setCustomersError] = useState<Error | null>(null);

  useEffect(() => {
    let q = query(
      collection(db, "customers"),
      orderBy("customerFirstName", "asc")
    );
    setIsLoadingCustomers(true);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const customers: Customer[] = [];
      querySnapshot.forEach(
        (doc) => {
          customers.push(
            new Customer(
              doc.data().customerType,
              doc.data().customerFirstName,
              doc.data().customerLastName,
              doc.data().customerNumber,
              doc.data().customerDateCreated,
              doc.id
            )
          );
          setCustomers(customers);
          setCustomersError(null);
        },
        (error: Error) => {
          setCustomersError(error);
        }
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { customers, isLocadingCustomers, customersError };
}
