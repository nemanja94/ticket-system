"use client";

import { useEffect, useState } from "react";
import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Vehicle } from "@/Entities/Vehicle.model";
import { searchVehicle } from "@/firebase/firestore/vehicle-collection";

interface CustomerVehicleSelectProps {
  control: Control<any>;
  name: string;
  customerId: string;
  onChange?: (
    vehicleId: string,
    vehicleInfo: {
      manufacturer: string;
      model: string;
      idNumber: string;
    }
  ) => void;
}

export function CustomerVehicleSelect({
  control,
  name,
  customerId,
  onChange,
}: CustomerVehicleSelectProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVehicles = async () => {
      if (!customerId) {
        setVehicles([]);
        return;
      }

      setIsLoading(true);
      try {
        const result = await searchVehicle(customerId);
        setVehicles(result.vehicles);
        setError(null);
      } catch (err) {
        setError("Greška pri učitavanju vozila");
        setVehicles([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadVehicles();
  }, [customerId]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Vozilo</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                const vehicle = vehicles.find((v) => v.vehicleId === value);
                if (vehicle && onChange) {
                  onChange(value, {
                    manufacturer: vehicle.vehicleManufacturer ?? "",
                    model: vehicle.vehicleModel ?? "",
                    idNumber: vehicle.vehicleIdNumber ?? "",
                  });
                }
              }}
              defaultValue={field.value}
              disabled={isLoading || !customerId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Izaberite vozilo" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <SelectItem
                      key={vehicle.vehicleId}
                      value={vehicle.vehicleId ?? ""}
                    >
                      {`${vehicle.vehicleManufacturer} ${vehicle.vehicleModel} - ${vehicle.vehicleIdNumber}`}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-vehicles" disabled>
                    {isLoading ? "Učitavanje..." : "Nema dostupnih vozila"}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </FormControl>
          {error && <FormMessage>{error}</FormMessage>}
        </FormItem>
      )}
    />
  );
}
