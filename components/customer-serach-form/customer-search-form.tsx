"use client"
import {Customer, CUSTOMER_TYPE} from "@/Entities/Customer.model";
import * as z from "zod"
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Dispatch, SetStateAction, useEffect} from "react";
import {searchCustomer} from "@/firebase/firestore/customer-collection";


interface CustomerSearchFormProps {
    customerType: CUSTOMER_TYPE,
    customerFirstName: string,
    customerPhoneNumber: string
    setCustomers: Dispatch<SetStateAction<Customer[]>>
}

const TYPES: readonly [CUSTOMER_TYPE.PremiumCustomer, CUSTOMER_TYPE.StandardCustomer, CUSTOMER_TYPE.AllCustomerTypes]
    = [CUSTOMER_TYPE.PremiumCustomer, CUSTOMER_TYPE.StandardCustomer, CUSTOMER_TYPE.AllCustomerTypes] as const;


const formSchema = z.object({
    customerType: z.enum(TYPES),
    customerFirstName: z.string().min(3, {message: "First name is too short"},),
    customerPhoneNumber: z.string().min(12, {message: "Phone number is too short"}),
})

const CustomerSearchForm = ({
                                customerType,
                                customerFirstName,
                                customerPhoneNumber,
                                setCustomers
                            }: CustomerSearchFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customerType: customerType,
            customerFirstName: customerFirstName,
            customerPhoneNumber: customerPhoneNumber,
        }
    })

    useEffect(() => {
        setCustomers([])

    }, [setCustomers]);
    const onSubmit = (values: z.infer<typeof formSchema>) => {

        const fetchCustomers = async () => {
            try {
                return await searchCustomer(values.customerType, values.customerFirstName, values.customerPhoneNumber);
            } catch (err) {
                console.log(err)
                return {customers: [], last: undefined}
            }
        };

        fetchCustomers().then(res => {
            res.customers.length > 0 ? setCustomers(res.customers) : setCustomers([]);
            // res.last && setLast(res.last);
        });
    }
    return (
        <div className="flex w-full items-center justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="grid grid-cols-4 p-3 justify-center items-center bg-zinc-500 gap-3">
                    <FormField
                        control={form.control}
                        name="customerType"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Tip musterije"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem
                                                value={CUSTOMER_TYPE.AllCustomerTypes}>{CUSTOMER_TYPE.AllCustomerTypes}</SelectItem>
                                            <SelectItem
                                                value={CUSTOMER_TYPE.StandardCustomer}>{CUSTOMER_TYPE.StandardCustomer}</SelectItem>
                                            <SelectItem
                                                value={CUSTOMER_TYPE.PremiumCustomer}>{CUSTOMER_TYPE.PremiumCustomer}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="customerFirstName"
                        render={({field}) => (
                            <FormItem>
                                <FormMessage/>
                                <FormControl>
                                    <Input placeholder="Ime musterije" {...field} />
                                </FormControl>
                            </FormItem>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="customerPhoneNumber"
                        render={({field}) => (
                            <FormItem>
                                <FormMessage/>
                                <FormControl>
                                    <Input placeholder="Broj musterije" {...field} />
                                </FormControl>
                            </FormItem>

                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default CustomerSearchForm;