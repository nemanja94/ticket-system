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
import { CustomerSelect } from "../customer-select/customer-select";

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
    if (!values.vehicleDisplacement)
      form.setError("vehicleDisplacement", {
        type: "custom",
        message: "Vehicle displacement is required",
      });
    if (!values.vehiclePower)
      form.setError("vehiclePower", {
        type: "custom",
        message: "Vehicle power is required",
      });
    if (!values.vehicleMilage)
      form.setError("vehicleMilage", {
        type: "custom",
        message: "Vehicle milage is required",
      });
    if (!values.vehicleIdNumber)
      form.setError("vehicleIdNumber", {
        type: "custom",
        message: "Vehicle ID number is required",
      });
    if (!values.vehiclePlateNumber)
      form.setError("vehiclePlateNumber", {
        type: "custom",
        message: "Vehicle plate number is required",
      });
    if (!values.vehicleDesc)
      form.setError("vehicleDesc", {
        type: "custom",
        message: "Vehicle description is required",
      });
    if (!values.vehicleManufacturer)
      form.setError("vehicleManufacturer", {
        type: "custom",
        message: "Vehicle manufacturer is required",
      });
    if (!values.vehicleModel)
      form.setError("vehicleModel", {
        type: "custom",
        message: "Vehicle model is required",
      });
    if (!values.vehicleFuelType)
      form.setError("vehicleFuelType", {
        type: "custom",
        message: "Vehicle fuel type is required",
      });

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
      setSelectedManufacturerName("");
      setSelectedManufacturerId("");
      setSelectedModelName("");
      setSelectedFuelTypeName("");
    } else if (res === false) {
      form.setError("vehicleIdNumber", {
        type: "custom",
        message: "Vozilo se nalazi u bazi",
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
        <CustomerSelect
          control={form.control}
          name="customerId"
          onChange={(customerId, customerName) => {
            setSelectedFuelTypeName(customerName);
          }}
        />

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
