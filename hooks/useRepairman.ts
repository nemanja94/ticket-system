"use client";

import { db } from "@/config/firebase";
import { Repairman } from "@/Entities/Reapirman.model";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useRepairman() {
  const [repairmans, setRepairmans] = useState<Repairman[]>([]);
  const [isLoadingRepairmans, setIsLoadingRepairmans] =
    useState<boolean>(false);
  const [repairmansError, setRepairmansError] = useState<Error | null>(
    null
  );

  useEffect(() => {
    setIsLoadingRepairmans(true);
    const repairmansRef = collection(db, "repairman");

    const unsubscribe = onSnapshot(
      repairmansRef,
      (querySnapshot) => {
        const allRepairmans: Repairman[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          allRepairmans.push(
            new Repairman(
              doc.id,
              data.repairmanName,
              data.repairmanPosition,
              data.repairmanDateCreated,
              data.repairmanDateUpdated,
              data.repairmanDateDeleted
            )
          );
        });

        setRepairmans(allRepairmans);
        setRepairmansError(null); // Reset error if successful
      },
      (error) => {
        setRepairmansError(error); // Set error if there is a problem
      }
    );

    return () => {
      unsubscribe(); // when component unmounts
    };
  }, []);

  return {
    repairmans: repairmans,
    isLoadingRepairmans: isLoadingRepairmans,
    repairmansError: repairmansError,
  };
}
