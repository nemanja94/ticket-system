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
  TICKET_STATUS_TYPES,
  TicketStatus,
} from "@/Entities/Ticket.model";
import { addTicket } from "@/firebase/firestore/ticket-collection";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomerSelect } from "../../customers/customers-tabs/customer-select";
import { useState } from "react";
import { Input } from "../../ui/input";
import { RepairmanSelect } from "@/components/repairman/repairman-select";

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
  ticketPrice: z.string(),
  ticketPriority: z.enum(TICKET_PRIORITY_TYPES),
  ticketStatus: z.enum(TICKET_STATUS_TYPES),
});

const TicketAddForm = () => {
  const [customerId, setCustomerId] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [repairmanId, setRepairmanId] = useState<string>("");
  const [repairmanName, setRepairmanName] = useState<string>("");

  const [resetKey, setResetKey] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const checkFields = async (values: z.infer<typeof formSchema>) => {
    if (!values.ticketPriority) {
      form.setError("ticketPriority", {
        type: "custom",
        message: "Prioritet tiketa je obavezan",
      });
    }

    if (!values.ticketStatus) {
      form.setError("ticketStatus", {
        type: "custom",
        message: "Status tiketa je obavezan",
      });
    }

    if (!values.repairmanId) {
      form.setError("repairmanId", {
        type: "custom",
        message: "Majstor je obavezan",
      });
    }

    if (!values.repairmanName) {
      form.setError("repairmanName", {
        type: "custom",
        message: "Ime majstora je obavezan",
      });
    }

    if (!values.customerId) {
      form.setError("customerId", {
        type: "custom",
        message: "Vlasnik vozila je obavezan",
      });
    }

    if (!values.customerName) {
      form.setError("customerName", {
        type: "custom",
        message: "Ime vlasnika vozila je obavezan",
      });
    }

    if (!values.vehicleId) {
      form.setError("vehicleId", {
        type: "custom",
        message: "Vozilo je obavezan",
      });
    }

    if (!values.vehicleManufacturer) {
      form.setError("vehicleManufacturer", {
        type: "custom",
        message: "Proizvođač vozila je obavezan",
      });
    }

    if (!values.vehicleModel) {
      form.setError("vehicleModel", {
        type: "custom",
        message: "Model vozila je obavezan",
      });
    }

    if (!values.vehicleIdNumber) {
      form.setError("vehicleIdNumber", {
        type: "custom",
        message: "Broj šasije vozila je obavezan",
      });
    }

    if (!values.ticketTitle) {
      form.setError("ticketTitle", {
        type: "custom",
        message: "Naslov tiketa je obavezan",
      });
    }

    if (!values.ticketDesc) {
      form.setError("ticketDesc", {
        type: "custom",
        message: "Opis tiketa je obavezan",
      });
    }

    // Check if any validation errors exist
    let isValid = false;
    if (
      // Ticket
      form.formState.defaultValues?.ticketTitle !== undefined &&
      form.formState.defaultValues?.ticketDesc !== undefined &&
      form.formState.defaultValues?.ticketPriority !== undefined &&
      form.formState.defaultValues?.ticketStatus !== undefined &&
      // Repairman
      form.formState.defaultValues?.repairmanId !== undefined &&
      form.formState.defaultValues?.repairmanId !== "" &&
      form.formState.defaultValues?.repairmanName !== undefined &&
      // Customer
      form.formState.defaultValues?.customerId !== undefined &&
      form.formState.defaultValues?.customerId !== "" &&
      form.formState.defaultValues?.customerName !== undefined &&
      // Vehicle
      form.formState.defaultValues?.vehicleId !== undefined &&
      form.formState.defaultValues?.vehicleId !== "" &&
      form.formState.defaultValues?.vehicleManufacturer !== undefined &&
      form.formState.defaultValues?.vehicleModel !== undefined &&
      form.formState.defaultValues?.vehicleIdNumber !== undefined
    )
      isValid = true;

    return isValid;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await checkFields(values);

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
      values.ticketPrice,
      values.ticketPriority,
      TicketStatus.Otvoren, // Default status when adding a new ticket
      Timestamp.now().toDate().toISOString(), // Current date as string
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

          {/* REPAIRMAN */}
          <RepairmanSelect
            control={form.control}
            name="repairmanId"
            onChange={(repairmanId, repairmanName) => {
              setRepairmanId(repairmanId);
              setRepairmanName(repairmanName);
            }}
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
