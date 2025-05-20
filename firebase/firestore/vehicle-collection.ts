import { Vehicle } from "@/Entities/Vehicle.model";
import { db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";

export const addVehicle = async (vehicle: Vehicle): Promise<string> => {
  const docRef = await addDoc(collection(db, "vehicles"), {
    customerId: vehicle.customerId,
    vehicleDateManufactured: vehicle.vehicleDateManufactured,
    vehicleDisplacement: vehicle.vehicleDisplacement,
    vehiclePower: vehicle.vehiclePower,
    vehicleMilage: vehicle.vehicleMilage,
    vehicleIdNumber: vehicle.vehicleIdNumber,
    vehiclePlateNumber: vehicle.vehiclePlateNumber,
    vehicleDesc: vehicle.vehicleDesc,
    vehicleDateCreated: vehicle.vehicleDateCreated,
    vehicleManufacturer: vehicle.vehicleManufacturer,
    vehicleModel: vehicle.vehicleModel,
    vehicleFuelType: vehicle.vehicleFuelType,
  });
  return docRef.id;
};
