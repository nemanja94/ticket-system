"use client";
import { CUSTOMER_TYPE, Customer } from "@/Entities/Customer.model";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchCustomer } from "@/firebase/firestore/customer-collection";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CustomerCard from "../customer-card/customer-card.component";

const TYPES: readonly [
  CUSTOMER_TYPE.PremiumCustomer,
  CUSTOMER_TYPE.StandardCustomer,
  CUSTOMER_TYPE.AllCustomerTypes,
] = [
  CUSTOMER_TYPE.PremiumCustomer,
  CUSTOMER_TYPE.StandardCustomer,
  CUSTOMER_TYPE.AllCustomerTypes,
] as const;

const formSchema = z.object({
  customerType: z.enum(TYPES),
  customerFirstName: z.string(),
  customerPhoneNumber: z.string(),
});

const CustomerSearchForm = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerType: CUSTOMER_TYPE.AllCustomerTypes,
      customerFirstName: "",
      customerPhoneNumber: "",
    },
  });

  useEffect(() => {
    setCustomers([]);
  }, [setCustomers]);
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const fetchCustomers = async () => {
      try {
        return await searchCustomer(
          values.customerPhoneNumber,
          values.customerType,
          values.customerFirstName,
        );
      } catch (err) {
        console.log(err);
        return { customers: [] };
      }
    };

    fetchCustomers().then((res) => {
      res.customers.length > 0 ? setCustomers(res.customers) : setCustomers([]);
    });
  };
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 rounded-lg bg-zinc-500"
        >
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
                    <SelectTrigger>
                      <SelectValue placeholder="Tip mušterije" />
                    </SelectTrigger>
                    <SelectContent>
                      {TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
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
                <FormLabel>Ime</FormLabel>
                <FormControl>
                  <Input placeholder="Pretraži po imenu..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Broj telefona</FormLabel>
                <FormControl>
                  <Input placeholder="Pretraži po broju..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-full flex justify-end">
            <Button
              type="submit"
              className="w-full sm:w-auto min-w-[150px]"
              size="lg"
            >
              Pretraži
            </Button>
          </div>
        </form>
      </Form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {customers.map((customer) => (
          <CustomerCard key={customer.customerId} customer={customer} />
        ))}
      </div>
    </div>
  );
};

export default CustomerSearchForm;
