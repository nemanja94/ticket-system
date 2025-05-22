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
  const [selectedManufacturerId, setSelectedManufacturerId] =
    useState<string>("");
    useState<string>("");
  const [resetKey, setResetKey] = useState<number>(0);

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
    if (
      !values.customerId ||
      values.customerId === "" ||
      !values.vehicleIdNumber ||
      values.vehicleIdNumber === "" ||
      !values.vehiclePlateNumber ||
      values.vehiclePlateNumber === "" ||
      !values.vehicleManufacturer ||
      values.vehicleManufacturer === "" ||
      !values.vehicleModel ||
      values.vehicleModel === "" ||
      !values.vehicleFuelType ||
      values.vehicleFuelType === ""
    ) {
      await checkFields(values);
      return false;
    }

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
      setSelectedManufacturerId("");
      form.reset();
      setResetKey(prev => prev + 1);
    } else if (res === false) {
      form.setError("vehicleIdNumber", {
        type: "custom",
        message: "Vozilo se nalazi u bazi",
      });
    }
  };

  /**
   * Validates the form fields and sets appropriate error messages
   * @param values - The form values to check
   * @returns boolean indicating whether all fields are valid
   */
  const checkFields = async (
    values: z.infer<typeof formSchema>,
  ): Promise<boolean> => {
    if (!values.customerId || values.customerId === "") {
      form.setError("customerId", {
        type: "custom",
        message: "Musterija je obavezna",
      });
    }

    if (
      !values.vehicleDateManufactured ||
      values.vehicleDateManufactured === ""
    ) {
      form.setError("vehicleDateManufactured", {
        type: "custom",
        message: "Godina proizvodnje je obavezna",
      });
    }

    if (!values.vehicleDisplacement || values.vehicleDisplacement === "") {
      form.setError("vehicleDisplacement", {
        type: "custom",
        message: "Zapremina motora je obavezna",
      });
    }

    if (!values.vehiclePower || values.vehiclePower === "") {
      form.setError("vehiclePower", {
        type: "custom",
        message: "Snaga motora je obavezna",
      });
    }

    if (!values.vehicleMilage || values.vehicleMilage === "") {
      form.setError("vehicleMilage", {
        type: "custom",
        message: "Kilometraža je obavezna",
      });
    }

    if (!values.vehicleIdNumber || values.vehicleIdNumber === "") {
      form.setError("vehicleIdNumber", {
        type: "custom",
        message: "Broj sasije je obavezan",
      });
    }

    if (!values.vehiclePlateNumber || values.vehiclePlateNumber === "") {
      form.setError("vehiclePlateNumber", {
        type: "custom",
        message: "Broj registracije je obavezan",
      });
    }

    if (!values.vehicleManufacturer || values.vehicleManufacturer === "") {
      form.setError("vehicleManufacturer", {
        type: "custom",
        message: "Proizvođač je obavezan",
      });
    }

    if (!values.vehicleModel || values.vehicleModel === "") {
      form.setError("vehicleModel", {
        type: "custom",
        message: "Model je obavezan",
      });
    }

    if (!values.vehicleFuelType || values.vehicleFuelType === "") {
      form.setError("vehicleFuelType", {
        type: "custom",
        message: "Tip goriva je obavezan",
      });
    }

    // Check if any validation errors exist
    let isValid = false;
    if (
      form.formState.defaultValues?.customerId !== undefined &&
      form.formState.defaultValues?.customerId !== "" &&
      form.formState.defaultValues?.vehicleDateManufactured !== undefined &&
      form.formState.defaultValues?.vehicleDateManufactured !== "" &&
      form.formState.defaultValues?.vehicleDisplacement !== undefined &&
      form.formState.defaultValues?.vehicleDisplacement !== "" &&
      form.formState.defaultValues?.vehicleFuelType !== undefined &&
      form.formState.defaultValues?.vehicleFuelType !== "" &&
      form.formState.defaultValues?.vehicleMilage !== undefined &&
      form.formState.defaultValues?.vehicleMilage !== "" &&
      form.formState.defaultValues?.vehicleIdNumber !== undefined &&
      form.formState.defaultValues?.vehicleIdNumber !== "" &&
      form.formState.defaultValues?.vehicleManufacturer !== undefined &&
      form.formState.defaultValues?.vehicleManufacturer !== "" &&
      form.formState.defaultValues?.vehicleModel !== undefined &&
      form.formState.defaultValues?.vehicleModel !== "" &&
      form.formState.defaultValues?.vehiclePlateNumber !== undefined &&
      form.formState.defaultValues?.vehiclePlateNumber !== "" &&
      form.formState.defaultValues?.vehiclePower !== undefined &&
      form.formState.defaultValues?.vehiclePower !== ""
    )
      isValid = true;

    return isValid;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto"
      >
        {/* MANUFACTURER */}
        <ManufacturerSelect
          key={`manufacturer-${resetKey}`}
          control={form.control}
          name="vehicleManufacturer"
          onChange={(manufacturerId, manufacturerName) => {
            setSelectedManufacturerId(manufacturerId);
          }}
        />

        {/* MODEL */}
        <VehicleModelSelect
          key={`model-${resetKey}`}
          control={form.control}
          name="vehicleModel"
          manufacturerId={selectedManufacturerId}
        />

        {/* FUEL TYPE */}
        <FuelTypeSelect
          key={`fuel-${resetKey}`}
          control={form.control}
          name="vehicleFuelType"
          onChange={() => {
            // No need to track fuel type name if not used
          }}
        />

        {/* VEHICLE OWNER, CUSTOMER */}
        <CustomerSelect
          key={`customer-${resetKey}`}
          control={form.control}
          name="customerId"
          onChange={() => {
            // No need to track customer name if not used
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

        {/* VEHICLE POWER */}
        <FormField
          control={form.control}
          name="vehiclePower"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Snaga</FormLabel>
              <FormControl>
                <Input placeholder="Snaga" {...field} />
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

        {/* Dugme za submit zauzima celu širinu grida na većim ekranima */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end pt-2">
          <Button type="submit" className="w-full sm:w-auto">
            Dodaj
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VehicleAddForm;
