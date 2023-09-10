import {Timestamp} from "firebase/firestore";
import {Customer} from "./Customer.model";

export enum VehicleManufacturer {
    Audi = "Audi",
    Lada = "Lada",
}

export enum VehicleModel {
    Audi_A1 = "A1",
    Lada_Samata = "Samara",
}

export enum FuelType {
    Benzin = "Benzin",
    Dizel = "Dizel",
    Plin = "Plin",
}

export class Vehicle {
    constructor(
        vehicleId: number,
        customerId: Customer["customerId"],
        vehicleManufacturer: VehicleManufacturer,
        vehicleModel: VehicleModel,
        vehicleDateManufactured: number,
        vehicleDisplacement: number,
        vehicleFuelType: FuelType,
        vehiclePower: number,
        vehicleMilage: number,
        vehicleIdNumber: string,
        vehiclePlateNumber: string,
        vehicleDesc: string,
        vehicleDateCreated: Timestamp | string,
        vehicleDateUpdated?: Timestamp,
        vehicleDateDeleted?: Timestamp
    ) {
        this.vehicleId = vehicleId;
        this.customerId = customerId;
        this.vehicleManufacturer = vehicleManufacturer;
        this.vehicleModel = vehicleModel;
        this.vehicleDateManufactured = vehicleDateManufactured;
        this.vehicleDisplacement = vehicleDisplacement;
        this.vehicleFuelType = vehicleFuelType;
        this.vehiclePower = vehiclePower;
        this.vehicleMilage = vehicleMilage;
        this.vehicleIdNumber = vehicleIdNumber;
        this.vehiclePlateNumber = vehiclePlateNumber;
        this.vehicleDesc = vehicleDesc;
        this.vehicleDateCreated = vehicleDateCreated;
        this.vehicleDateUpdated = vehicleDateUpdated;
        this.vehicleDateDeleted = vehicleDateDeleted;
    }

    vehicleId: number;
    customerId: Customer["customerId"];
    vehicleManufacturer: VehicleManufacturer;
    vehicleModel: VehicleModel;
    vehicleDateManufactured: number;
    vehicleDisplacement: number;
    vehicleFuelType: FuelType;
    vehiclePower: number;
    vehicleMilage: number;
    vehicleIdNumber: string;
    vehiclePlateNumber: string;
    vehicleDesc: string;
    vehicleDateCreated: Timestamp | string;
    vehicleDateUpdated?: Timestamp;
    vehicleDateDeleted?: Timestamp;
}
