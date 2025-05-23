"use client";
import { useState } from "react";
import "./vehicleCard.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Vehicle } from "@/Entities/Vehicle.model";

type VehicleCardProps = {
  vehicle: Vehicle;
};

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const [uniteType, setUniteType] = useState("ks");

  const converterHandler = () => {
    switch (uniteType) {
      case "ks":
        setUniteType("kw");
        break;
      case "hp":
        setUniteType("ks");
        break;
      default:
        setUniteType("ks");
        break;
    }
  };

  return (
    <Card className="overflow-hidden border-none h-full">
      <CardHeader className="bg-emerald-400 overflow-hidden p-4">
        <CardTitle className="text-lg">
          {vehicle.vehicleManufacturer} {vehicle.vehicleModel}
        </CardTitle>
        <CardDescription className="text-zinc-700 font-medium text-sm">
          Datum: {vehicle.vehicleDateCreated.toString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-zinc-200 p-4 space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-zinc-500">Zapremina:</p>
            <p className="font-medium">{vehicle.vehicleDisplacement} ccm</p>
          </div>
          <div>
            <p className="text-zinc-500">Gorivo:</p>
            <p className="font-medium">{vehicle.vehicleFuelType}</p>
          </div>
          <div>
            <p className="text-zinc-500">Snaga:</p>
            <p className="font-medium">
              {vehicle.vehiclePower}
              <span className="cursor-pointer ml-1 text-zinc-600" onClick={converterHandler}>
                {uniteType}
              </span>
            </p>
          </div>
          <div>
            <p className="text-zinc-500">Broj šasije:</p>
            <p className="font-medium">{vehicle.vehicleIdNumber}</p>
          </div>
          <div>
            <p className="text-zinc-500">Registracija:</p>
            <p className="font-medium">{vehicle.vehiclePlateNumber}</p>
          </div>
          {vehicle.vehicleDesc && (
            <div className="col-span-2">
              <p className="text-zinc-500">Opis:</p>
              <p className="font-medium">{vehicle.vehicleDesc}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-zinc-300 p-3 flex justify-between items-center">
        <p className="text-zinc-500">Kilometraža:</p>
        <p className="font-semibold">{vehicle.vehicleMilage} km</p>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;
