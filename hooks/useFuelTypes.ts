"use client";

import { db } from "@/config/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { z } from "zod";

export type FuelType = z.infer<typeof FuelTypeSchema>;

export const FuelTypeSchema = z.object({
  fuelTypeId: z.string().optional(),
  fuelTypeName: z.string(),
});

export default function useFuelTypes() {
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [isLoadingFuelTypes, setIsLoadingFuelTypes] = useState<boolean>(false);
  const [fuelTypesError, setFuelTypesError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoadingFuelTypes(true);

    try {
      const fuelTypesRef = collection(db, "fuelType");

      const unsubscribe = onSnapshot(
        fuelTypesRef,
        (querySnapshot) => {
          const allFuelTypes: FuelType[] = [];

          querySnapshot.forEach((doc) => {
            console.log(doc.id, doc.data());
            allFuelTypes.push({
              fuelTypeId: doc.id,
              fuelTypeName: doc.data().type,
            });
          });

          setFuelTypes(allFuelTypes);
          setFuelTypesError(null); // Reset error if successful
          setIsLoadingFuelTypes(false);
        },
        (error) => {
          console.error("Error loading fuel types:", error);
          setFuelTypesError(error); // Set error if there is a problem
          setIsLoadingFuelTypes(false);
        },
      );

      return () => {
        unsubscribe(); // when component unmounts
      };
    } catch (error) {
      console.error("Error setting up Firestore listener:", error);
      setFuelTypesError(
        error instanceof Error ? error : new Error(String(error)),
      );
      setIsLoadingFuelTypes(false);
      return () => {};
    }
  }, []);

  return {
    fuelTypes,
    isLoadingFuelTypes,
    fuelTypesError,
  };
}
