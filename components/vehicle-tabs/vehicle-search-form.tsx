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
import { ChevronDown, ChevronUp } from "lucide-react";

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
  const [isExpanded, setIsExpanded] = useState(false);

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
          values.vehicleDisplacement
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
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 rounded-lg bg-zinc-500"
        >
          {/* Always visible fields */}
          <ManufacturerSelect
            control={form.control}
            name="vehicleManufacturer"
            onChange={(manufacturerId) => {
              setSelectedManufacturerId(manufacturerId);
            }}
          />

          <VehicleModelSelect
            control={form.control}
            name="vehicleModel"
            manufacturerId={selectedManufacturerId}
          />

          <CustomerSelect control={form.control} name="customerId" />

          {/* Hidden fields - using CSS but keeping functionality */}
          <div
            className={`grid gap-6 col-span-full ${
              isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            } transition-all duration-300`}
          >
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* FUEL TYPE */}
                <FuelTypeSelect control={form.control} name="vehicleFuelType" />

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
              </div>
            </div>
          </div>

          {/* Control buttons - Always visible */}
          <div className="md:col-span-2 lg:col-span-3 flex justify-between items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" /> Manje opcija
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" /> Više opcija
                </>
              )}
            </Button>
            <Button type="submit">Pretraži</Button>
          </div>
        </form>
      </Form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {vehicles &&
          vehicles.map((vehicle, i) => {
            return <VehicleCard key={i} vehicle={vehicle} />;
          })}
      </div>
    </div>
  );
};

export default VehicleSearchForm;
