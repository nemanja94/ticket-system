import { Timestamp } from "firebase/firestore";
import { Customer } from "./Customer.model";

export class Vehicle {
  constructor(
    customerId: Customer["customerId"],
    vehicleDateManufactured: string,
    vehicleDisplacement: string,
    vehiclePower: string,
    vehicleMilage: string,
    vehicleIdNumber: string,
    vehiclePlateNumber: string,
    vehicleDesc: string,
    vehicleDateCreated: Timestamp | string,
    vehicleId?: string,
    vehicleManufacturer?: string,
    vehicleModel?: string,
    vehicleFuelType?: string,
    vehicleDateUpdated?: Timestamp,
    vehicleDateDeleted?: Timestamp,
  ) {
    this.customerId = customerId;
    this.vehicleDateManufactured = vehicleDateManufactured;
    this.vehicleDisplacement = vehicleDisplacement;
    this.vehiclePower = vehiclePower;
    this.vehicleMilage = vehicleMilage;
    this.vehicleIdNumber = vehicleIdNumber;
    this.vehiclePlateNumber = vehiclePlateNumber;
    this.vehicleDesc = vehicleDesc;
    this.vehicleDateCreated = vehicleDateCreated;
    this.vehicleId = vehicleId;
    this.vehicleManufacturer = vehicleManufacturer;
    this.vehicleModel = vehicleModel;
    this.vehicleFuelType = vehicleFuelType;
    this.vehicleDateUpdated = vehicleDateUpdated;
    this.vehicleDateDeleted = vehicleDateDeleted;
  }

  customerId: Customer["customerId"];
  vehicleDateManufactured: string;
  vehicleDisplacement: string;
  vehiclePower: string;
  vehicleMilage: string;
  vehicleIdNumber: string;
  vehiclePlateNumber: string;
  vehicleDesc: string;
  vehicleDateCreated: Timestamp | string;
  vehicleId?: string;
  vehicleManufacturer?: string;
  vehicleModel?: string;
  vehicleFuelType?: string;
  vehicleDateUpdated?: Timestamp;
  vehicleDateDeleted?: Timestamp;
}
