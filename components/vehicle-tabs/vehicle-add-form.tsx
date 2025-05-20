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
import { Vehicle } from "@/Entities/Vehicle.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { addVehicle } from "@/firebase/firestore/vehicle-collection";

import { useState } from "react";
import ManufacturerSelect from "./manufacturer-select";
import VehicleModelSelect from "./vehicle-model-select";
import FuelTypeSelect from "./fuel-type-select";

const formSchema = z.object({
  customerId: z.string(),
  vehicleDateManufactured: z.string(),
  vehicleDisplacement: z.string(),
  vehiclePower: z.string(),
  vehicleMilage: z.string(),
  vehicleIdNumber: z.string(),
  vehiclePlateNumber: z.string(),
  vehicleDesc: z.string(),
  vehicleDateCreated: z.date(),
  vehicleManufacturer: z.string(),
  vehicleModel: z.string(),
  vehicleFuelType: z.string(),
});

const VehicleAddForm = () => {
  const [selectedManufacturerName, setSelectedManufacturerName] =
    useState<string>("");
  const [selectedManufacturerId, setSelectedManufacturerId] =
    useState<string>("");
  const [selectedModelName, setSelectedModelName] = useState<string>("");
  const [selectedFuelTypeName, setSelectedFuelTypeName] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: "",
      vehicleDateManufactured: "",
      vehicleDisplacement: "",
      vehiclePower: "",
      vehicleMilage: "",
      vehicleIdNumber: "",
      vehiclePlateNumber: "",
      vehicleDesc: "",
      vehicleDateCreated: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const vehicle: Vehicle = new Vehicle(
      values.customerId,
      values.vehicleDateManufactured,
      values.vehicleDisplacement,
      values.vehiclePower,
      values.vehicleMilage,
      values.vehicleIdNumber,
      values.vehiclePlateNumber,
      values.vehicleDesc,
      Timestamp.fromDate(values.vehicleDateCreated),
      undefined,
      values.vehicleManufacturer,
      values.vehicleModel,
      values.vehicleFuelType,
    );

    const res = await addVehicle(vehicle);

    if (typeof res == "string") {
      form.reset();
    } else if (res === false) {
      form.setError("vehicleIdNumber", {
        type: "custom",
        message: "Invalid ID number",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-full space-y-8"
      >
        {/* MANUFACTURER */}
        <ManufacturerSelect
          control={form.control}
          name="vehicleManufacturer"
          onChange={(manufacturerId, manufacturerName) => {
            setSelectedManufacturerId(manufacturerId);
            setSelectedManufacturerName(manufacturerName);
          }}
        />

        {/* MODEL */}
        <VehicleModelSelect
          control={form.control}
          name="vehicleModel"
          manufacturerId={selectedManufacturerId}
          onChange={(modelId, modelName) => {
            setSelectedModelName(modelName);
          }}
        />

        {/* FUEL TYPE */}
        <FuelTypeSelect
          control={form.control}
          name="vehicleFuelType"
          onChange={(fuelTypeId, fuelTypeName) => {
            setSelectedFuelTypeName(fuelTypeName);
          }}
        />

        {/* VEHICLE OWNER, CUSTOMER */}
        {/* <FormField
          control={form.control}
          name="customerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vlasnik</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[14rem]">
                    <SelectValue placeholder="Vlasnik" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer, i) => (
                      <SelectItem key={i} value={customer.customerId!}>
                        {`${customer.customerFirstName} ${customer.customerLastName}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* VEHICLE DATE MANUFACTURED */}
        <FormField
          control={form.control}
          name="vehicleDateManufactured"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Godiste</FormLabel>
              <FormControl>
                <Input placeholder="Godiste" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* VEHICLE DISPLACEMENT */}
        <FormField
          control={form.control}
          name="vehicleDisplacement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zapremina</FormLabel>
              <FormControl>
                <Input placeholder="Zapremina" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* VEHICLE MILAGE */}
        <FormField
          control={form.control}
          name="vehicleMilage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kilometraza</FormLabel>
              <FormControl>
                <Input placeholder="Kilometraza" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* VEHICLE ID */}
        <FormField
          control={form.control}
          name="vehicleIdNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Broj sasije</FormLabel>
              <FormControl>
                <Input placeholder="Broj sasije" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* VEHICLE PLATE NUMBER */}
        <FormField
          control={form.control}
          name="vehiclePlateNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tablice</FormLabel>
              <FormControl>
                <Input placeholder="Tablice" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* VEHICLE DESC */}
        <FormField
          control={form.control}
          name="vehicleDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis</FormLabel>
              <FormControl>
                <Input placeholder="Opis" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Dodaj</Button>
      </form>
    </Form>
  );
};

export default VehicleAddForm;
