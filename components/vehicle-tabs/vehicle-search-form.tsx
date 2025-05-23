"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import ManufacturerSelect from "./manufacturer-select";
import VehicleModelSelect from "./vehicle-model-select";
import FuelTypeSelect from "./fuel-type-select";
import { CustomerSelect } from "../customer-select/customer-select";
import { Vehicle } from "@/Entities/Vehicle.model";
import { searchVehicle } from "@/firebase/firestore/vehicle-collection";
import VehicleCard from "../vehicle-card/vehicle-card.component";

const formSchema = z.object({
  customerId: z.string().optional(),
  vehicleDateManufactured: z.string().optional(),
  vehicleDisplacement: z.string().optional(),
  vehiclePower: z.string().optional(),
  vehicleMilage: z.string().optional(),
  vehicleIdNumber: z.string().optional(),
  vehiclePlateNumber: z.string().optional(),
  vehicleDesc: z.string().optional(),
  vehicleDateCreated: z.date().optional(),
  vehicleManufacturer: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleFuelType: z.string().optional(),
});

const VehicleSearchForm = () => {
  const [selectedManufacturerId, setSelectedManufacturerId] =
    useState<string>("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

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
      vehicleManufacturer: "",
      vehicleModel: "",
      vehicleFuelType: "",
    },
  });

  useEffect(() => {
    setVehicles([]);
  }, []);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const fetchVehicles = async () => {
      try {
        return await searchVehicle(
          values.customerId,
          values.vehicleIdNumber,
          values.vehiclePlateNumber,
          values.vehicleManufacturer,
          values.vehicleModel,
          values.vehicleFuelType,
          values.vehicleDateManufactured,
        );
      } catch (err) {
        console.log(err);
        return { vehicles: [], last: undefined };
      }
    };

    fetchVehicles().then((res) => {
      // console.log(res)
      res.vehicles.length > 0 ? setVehicles(res.vehicles) : setVehicles([]);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-center items-start"
        >
          {/* MANUFACTURER */}
          <ManufacturerSelect
            control={form.control}
            name="vehicleManufacturer"
            onChange={(manufacturerId) => {
              setSelectedManufacturerId(manufacturerId);
            }}
          />

          {/* MODEL */}
          <VehicleModelSelect
            control={form.control}
            name="vehicleModel"
            manufacturerId={selectedManufacturerId}
            onChange={() => {}}
          />

          {/* FUEL TYPE */}
          <FuelTypeSelect
            control={form.control}
            name="vehicleFuelType"
            onChange={() => {}}
          />

          {/* VEHICLE OWNER, CUSTOMER */}
          <CustomerSelect
            control={form.control}
            name="customerId"
            onChange={() => {}}
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

          <div className="md:col-span-2 lg:col-span-3 flex justify-end">
            <Button type="submit">Pretrazi</Button>
          </div>
        </form>
      </Form>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-5 w-[95%] gap-3">
        {vehicles &&
          vehicles.map((vehicle, i) => {
            return <VehicleCard key={i} vehicle={vehicle} />;
          })}
      </div>
    </div>
  );
};

export default VehicleSearchForm;
