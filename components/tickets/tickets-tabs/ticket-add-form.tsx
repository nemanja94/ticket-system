"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Timestamp } from "firebase/firestore";

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
import { CustomerSelect } from "@/components/customers/customers-tabs/customer-select";
import { CustomerVehicleSelect } from "@/components/customers/customers-tabs/customer-vehicle-select";
import { RepairmanSelect } from "@/components/repairman/repairman-select";
import { TicketPrioritySelect } from "./ticket-priority-select";
import { TicketStatusSelect } from "./ticket-status-select";

import {
  Ticket,
  TICKET_PRIORITY_TYPES,
  TICKET_STATUS_TYPES,
  TicketStatus,
} from "@/Entities/Ticket.model";
import { addTicket } from "@/firebase/firestore/ticket-collection";

const formSchema = z.object({
  repairmanId: z.string(),
  repairmanName: z.string(),
  customerId: z.string(),
  customerName: z.string(),
  customerPhoneNumber: z.string(),
  vehicleId: z.string(),
  vehicleManufacturer: z.string(),
  vehicleModel: z.string(),
  vehicleIdNumber: z.string(),
  ticketTitle: z.string(),
  ticketDesc: z.string(),
  ticketNote: z.string(),
  ticketPrice: z.string(),
  ticketPriority: z.enum(TICKET_PRIORITY_TYPES),
  ticketStatus: z.enum(TICKET_STATUS_TYPES),
});

// Reusable style constants
const formContainerStyle = "w-[98%] max-w-6xl mx-auto space-y-6";
const formStyle =
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 rounded-lg bg-zinc-500";
const textareaStyle =
  "min-h-[96px] resize-none bg-white/90 focus:bg-white transition-colors duration-200";
const inputStyle = "bg-white/90 focus:bg-white transition-colors duration-200";
const buttonStyle =
  "w-full sm:w-auto bg-zinc-700 hover:bg-zinc-600 transition-colors duration-200";

const TicketAddForm = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [resetKey, setResetKey] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      repairmanId: "",
      repairmanName: "",
      customerId: "",
      customerName: "",
      customerPhoneNumber: "",
      vehicleId: "",
      vehicleManufacturer: "",
      vehicleModel: "",
      vehicleIdNumber: "",
      ticketTitle: "",
      ticketDesc: "",
      ticketNote: "",
      ticketPrice: "",
      ticketPriority: TICKET_PRIORITY_TYPES[0],
      ticketStatus: TICKET_STATUS_TYPES[0],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const ticket: Ticket = new Ticket(
      "",
      values.repairmanId,
      values.repairmanName,
      values.customerId,
      values.customerName,
      values.customerPhoneNumber,
      values.vehicleId,
      values.vehicleManufacturer,
      values.vehicleModel,
      values.vehicleIdNumber,
      values.ticketTitle,
      values.ticketDesc,
      values.ticketNote,
      values.ticketPrice,
      values.ticketPriority,
      values.ticketStatus,
      Timestamp.now().toDate().toISOString(),
      undefined,
      undefined
    );

    const res = await addTicket(ticket);

    if (typeof res.success) {
      form.reset();
      setResetKey((prev) => prev + 1);
    }
  };

  const renderFormField = (
    name: keyof z.infer<typeof formSchema>,
    label: string,
    placeholder: string,
    type: string = "text",
    isTextarea: boolean = false
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-zinc-100 font-medium">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              className={isTextarea ? textareaStyle : inputStyle}
              {...field}
            />
          </FormControl>
          <FormMessage className="text-red-200" />
        </FormItem>
      )}
    />
  );

  return (
    <div className={formContainerStyle}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={formStyle}>
          <CustomerSelect
            key={`customer-${resetKey}`}
            control={form.control}
            name="customerId"
            onChange={(customerId, customerName, customerPhoneNumber) => {
              setSelectedCustomerId(customerId);
              form.setValue("customerName", customerName);
              form.setValue("customerPhoneNumber", customerPhoneNumber);
            }}
          />

          <CustomerVehicleSelect
            key={`vehicle-${resetKey}`}
            control={form.control}
            name="vehicleId"
            customerId={selectedCustomerId}
            onChange={(vehicleId, vehicleInfo) => {
              form.setValue("vehicleManufacturer", vehicleInfo.manufacturer);
              form.setValue("vehicleModel", vehicleInfo.model);
              form.setValue("vehicleIdNumber", vehicleInfo.idNumber);
              form.setValue("vehicleId", vehicleId);
            }}
          />

          <RepairmanSelect
            key={`repairman-${resetKey}`}
            control={form.control}
            name="repairmanId"
            onChange={(repairmanId, repairmanName) => {
              form.setValue("repairmanName", repairmanName);
              form.setValue("repairmanId", repairmanId);
            }}
          />

          {renderFormField("ticketTitle", "Naslov tiketa", "Naslov tiketa...")}
          {renderFormField(
            "ticketDesc",
            "Opis tiketa",
            "Opis tiketa...",
            "text",
            true
          )}
          {renderFormField(
            "ticketNote",
            "Napomena tiketa",
            "Napomena tiketa...",
            "text",
            true
          )}
          {renderFormField(
            "ticketPrice",
            "Cijena tiketa",
            "Cena tiketa...",
            "number"
          )}

          <TicketPrioritySelect control={form.control} name="ticketPriority" />

          <TicketStatusSelect control={form.control} name="ticketStatus" />

          <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end pt-4">
            <Button type="submit" className={buttonStyle}>
              Dodaj ticket
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TicketAddForm;
