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
import useManufacturers from "@/hooks/useManufacturers";
import { Control } from "react-hook-form";

interface ManufacturerSelectProps {
  control: Control<any>;
  name: string;
  onChange?: (manufacturerId: string, manufacturerName: string) => void;
}

const ManufacturerSelect = ({
  control,
  name,
  onChange,
}: ManufacturerSelectProps) => {
  const { manufacturers } = useManufacturers();

  return (
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
                const selectedManufacturer = manufacturers.find(
                  (m) => m.manufacturerId === value,
                );
                if (selectedManufacturer && onChange) {
                  onChange(value, selectedManufacturer.manufacturerName);
                }
              }}
              defaultValue={field.value}
            >
              <SelectTrigger className="w-full">
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
  );
};

export default ManufacturerSelect;
