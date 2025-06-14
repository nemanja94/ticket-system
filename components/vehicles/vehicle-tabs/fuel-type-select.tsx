"use client";

// External imports
import { Control } from "react-hook-form";

// UI Components
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

export enum FuelType {
  Plin = "Plin",
  Benzin = "Benzin",
  Dizel = "Dizel",
}

interface FuelTypeSelectProps {
  control: Control<any>;
  name: string;
  onChange?: (value: FuelType) => void;
}

const FuelTypeSelect = ({ control, name, onChange }: FuelTypeSelectProps) => (
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
              onChange?.(value as FuelType);
            }}
            value={field.value}
          >
            <SelectTrigger>
              <SelectValue placeholder="Izaberite tip goriva" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(FuelType).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
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

export default FuelTypeSelect;
