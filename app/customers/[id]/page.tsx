"use client";

import CustomerCard from "@/components/customer-card/customer-card.component";
import { Customer } from "@/Entities/Customer.model";
import { findOneById } from "@/firebase/firestore/customer-collection";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer>({} as Customer);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        return await findOneById(params.id);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCustomer().then((res) => {
      setCustomer(res!);
    });
  });
  return (
    <div className="flex justify-center items-center">
      {/* <div className="grid w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-2 gap-3"> */}
      <CustomerCard customer={customer} link={false} />
    </div>
  );
}
