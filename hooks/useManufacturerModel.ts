"use client";

import { useEffect, useState } from "react";
import {
  CollectionReference,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/config/firebase";

export interface ManufacturerModel {
  manufacturerModelId?: string;
  manufacturerModelName: string;
  manufacturerId: string;
}

interface UseManufacturerModelsResult {
  models: ManufacturerModel[];
  isLoading: boolean;
  error: Error | null;
}

export default function useManufacturerModels(
  manufacturerName: string,
): UseManufacturerModelsResult {
  const [state, setState] = useState<UseManufacturerModelsResult>({
    models: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!manufacturerName) {
      setState((prev) => ({ ...prev, isLoading: false, models: [] }));
      return;
    }

    try {
      const vehicleModelsCollection = collection(
        db,
        "vehicleModels",
      ) as CollectionReference<DocumentData>;
      const modelsQuery = query(
        vehicleModelsCollection,
        where("vehicleManufacturererName", "==", manufacturerName),
        orderBy("modelName", "asc"),
      );

      const unsubscribe = onSnapshot(
        modelsQuery,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const models = snapshot.docs.map((doc) => ({
            manufacturerModelId: doc.id,
            manufacturerModelName: doc.data().modelName,
            manufacturerId: doc.data().vehicleManufacturererId,
          }));

          setState({
            models,
            isLoading: false,
            error: null,
          });
        },
        (error: FirestoreError) => {
          console.error("Error loading manufacturer models:", error);
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: new Error(error.message),
          }));
        },
      );

      return unsubscribe;
    } catch (error) {
      console.error("Error setting up Firestore listener:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error(String(error)),
      }));
    }
  }, [manufacturerName]);

  return state;
}
