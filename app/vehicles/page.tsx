import {Timestamp} from "firebase/firestore";
import "./vehiclePage.css";
import {FuelType, Vehicle, VehicleManufacturer, VehicleModel,} from "@/Entities/Vehicle.model";
import CustomerCard from "@/components/customer-card/customer-card.component";
import VehicleCard from "@/components/vehicle-card/vehicle-card.component";

const vehicles: Vehicle[] = [
    new Vehicle(
        1,
        "1",
        VehicleManufacturer.Audi,
        VehicleModel.Audi_A1,
        2010,
        2000,
        FuelType.Benzin,
        150,
        500000,
        "S9ASDASD8ASD9SAN33",
        "BG1234AB",
        "Opis",
        Timestamp.fromDate(new Date())
    ),
    new Vehicle(
        2,
        "1",
        VehicleManufacturer.Audi,
        VehicleModel.Audi_A1,
        2010,
        2000,
        FuelType.Benzin,
        150,
        500000,
        "S9ASDASD8ASD9SAN33",
        "BG1234AB",
        "Opis",
        Timestamp.fromDate(new Date())
    ),
    new Vehicle(
        3,
        "1",
        VehicleManufacturer.Audi,
        VehicleModel.Audi_A1,
        2010,
        2000,
        FuelType.Benzin,
        150,
        500000,
        "S9ASDASD8ASD9SAN33",
        "BG1234AB",
        "Opis",
        Timestamp.fromDate(new Date())
    ),
];

export default function Vehicles() {
    return (
        // <section className="vehicleSection">
        //     {vehicles &&
        //         vehicles.map((vehicle) => {
        //             // @ts-ignore
        //             // vehicle.vehicleDateCreated = new Date(vehicle.vehicleDateCreated.seconds * 1000).toISOString().split("T")[0]
        //             vehicle.vehicleDateCreated = new Date(vehicle.vehicleDateCreated.seconds * 1000).toISOString().split("T")[0]
        //             return (
        //                 <VehicleCard key={vehicle.vehicleId} vehicle={vehicle}/>
        //             )
        //         })}
        // </section>
        <p>Vehicles</p>
    );
}
