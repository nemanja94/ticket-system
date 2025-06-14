"use client";

import { useEffect, useState } from "react";
import {
  CollectionReference,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/config/firebase";
import { Repairman } from "@/Entities/Reapirman.model";

interface UseRepairmanResult {
  repairmans: Repairman[];
  isLoading: boolean;
  error: Error | null;
}

export default function useRepairman(): UseRepairmanResult {
  const [state, setState] = useState<UseRepairmanResult>({
    repairmans: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    try {
      const repairmanCollection = collection(db, "repairman") as CollectionReference<DocumentData>;

      const unsubscribe = onSnapshot(
        repairmanCollection,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const repairmans = snapshot.docs.map((doc) => {
            const data = doc.data();
            return new Repairman(
              doc.id,
              data.repairmanName,
              data.repairmanPosition,
              data.repairmanDateCreated,
              data.repairmanDateUpdated,
              data.repairmanDateDeleted
            );
          });

          console.log("Repairmen loaded:", repairmans);

          setState({
            repairmans,
            isLoading: false,
            error: null,
          });
        },
        (error: FirestoreError) => {
          console.error("Error loading repairmen:", error);
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: new Error(error.message),
          }));
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error("Error setting up Firestore listener:", error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error(String(error)),
      }));
    }
  }, []);

  return state;
}
