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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Ticket } from "@/Entities/Ticket.model";
import { searchTicket } from "@/firebase/firestore/ticket-collection";

const formSchema = z.object({});

const TicketSearchForm = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // TODO implement default values
    },
  });

  useEffect(() => {
    setTickets([]);
  }, [setTickets]);
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const fetchTickets = async () => {
      try {
        return await searchTicket();
        // TODO implement searchTicket function
      } catch (err) {
        console.log(err);
        return { tickets: [] };
      }
    };

    fetchTickets().then((res) => {
      res.tickets.length > 0 ? setTickets(res.tickets) : setTickets([]);
    });
  };
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 rounded-lg bg-zinc-500"
        >
          {/* TODO implementirati polja za pretragu tiketa pouzoru na kod ispod*/}
          {/* <FormField
            control={form.control}
            name="customerFirstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ime</FormLabel>
                <FormControl>
                  <Input placeholder="Pretraži po imenu..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tickets.map((ticket) => (
          // TODO implement TicketCard component
          // <TicketCard key={ticket.ticketId} ticket={ticket} />
          <></>
        ))}
      </div>
    </div>
  );
};

export default TicketSearchForm;
