import { Vehicle } from "@/Entities/Vehicle.model";
import { db } from "@/config/firebase";
import {
  DocumentData,
  QueryFieldFilterConstraint,
  QuerySnapshot,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const addVehicle = async (
  vehicle: Vehicle
): Promise<string | boolean> => {
  const existingVehicle = await searchVehicle(
    vehicle.customerId,
    vehicle.vehicleIdNumber,
    vehicle.vehiclePlateNumber,
    vehicle.vehicleManufacturer,
    vehicle.vehicleModel,
    vehicle.vehicleFuelType
  );
  if (existingVehicle.vehicles.length > 0) return false;

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

export const searchVehicle = async (
  _customerId?: string,
  _vehicleIdNumber?: string,
  _vehiclePlateNumber?: string,
  _vehicleManufacturer?: string,
  _vehicleModel?: string,
  _vehicleFuelType?: string,
  _vehicleDateManufactured?: string
): Promise<{
  vehicles: Vehicle[];
}> => {
  let constraints: QueryFieldFilterConstraint[] = [];

  if (_customerId && _customerId !== "")
    constraints.push(where("customerId", "==", _customerId));

  if (_vehicleIdNumber && _vehicleIdNumber !== "")
    constraints.push(where("vehicleIdNumber", "==", _vehicleIdNumber));

  if (_vehiclePlateNumber && _vehiclePlateNumber !== "")
    constraints.push(where("vehiclePlateNumber", "==", _vehiclePlateNumber));

  if (_vehicleManufacturer && _vehicleManufacturer !== "")
    constraints.push(where("vehicleManufacturer", "==", _vehicleManufacturer));

  if (_vehicleModel && _vehicleModel !== "")
    constraints.push(where("vehicleModel", "==", _vehicleModel));

  if (_vehicleFuelType && _vehicleFuelType !== "")
    constraints.push(where("vehicleFuelType", "==", _vehicleFuelType));

  if (_vehicleDateManufactured && _vehicleDateManufactured !== "")
    constraints.push(
      where("vehicleDateManufactured", "==", _vehicleDateManufactured)
    );

  console.log("constraints", constraints);

  let firstBatch = query(
    collection(db, "vehicles"),
    orderBy("vehicleDateCreated", "desc"),
    ...constraints
  );

  const documentSnapshots: QuerySnapshot<DocumentData, DocumentData> =
    await getDocs(firstBatch);

  const vehiclesColl: Vehicle[] = [];
  let data: DocumentData;

  documentSnapshots.forEach((doc) => {
    if (doc.exists()) {
      data = doc.data();

      data.vehicleDateCreated = new Date(data.vehicleDateCreated.seconds * 1000)
        .toISOString()
        .split("T")[0];

      vehiclesColl.push(
        new Vehicle(
          data.customerId,
          data.vehicleDateManufactured,
          data.vehicleDisplacement,
          data.vehiclePower,
          data.vehicleMilage,
          data.vehicleIdNumber,
          data.vehiclePlateNumber,
          data.vehicleDesc,
          data.vehicleDateCreated,
          data.vehicleManufacturer,
          data.vehicleModel,
          data.vehicleFuelType,
          doc.id
        )
      );
    }
  });

  return { vehicles: vehiclesColl };
};
