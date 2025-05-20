"use client";

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
import useFuelTypes from "@/hooks/useFuelTypes";
import { Control } from "react-hook-form";
import { useState } from "react";

interface FuelTypeSelectProps {
  control: Control<any>;
  name: string;
  onChange?: (fuelTypeId: string, fuelTypeName: string) => void;
}

const FuelTypeSelect = ({ control, name, onChange }: FuelTypeSelectProps) => {
  const { fuelTypes, isLoadingFuelTypes, fuelTypesError } = useFuelTypes();
  const [selectedFuelTypeName, setSelectedFuelTypeName] = useState<string>("");

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gorivo</FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  // Find selected fuel type and set its name
                  const selectedFuelType = fuelTypes.find(
                    (ft) => ft.fuelTypeId === value,
                  );
                  if (selectedFuelType) {
                    setSelectedFuelTypeName(selectedFuelType.fuelTypeName);
                    // Notify parent component if callback provided
                    if (onChange) {
                      onChange(value, selectedFuelType.fuelTypeName);
                    }
                  }
                }}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-[14rem]">
                  <SelectValue placeholder="Gorivo" />
                </SelectTrigger>
                <SelectContent>
                  {fuelTypes.length > 0 ? (
                    fuelTypes.map((fuelType) => (
                      <SelectItem
                        key={fuelType.fuelTypeId}
                        value={fuelType.fuelTypeId!}
                      >
                        {fuelType.fuelTypeName}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-fuel-types" disabled>
                      {isLoadingFuelTypes
                        ? "Loading..."
                        : "No fuel types available"}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FuelTypeSelect;
