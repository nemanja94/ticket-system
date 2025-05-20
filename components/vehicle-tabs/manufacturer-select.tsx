"use client";

import { 
  FormControl, 
  FormField, 
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useManufacturers from "@/hooks/useManufacturers";
import { Control } from "react-hook-form";
import { useState } from "react";

interface ManufacturerSelectProps {
  control: Control<any>;
  name: string;
  onChange?: (manufacturerId: string, manufacturerName: string) => void;
}

const ManufacturerSelect = ({ 
  control, 
  name, 
  onChange 
}: ManufacturerSelectProps) => {
  const { manufacturers, isLoadingManufacturers, manufacturersError } = useManufacturers();
  const [selectedManufacturerName, setSelectedManufacturerName] = useState<string>("");

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Proizvodjac</FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  // Find selected manufacturer and set its name
                  const selectedManufacturer = manufacturers.find(m => m.manufacturerId === value);
                  if (selectedManufacturer) {
                    setSelectedManufacturerName(selectedManufacturer.manufacturerName);
                    // Notify parent component if callback provided
                    if (onChange) {
                      onChange(value, selectedManufacturer.manufacturerName);
                    }
                  }
                }}
                defaultValue={field.value}
              >
                <SelectTrigger className="w-[14rem]">
                  <SelectValue placeholder="Proizvodjac" />
                </SelectTrigger>
                <SelectContent>
                  {manufacturers.map((manufacturer) => (
                    <SelectItem
                      key={manufacturer.manufacturerId}
                      value={manufacturer.manufacturerId!}
                    >
                      {manufacturer.manufacturerName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {selectedManufacturerName && (
        <div className="text-sm text-gray-500 mt-1">
          Selected: <span className="font-medium">{selectedManufacturerName}</span>
        </div>
      )}
    </>
  );
};

export default ManufacturerSelect;