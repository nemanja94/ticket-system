// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   FuelType,
//   Vehicle,
//   VehicleManufacturer,
//   VehicleModel,
// } from "@/Entities/Vehicle.model";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Timestamp } from "firebase/firestore";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Input } from "../ui/input";
// import { addVehicle } from "@/firebase/firestore/vehicle-collection copy";

// const formSchema = z.object({
//   customerId: z.string(),
//   vehicleDateManufactured: z.string(),
//   vehicleDisplacement: z.string(),
//   vehiclePower: z.string(),
//   vehicleMilage: z.string(),
//   vehicleIdNumber: z.string(),
//   vehiclePlateNumber: z.string(),
//   vehicleDesc: z.string(),
//   vehicleDateCreated: z.date(),
//   vehicleManufacturer: z.nativeEnum(VehicleManufacturer).optional(),
//   vehicleModel: z.nativeEnum(VehicleModel).optional(),
//   vehicleFuelType: z.nativeEnum(FuelType).optional(),
// });

// const VehicleAddForm = () => {
//   const { customers, isLocadingCustomers, customersError } = useCustomers();
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       customerId: "",
//       vehicleDateManufactured: "",
//       vehicleDisplacement: "",
//       vehiclePower: "",
//       vehicleMilage: "",
//       vehicleIdNumber: "",
//       vehiclePlateNumber: "",
//       vehicleDesc: "",
//       vehicleDateCreated: new Date(),
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     const vehicle: Vehicle = new Vehicle(
//       values.customerId,
//       values.vehicleDateManufactured,
//       values.vehicleDisplacement,
//       values.vehiclePower,
//       values.vehicleMilage,
//       values.vehicleIdNumber,
//       values.vehiclePlateNumber,
//       values.vehicleDesc,
//       Timestamp.fromDate(values.vehicleDateCreated),
//       undefined,
//       values.vehicleManufacturer,
//       values.vehicleModel,
//       values.vehicleFuelType,
//     );

//     const res = await addVehicle(vehicle);
//     console.log(res);
//   };
//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex flex-col justify-center items-center w-full space-y-8"
//       >
//         {/* MANUFACTURER */}
//         <FormField
//           control={form.control}
//           name="vehicleManufacturer"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Proizvodjac</FormLabel>
//               <FormControl>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <SelectTrigger className="w-[14rem]">
//                     <SelectValue placeholder="Proizvodjac" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {Object.values(VehicleManufacturer).map((manufacturer) => (
//                       <SelectItem key={manufacturer} value={manufacturer}>
//                         {manufacturer}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* MODEL */}
//         <FormField
//           control={form.control}
//           name="vehicleModel"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Model</FormLabel>
//               <FormControl>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <SelectTrigger className="w-[14rem]">
//                     <SelectValue placeholder="Model" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {Object.values(VehicleModel).map((model) => (
//                       <SelectItem key={model} value={model}>
//                         {model}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* FUEL TYPE */}
//         <FormField
//           control={form.control}
//           name="vehicleFuelType"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Gorivo</FormLabel>
//               <FormControl>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <SelectTrigger className="w-[14rem]">
//                     <SelectValue placeholder="Gorivo" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {Object.values(FuelType).map((fuelType) => (
//                       <SelectItem key={fuelType} value={fuelType}>
//                         {fuelType}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* VEHICLE OWNER, CUSTOMER */}
//         <FormField
//           control={form.control}
//           name="customerId"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Vlasnik</FormLabel>
//               <FormControl>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <SelectTrigger className="w-[14rem]">
//                     <SelectValue placeholder="Vlasnik" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {customers.map((customer, i) => (
//                       <SelectItem key={i} value={customer.customerId!}>
//                         {`${customer.customerFirstName} ${customer.customerLastName}`}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* VEHICLE DATE MANUFACTURED */}
//         <FormField
//           control={form.control}
//           name="vehicleDateManufactured"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Godiste</FormLabel>
//               <FormControl>
//                 <Input placeholder="Godiste" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* VEHICLE DISPLACEMENT */}
//         <FormField
//           control={form.control}
//           name="vehicleDisplacement"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Zapremina</FormLabel>
//               <FormControl>
//                 <Input placeholder="Zapremina" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* VEHICLE MILAGE */}
//         <FormField
//           control={form.control}
//           name="vehicleMilage"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Kilometraza</FormLabel>
//               <FormControl>
//                 <Input placeholder="Kilometraza" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* VEHICLE ID */}
//         <FormField
//           control={form.control}
//           name="vehicleIdNumber"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Broj sasije</FormLabel>
//               <FormControl>
//                 <Input placeholder="Broj sasije" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* VEHICLE PLATE NUMBER */}
//         <FormField
//           control={form.control}
//           name="vehiclePlateNumber"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Tablice</FormLabel>
//               <FormControl>
//                 <Input placeholder="Tablice" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* VEHICLE DESC */}
//         <FormField
//           control={form.control}
//           name="vehicleDesc"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Opis</FormLabel>
//               <FormControl>
//                 <Input placeholder="Opis" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button disabled={!isLocadingCustomers} type="submit">
//           Dodaj
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default VehicleAddForm;
