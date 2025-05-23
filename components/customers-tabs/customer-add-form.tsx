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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Customer, CUSTOMER_TYPE } from "@/Entities/Customer.model";
import { addCustomer } from "@/firebase/firestore/customer-collection";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { z } from "zod";

const TYPES: readonly [
  CUSTOMER_TYPE.PremiumCustomer,
  CUSTOMER_TYPE.StandardCustomer,
] = [CUSTOMER_TYPE.PremiumCustomer, CUSTOMER_TYPE.StandardCustomer] as const;

const formSchema = z.object({
  customerType: z.enum(TYPES),
  customerFirstName: z.string(),
  customerLastName: z.string(),
  customerNumber: z.string(),
  customerDateCreated: z.date(),
});

const CustomerAddForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerType: CUSTOMER_TYPE.StandardCustomer,
      customerFirstName: "",
      customerLastName: "",
      customerNumber: "",
      customerDateCreated: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.customerType)
      form.setError("customerNumber", {
        type: "custom",
        message: "Customer number already in use",
      });
    if (!values.customerFirstName)
      form.setError("customerFirstName", {
        type: "custom",
        message: "Customer first name is required",
      });
    if (!values.customerLastName)
      form.setError("customerLastName", {
        type: "custom",
        message: "Customer last name is required",
      });
    if (!values.customerNumber)
      form.setError("customerNumber", {
        type: "custom",
        message: "Customer number is required",
      });

    const customer: Customer = new Customer(
      values.customerType,
      values.customerFirstName,
      values.customerLastName,
      values.customerNumber,
      Timestamp.fromDate(values.customerDateCreated),
    );
    const res = await addCustomer(customer);

    if (typeof res == "string") {
      form.reset();
    } else if (res === false) {
      form.setError("customerNumber", {
        type: "custom",
        message: "Customer number already in use",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl mx-auto p-4"
      >
        {/* Customer Type - Full width on all screens */}
        <div className="col-span-full">
          <FormField
            control={form.control}
            name="customerType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tip mušterije</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Izaberite tip mušterije" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={CUSTOMER_TYPE.StandardCustomer}>
                        {CUSTOMER_TYPE.StandardCustomer}
                      </SelectItem>
                      <SelectItem value={CUSTOMER_TYPE.PremiumCustomer}>
                        {CUSTOMER_TYPE.PremiumCustomer}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* First Name */}
        <FormField
          control={form.control}
          name="customerFirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ime</FormLabel>
              <FormControl>
                <Input placeholder="Unesite ime" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={form.control}
          name="customerLastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prezime</FormLabel>
              <FormControl>
                <Input placeholder="Unesite prezime" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number - Full width on all screens */}
        <div className="col-span-full">
          <FormField
            control={form.control}
            name="customerNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Broj telefona</FormLabel>
                <FormControl>
                  <Input placeholder="+381 6x xxx xxxx" {...field} />
                </FormControl>
                <FormDescription className="text-sm text-muted-foreground">
                  Broj telefona u formatu: +381 6x xxx xxxx
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button - Full width on mobile, auto width on larger screens */}
        <div className="col-span-full flex justify-end mt-6">
          <Button type="submit" className="w-full sm:w-auto">
            Dodaj mušteriju
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CustomerAddForm;
