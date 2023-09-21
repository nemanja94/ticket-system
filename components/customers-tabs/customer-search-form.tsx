"use client";
import { CUSTOMER_TYPE, Customer } from "@/Entities/Customer.model";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
          values.customerType,
          values.customerFirstName,
          values.customerPhoneNumber
        );
      } catch (err) {
        console.log(err);
        return { customers: [], last: undefined };
      }
    };

    fetchCustomers().then((res) => {
      res.customers.length > 0 ? setCustomers(res.customers) : setCustomers([]);
      // res.last && setLast(res.last);
    });
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-4 p-3 rounded justify-center items-center w-[98%] bg-zinc-500 gap-3"
        >
          <FormField
            control={form.control}
            name="customerType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Tip musterije" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={CUSTOMER_TYPE.AllCustomerTypes}>
                        {CUSTOMER_TYPE.AllCustomerTypes}
                      </SelectItem>
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
                <FormMessage />
                <FormControl>
                  <Input placeholder="Ime musterije" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customerPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormControl>
                  <Input placeholder="Broj musterije" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-5 w-[97%] gap-3">
        {customers &&
          customers.map((customer) => {
            return (
              <CustomerCard key={customer.customerId} customer={customer} />
            );
          })}
      </div>
    </>
  );
};

export default CustomerSearchForm;
