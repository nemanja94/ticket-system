"use client";

import { Repairman } from "@/Entities/Reapirman.model";
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
import useRepairman from "@/hooks/useRepairman";
import { useState } from "react";
import { Control } from "react-hook-form";

interface RepairmanSelectProps {
  control: Control<any>;
  name: string;
  onChange?: (fuelTypeId: string, fuelTypeName: string) => void;
}

export function RepairmanSelect({
  control,
  name,
  onChange,
}: RepairmanSelectProps) {
  const { repairmans, isLoadingRepairmans, repairmansError } = useRepairman();
  const [selectedRepairman, setSelectedRepairman] = useState<Repairman>(
    {} as Repairman
  );

  console.log("RepairmanSelect - repairmans", repairmans);
  console.log("RepairmanSelect - isLoadingRepairmans", isLoadingRepairmans);
  console.log("RepairmanSelect - repairmansError", repairmansError);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Majstori</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                // Find selected repairman and set its name
                const foundRepairman = repairmans.find(
                  (r) => r.repairmanId === value
                );
                if (foundRepairman) {
                  setSelectedRepairman(foundRepairman);
                  // Notify parent component if callback provided
                  if (onChange) {
                    onChange(
                      value,
                      foundRepairman.repairmanPosition +
                        " " +
                        foundRepairman.repairmanName
                    );
                  }
                }
              }}
              defaultValue={field.value}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Majstori" />
              </SelectTrigger>
              <SelectContent>
                {repairmans && repairmans.length > 0 ? (
                  repairmans.map((repairman, i) => (
                    <SelectItem key={i} value={repairman.repairmanId!}>
                      {repairman.repairmanPosition +
                        " " +
                        repairman.repairmanName}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-fuel-types" disabled>
                    {isLoadingRepairmans
                      ? "Loading..."
                      : "No repairmans available"}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
