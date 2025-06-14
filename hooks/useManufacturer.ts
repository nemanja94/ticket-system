"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { z } from "zod";

import { db } from "@/config/firebase";

export const ManufacturerSchema = z.object({
  manufacturerId: z.string().optional(),
  manufacturerName: z.string(),
});

export type Manufacturer = z.infer<typeof ManufacturerSchema>;

interface UseManufacturersResult {
  manufacturers: Manufacturer[];
  isLoading: boolean;
  error: Error | null;
}

export default function useManufacturers(): UseManufacturersResult {
  const [state, setState] = useState<UseManufacturersResult>({
    manufacturers: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const manufacturersRef = collection(db, "vehicleManufacturers");

    const unsubscribe = onSnapshot(
      manufacturersRef,
      (querySnapshot) => {
        const manufacturers = querySnapshot.docs.map((doc) => ({
          manufacturerId: doc.id,
          manufacturerName: doc.data().name,
        }));

        setState({
          manufacturers,
          isLoading: false,
          error: null,
        });
      },
      (error) => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error,
        }));
      },
    );

    return unsubscribe;
  }, []);

  return state;
}
