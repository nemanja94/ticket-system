"use client";

import { db } from "@/config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { z } from "zod";

export type Manufacturer = z.infer<typeof ManufacturerSchema>;

export const ManufacturerSchema = z.object({
  manufacturerId: z.string().optional(),
  manufacturerName: z.string(),
});

export default function useManufacturers() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [isLoadingManufacturers, setIsLoadingManufacturers] =
    useState<boolean>(false);
  const [manufacturersError, setManufacturersError] = useState<Error | null>(
    null,
  );

  useEffect(() => {
    setIsLoadingManufacturers(true);
    const manufacturersRef = collection(db, "vehicleManufacturers");

    const unsubscribe = onSnapshot(
      manufacturersRef,
      (querySnapshot) => {
        const allManufacturers: Manufacturer[] = [];

        querySnapshot.forEach((doc) => {
          allManufacturers.push({
            manufacturerId: doc.id,
            manufacturerName: doc.data().name,
          });
        });

        setManufacturers(allManufacturers);
        setManufacturersError(null); // Reset error if successful
      },
      (error) => {
        setManufacturersError(error); // Set error if there is a problem
      },
    );

    return () => {
      unsubscribe(); // when component unmounts
    };
  }, []);

  return {
    manufacturers: manufacturers,
    isLoadingManufacturers: isLoadingManufacturers,
    manufacturersError: manufacturersError,
  };
}
