"use client";
import { Customer, CUSTOMER_TYPE } from "@/Entities/Customer.model";
import { Timestamp } from "firebase/firestore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { addCustomer } from "@/firebase/firestore/customer-collection";

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
    const customer: Customer = new Customer(
      values.customerType,
      values.customerFirstName,
      values.customerLastName,
      values.customerNumber,
      Timestamp.fromDate(values.customerDateCreated)
    );
    const res = await addCustomer(customer);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-full space-y-8"
      >
        <FormField
          control={form.control}
          name="customerType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tip musterije</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Tip musterije" />
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
        <FormField
          control={form.control}
          name="customerFirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ime musterije</FormLabel>
              <FormControl>
                <Input placeholder="Ime musterije" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerLastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prezime musterije</FormLabel>
              <FormControl>
                <Input placeholder="Prezime musterije" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Broj musterije</FormLabel>
              <FormControl>
                <Input placeholder="Broj musterije" {...field} />
              </FormControl>
              <FormDescription className="text-zinc-50">
                Broj pocinje sa +38169...
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CustomerAddForm;
