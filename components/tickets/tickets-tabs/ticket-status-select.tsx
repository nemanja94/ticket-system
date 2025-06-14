"use client";

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
import { TICKET_STATUS_TYPES, TicketStatus } from "@/Entities/Ticket.model";

interface TicketStatusSelectProps {
  control: Control<any>;
  name: string;
  onChange?: (status: TicketStatus) => void;
}

export function TicketStatusSelect({
  control,
  name,
  onChange,
}: TicketStatusSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Status</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value: TicketStatus) => {
                field.onChange(value);
                if (onChange) {
                  onChange(value);
                }
              }}
              defaultValue={field.value}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Izaberite status" />
              </SelectTrigger>
              <SelectContent>
                {TICKET_STATUS_TYPES.map((status) => (
                  <SelectItem
                    key={status}
                    value={status}
                    className=""
                  >
                    {status}
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
}