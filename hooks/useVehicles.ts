"use client";
import { Vehicle } from "@/Entities/Vehicle.model";
import { db } from "@/config/firebase";
import { error } from "console";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLocadingVehicles, setIsLoadingVehicles] = useState<boolean>(false);
  const [vehiclesError, setVehiclesError] = useState<Error | null>(null);

  useEffect(() => {
    let q = query(collection(db, "vehicles"));
    setIsLoadingVehicles(true);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const vehicles: Vehicle[] = [];
      querySnapshot.forEach(
        (doc) => {
          vehicles.push(
            new Vehicle(
              doc.data().customerId,
              doc.data().vehicleDateManufactured,
              doc.data().vehicleDisplacement,
              doc.data().vehiclePower,
              doc.data().vehicleMilage,
              doc.data().vehicleIdNumber,
              doc.data().vehiclePlateNumber,
              doc.data().vehicleDesc,
              doc.data().vehicleDateCreated,
              doc.data().id,
              doc.data().vehicleManufacturer,
              doc.data().vehicleModel,
              doc.data().ivehicleFuelTyped
            )
          );
          setVehicles(vehicles);
          setVehiclesError(null);
        },
        (error: Error) => {
          setVehiclesError(error);
        }
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    vehicles,
    isLocadingVehicles,
    vehiclesError,
  };
}
