"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Ticket,
  TicketPriority,
  TICKET_PRIORITY_TYPES,
  TicketStatus,
  TICKET_STATUS_TYPES,
} from "@/Entities/Ticket.model";
import { SearchParams, searchTicket } from "@/firebase/firestore/ticket-collection";
import TicketCard from "../ticket-card/ticket-card.component";
import { RepairmanSelect } from "@/components/repairman/repairman-select";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  ticketPriority: z.enum(TICKET_PRIORITY_TYPES).optional(),
  ticketStatus: z.enum(TICKET_STATUS_TYPES).optional(),
  repairmanId: z.string().optional(),
  repairmanName: z.string().optional(),
  vehicleIdNumber: z.string().optional(),
});

const TicketSearchForm = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleIdNumber: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const fetchTickets = async () => {
      try {
        return await searchTicket({
          ticketPriority: values.ticketPriority,
          ticketStatus: values.ticketStatus,
          repairmanId: values.repairmanId,
          repairmanName: values.repairmanName,
          vehicleIdNumber: values.vehicleIdNumber
        } as SearchParams);
      } catch (err) {
        console.log(err);
        return { tickets: [], last: undefined };
      }
    };

    fetchTickets().then((res) => {
      res.tickets.length > 0 ? setTickets(res.tickets) : setTickets([]);
    });
  };

  return (
    <div className="w-[98%] max-w-6xl mx-auto space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 rounded-lg bg-zinc-500"
        >
          {/* Vehicle ID Number */}
          <FormField
            control={form.control}
            name="vehicleIdNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Broj sasije</FormLabel>
                <FormControl>
                  <Input placeholder="Pretraži po broju sasije..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          {/* Ticket Status */}
          <FormField
            control={form.control}
            name="ticketStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status tiketa</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Izaberite status tiketa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={TicketStatus.Otvoren}>
                        {TicketStatus.Otvoren}
                      </SelectItem>
                      <SelectItem value={TicketStatus.UProcesu}>
                        {TicketStatus.UProcesu}
                      </SelectItem>
                      <SelectItem value={TicketStatus.Zatvoren}>
                        {TicketStatus.Zatvoren}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Repairman */}
          <RepairmanSelect
            control={form.control}
            name="repairmanId"
            onChange={() => {}}
          />

          <div className="col-span-full flex justify-end">
            <Button
              type="submit"
              className="w-full sm:w-auto min-w-[150px]"
              size="lg"
            >
              Pretraži
            </Button>
          </div>
        </form>
      </Form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-[98%] justify-center items-center mx-auto">
        {tickets && tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketCard key={ticket.ticketId} ticket={ticket} />
          ))
        ) : (
          <div className="col-span-full text-center text-zinc-200">
            Nema rezultata za zadatu pretragu.
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketSearchForm;
