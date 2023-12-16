import {
  FuelType,
  Vehicle,
  VehicleManufacturer,
  VehicleModel,
} from "@/Entities/Vehicle.model";
import VehicleTabs from "@/components/vehicle-tabs/vehicle-tabs";
import { Timestamp } from "firebase/firestore";
import "./vehiclePage.css";

const vehicles: Vehicle[] = [
  new Vehicle(
    "1",
    "2010",
    "2000",
    "150",
    "500000",
    "S9ASDASD8ASD9SAN33",
    "BG1234AB",
    "Opis",
    Timestamp.fromDate(new Date()),
    "1",
    VehicleManufacturer.Audi,
    VehicleModel.Audi_A1,
    FuelType.Benzin
  ),
  new Vehicle(
    "1",
    "2010",
    "2000",
    "150",
    "500000",
    "S9ASDASD8ASD9SAN34",
    "BG1234AC",
    "Opis",
    Timestamp.fromDate(new Date()),
    "2",
    VehicleManufacturer.Audi,
    VehicleModel.Audi_A1,
    FuelType.Benzin
  ),
  new Vehicle(
    "1",
    "2010",
    "2000",
    "150",
    "500000",
    "S9ASDASD8ASD9SAN35",
    "BG1234AD",
    "Opis",
    Timestamp.fromDate(new Date()),
    "3",
    VehicleManufacturer.Lada,
    VehicleModel.Lada_Samata,
    FuelType.Plin
  ),
];

export default function Vehicles() {
  return (
    <section className="vehicleSection">
      <VehicleTabs />
    </section>
  );
}
