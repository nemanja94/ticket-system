import { Vehicle } from "@/Entities/Vehicle.model";
import VehicleTabs from "@/components/vehicle-tabs/vehicle-tabs";
import { Timestamp } from "firebase/firestore";
import "./vehiclePage.css";

export default function Vehicles() {
  return (
    <section className="vehicleSection">
      <VehicleTabs />
    </section>
  );
}
