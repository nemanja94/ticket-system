"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Ticket,
  TicketPriority,
  TICKET_PRIORITY_TYPES,
  TicketStatus,
} from "@/Entities/Ticket.model";
import { addTicket } from "@/firebase/firestore/ticket-collection";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomerSelect } from "../customer-select/customer-select";
import { useState } from "react";
import { Input } from "../ui/input";

const formSchema = z.object({
  ticketPriority: z.enum(TICKET_PRIORITY_TYPES),
  customerId: z.string(),
  customerName: z.string(),
  TicketTitle: z.string(),
  ticketDesc: z.string(),
  ticketPrice: z.number(),
  ticketDateCreated: z.date(),
});

const TicketAddForm = () => {
  const [customerId, setCustomerId] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [resetKey, setResetKey] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.ticketPriority)
      form.setError("ticketPriority", {
        type: "custom",
        message: "Prioritet tiketa je obavezan",
      });

    const ticket: Ticket = new Ticket(
      "",
      values.customerId,
      customerName.split(" ")[0] || "",
      customerName.split(" ")[1] || "",
      "", // vehicleId is not used in this form
      values.TicketTitle,
      values.ticketDesc,
      values.ticketPrice,
      values.ticketPriority,
      TicketStatus.Otvoren, // Default status when adding a new ticket
      Timestamp.now(),
      undefined, // ticketDateUpdated
      undefined // ticketDateDeleted
    );
    const res = await addTicket(ticket);

    console.log("Ticket added:", res);

    if (typeof res == "string") {
      form.reset();
    }
  };

  return (
    <div className="w-[98%] max-w-6xl mx-auto space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 rounded-lg bg-zinc-500"
        >
          {/* Ticket Priority */}
          <FormField
            control={form.control}
            name="ticketPriority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prioritet tiketa</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Izaberite prioritet tiketa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={TicketPriority.NizakPrioritet}>
                        {TicketPriority.NizakPrioritet}
                      </SelectItem>
                      <SelectItem value={TicketPriority.SrednjiPrioritet}>
                        {TicketPriority.SrednjiPrioritet}
                      </SelectItem>
                      <SelectItem value={TicketPriority.VisokPrioritet}>
                        {TicketPriority.VisokPrioritet}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* VEHICLE OWNER, CUSTOMER */}
          {/* <CustomerSelect
            key={`customer-${resetKey}`}
            control={form.control}
            name="customerId"
            onChange={(customerId, customerName) => {
              setCustomerId(customerId);
              setCustomerName(customerName);
            }}
          /> */}

          <div className="col-span-full flex justify-end mt-6">
            <Button type="submit" className="w-full sm:w-auto">
              Dodaj tiket
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TicketAddForm;
