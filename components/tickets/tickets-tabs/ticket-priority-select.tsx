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
import { Control } from "react-hook-form";
import { TICKET_PRIORITY_TYPES, TicketPriority } from "@/Entities/Ticket.model";

interface TicketPrioritySelectProps {
  control: Control<any>;
  name: string;
  onChange?: (priority: TicketPriority) => void;
}

export function TicketPrioritySelect({
  control,
  name,
  onChange,
}: TicketPrioritySelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Prioritet</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value: TicketPriority) => {
                field.onChange(value);
                if (onChange) {
                  onChange(value);
                }
              }}
              defaultValue={field.value}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Izaberite prioritet" />
              </SelectTrigger>
              <SelectContent>
                {TICKET_PRIORITY_TYPES.map((priority) => (
                  <SelectItem 
                    key={priority} 
                    value={priority}
                    className=""
                  >
                    {priority}
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