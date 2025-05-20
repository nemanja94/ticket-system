"use client";

import { Customer } from "@/Entities/Customer.model";
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
import useCustomers from "@/hooks/useCustomers";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Control } from "react-hook-form";

interface CustomerSelectProps {
  control: Control<any>;
  name: string;
  onChange?: (fuelTypeId: string, fuelTypeName: string) => void;
}

export function CustomerSelect({
  control,
  name,
  onChange,
}: CustomerSelectProps) {
  const { customers, isLoadingCustomers, customersError } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(
    {} as Customer,
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Musterije</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                // Find selected custoemr  and set its name
                const selectedFuelType = customers.find(
                  (sc) => sc.customerId === value,
                );
                if (selectedCustomer) {
                  setSelectedCustomer(selectedCustomer);
                  // Notify parent component if callback provided
                  if (onChange) {
                    onChange(
                      value,
                      selectedCustomer.customerFirstName +
                        " " +
                        selectedCustomer.customerLastName +
                        " " +
                        selectedCustomer.customerNumber,
                    );
                  }
                }
              }}
              defaultValue={field.value}
            >
              <SelectTrigger className="w-[14rem]">
                <SelectValue placeholder="Musterije" />
              </SelectTrigger>
              <SelectContent>
                {customers.length > 0 ? (
                  customers.map((customer) => (
                    <SelectItem
                      key={customer.customerId}
                      value={customer.customerId!}
                    >
                      {customer.customerFirstName +
                        " " +
                        customer.customerLastName +
                        " " +
                        customer.customerNumber}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-fuel-types" disabled>
                    {isLoadingCustomers
                      ? "Loading..."
                      : "No customers available"}
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
