"use client";

import { db } from "@/config/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { z } from "zod";

export type Repairman = z.infer<typeof RepairmanSchema>;

export const RepairmanSchema = z.object({
  repairmanId: z.string().optional(),
  repairmanName: z.string(),
});

export default function useManufacturers() {
  const [manufacturers, setManufacturers] = useState<Repairman[]>([]);
  const [isLoadingManufacturers, setIsLoadingManufacturers] =
    useState<boolean>(false);
  const [manufacturersError, setManufacturersError] = useState<Error | null>(
    null
  );

  useEffect(() => {
    setIsLoadingManufacturers(true);
    const manufacturersRef = collection(db, "vehicleManufacturers");

    const unsubscribe = onSnapshot(
      manufacturersRef,
      (querySnapshot) => {
        const allManufacturers: Repairman[] = [];

        querySnapshot.forEach((doc) => {
          allManufacturers.push({
            repairmanId: doc.id,
            repairmanName: doc.data().name,
          });
        });

        setManufacturers(allManufacturers);
        setManufacturersError(null); // Reset error if successful
      },
      (error) => {
        setManufacturersError(error); // Set error if there is a problem
      }
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
