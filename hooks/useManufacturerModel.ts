"use client";

import { db } from "@/config/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { z } from "zod";

export type ManufacturerModel = z.infer<typeof ManufacturerModelSchema>;

export const ManufacturerModelSchema = z.object({
  manufacturerModelId: z.string().optional(),
  manufacturerModelName: z.string(),
  manufacturerId: z.string(),
});

export default function useManufacturerModels(manufacturerName: string) {
  const [manufacturerModels, setManufacturerModels] = useState<
    ManufacturerModel[]
  >([]);
  const [isLoadingManufacturerModels, setIsLoadingManufacturerModels] =
    useState<boolean>(false);
  const [manufacturerModelsError, setManufacturerModelsError] =
    useState<Error | null>(null);

  useEffect(() => {
    setIsLoadingManufacturerModels(true);

    // Early return if manufacturerId is empty
    if (!manufacturerName) {
      setIsLoadingManufacturerModels(false);
      setManufacturerModels([]);
      return () => {};
    }

    try {
      let q = query(
        collection(db, "vehicleModels"),
        where("vehicleManufacturererName", "==", manufacturerName),
        orderBy("modelName", "asc"),
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const allManufacturerModels: ManufacturerModel[] = [];

          querySnapshot.forEach((doc) => {
            allManufacturerModels.push({
              manufacturerModelId: doc.id,
              manufacturerModelName: doc.data().modelName,
              manufacturerId: doc.data().vehicleManufacturererId,
            });
          });

          setManufacturerModels(allManufacturerModels);
          setManufacturerModelsError(null); // Reset error if successful
          setIsLoadingManufacturerModels(false); // Set loading to false after data is loaded
        },
        (error) => {
          console.error("Error loading manufacturer models:", error);
          setManufacturerModelsError(error); // Set error if there is a problem
          setIsLoadingManufacturerModels(false); // Set loading to false even if there's an error
        },
      );

      return () => {
        unsubscribe(); // when component unmounts
      };
    } catch (error) {
      console.error("Error setting up Firestore listener:", error);
      setManufacturerModelsError(
        error instanceof Error ? error : new Error(String(error)),
      );
      setIsLoadingManufacturerModels(false);
      return () => {};
    }
  }, [manufacturerName]);

  return {
    manufacturerModels,
    isLoadingManufacturerModels,
    manufacturerModelsError,
  };
}
