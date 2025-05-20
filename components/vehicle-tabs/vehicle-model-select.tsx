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
import useManufacturerModels from "@/hooks/useManufacturerModel";
import { Control } from "react-hook-form";
import { useState, useEffect } from "react";

interface VehicleModelSelectProps {
  control: Control<any>;
  name: string;
  manufacturerId: string;
  onChange?: (modelId: string, modelName: string) => void;
}

const VehicleModelSelect = ({
  control,
  name,
  manufacturerId,
  onChange,
}: VehicleModelSelectProps) => {
  const {
    manufacturerModels,
    isLoadingManufacturerModels,
    manufacturerModelsError,
  } = useManufacturerModels(manufacturerId);

  const [selectedModelName, setSelectedModelName] = useState<string>("");

  // Reset selected model when manufacturer changes
  useEffect(() => {
    setSelectedModelName("");
  }, [manufacturerId]);

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Model</FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  // Find selected model and set its name
                  const selectedModel = manufacturerModels.find(
                    (m) => m.manufacturerModelId === value,
                  );
                  if (selectedModel) {
                    setSelectedModelName(selectedModel.manufacturerModelName);
                    // Notify parent component if callback provided
                    if (onChange) {
                      onChange(value, selectedModel.manufacturerModelName);
                    }
                  }
                }}
                defaultValue={field.value}
                disabled={!manufacturerId || manufacturerId === ""}
              >
                <SelectTrigger className="w-[14rem]">
                  <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent>
                  {manufacturerModels.length > 0 ? (
                    manufacturerModels.map((model) => (
                      <SelectItem
                        key={model.manufacturerModelId}
                        value={model.manufacturerModelId!}
                      >
                        {model.manufacturerModelName}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-models" disabled>
                      {isLoadingManufacturerModels
                        ? "Loading models..."
                        : manufacturerId
                          ? "No models available"
                          : "Select a manufacturer first"}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {selectedModelName && (
        <div className="text-sm text-gray-500 mt-1">
          Selected: <span className="font-medium">{selectedModelName}</span>
        </div>
      )}
    </>
  );
};

export default VehicleModelSelect;
