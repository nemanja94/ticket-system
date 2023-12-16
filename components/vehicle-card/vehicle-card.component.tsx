"use client";
import {Vehicle} from "@/Entities/Vehicle.model";
import {FunctionComponent, useState} from "react";
import "./vehicleCard.css";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

type Props = {
    vehicle: Vehicle;
};

const VehicleCard: FunctionComponent<Props> = ({vehicle: Vehicle}) => {

    const [uniteType, setUniteType] = useState("ks")


    const converterHandler = () => {

        switch (uniteType) {
            case "ks":
                setUniteType("kw")
                break;
            case "hp":
                setUniteType("ks")
                break;
            default:
                setUniteType("ks")
                break;
        }

    }

    return (
        <Card className="overflow-hidden border-none">
            <CardHeader
                className="bg-emerald-400 overflow-hidden">
                <CardTitle>{Vehicle.vehicleManufacturer} {Vehicle.vehicleModel}</CardTitle>
                <CardDescription
                    // @ts-ignore
                    className="text-zinc-700 font-semibold">{Vehicle.vehicleDateCreated} </CardDescription>
            </CardHeader>
            <CardContent className="bg-zinc-200">
                <p className="pt-2 text-lg font-semibold">{Vehicle.vehicleDisplacement}.</p>
                <p className="pt-2 text-lg font-semibold">{Vehicle.vehicleFuelType}</p>
                <p className="pt-2 text-lg font-semibold"
                >{Vehicle.vehiclePower}<span className="cursor-pointer"
                                             onClick={converterHandler}>{uniteType}</span>
                </p>
                <p className="pt-2 text-lg font-semibold">{Vehicle.vehicleIdNumber}</p>
                <p className="pt-2 text-lg font-semibold">{Vehicle.vehiclePlateNumber}</p>
                <p className="pt-2 text-lg font-semibold">{Vehicle.vehicleDesc}</p>
            </CardContent>
            <CardFooter className="bg-zinc-300 flex justify-center items-center">
                <p className="pt-2 text-lg font-semibold">{Vehicle.vehicleMilage}km</p>
            </CardFooter>
        </Card>
    );
};

export default VehicleCard;
