"use client";
import {DocumentData, QueryDocumentSnapshot} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {Customer, CUSTOMER_TYPE} from "@/Entities/Customer.model";
import {getFirstBatch, paginatedCustomers, searchCustomer} from "@/firebase/firestore/customer-collection";
import CustomerCard from "@/components/customer-card/customer-card.component";
import "./customersPage.css";
import CustomerAddFormComponent from "@/components/customer-add-form/customer-add-form.component";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

export default function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [last, setLast] =
        useState<QueryDocumentSnapshot<DocumentData, DocumentData> | undefined>(undefined);
    const [customerType, setCustomerType] = useState<CUSTOMER_TYPE>(
        CUSTOMER_TYPE.AllCustomerTypes
    );
    const [limit, setLimit] = useState<number>(5);
    const [customerName, setCustomerName] = useState<string>("")
    const [customerPhone, setCustomerPhone] = useState<string>("")

    const c: Customer[] = [];

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                return await getFirstBatch(limit);
            } catch (err) {
                console.log(err)
                return {customers: [], last: undefined}
            }
        };

        fetchCustomers().then(res => {
            res.customers.length > 0 ? setCustomers(res.customers) : setCustomers([]);
            res.last && setLast(res.last);
        });
    }, [customerType, limit]);

    const paginationHandler = () => {
        const fetchCustomers = async () => {
            return await paginatedCustomers(limit, last, customerType);
        };

        fetchCustomers().then(res => {
            res.customers.length > 0 && c.push(...customers, ...res.customers);
            res.customers.length > 0 && setCustomers(c);
            res.last && setLast(res.last);
        });
    };

    const customerTypeHandler = (e: string) => {
        switch (e) {
            case CUSTOMER_TYPE.StandardCustomer:
                setCustomerType(CUSTOMER_TYPE.StandardCustomer);
                break;
            case CUSTOMER_TYPE.PremiumCustomer:
                setCustomerType(CUSTOMER_TYPE.PremiumCustomer);
                break;
            case CUSTOMER_TYPE.AllCustomerTypes:
                setCustomerType(CUSTOMER_TYPE.AllCustomerTypes);
                break;
            default:
                setCustomerType(CUSTOMER_TYPE.AllCustomerTypes);
                break;
        }
    };

    const searchHandler = (e: any) => {
        e.preventDefault()
        console.log("target => ", e.target.firstname.value);
        console.log("target => ", e.target.phone.value);
        const getCustomers = async () => {
            return await searchCustomer(customerType, e.target.firstname.value, e.target.phone.value);
        };

        getCustomers().then(res => {
            console.log("res => ", res)
            res.customers.length > 0 && c.push(...res.customers);
            res.customers.length > 0 && setCustomers(c);
            res.last && setLast(res.last);
        });
    }

    return (
        <section className="customerSection">
            <Tabs defaultValue="getCustomers" className="flex w-[80%] flex-col">
                <TabsList className="bg-zinc-900/60">
                    <TabsTrigger className="text-slate-200" value="getCustomers">Pregled musterija</TabsTrigger>
                    <TabsTrigger className="text-slate-200" value="addCustomer">Dodaj musteriju</TabsTrigger>
                </TabsList>
                <TabsContent value="addCustomer" className="flex flex-col mt-6 justify-center items-center">
                    <div className="flex max-w-lg bg-zinc-500 p-6 rounded-lg min-w-[50%]">
                        <CustomerAddFormComponent/>
                    </div>
                </TabsContent>
                <TabsContent value="getCustomers" className="flex flex-col mt-6 justify-center items-start">
                    <div className="grid grid-cols-4 w-full gap-2 mb-4">
                        <Select onValueChange={(e) => customerTypeHandler(e)}
                                defaultValue={CUSTOMER_TYPE.AllCustomerTypes}>
                            <SelectTrigger className="min-w-[15rem]">
                                <SelectValue placeholder="Select a verified email to display"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem
                                    value={CUSTOMER_TYPE.AllCustomerTypes}>{CUSTOMER_TYPE.AllCustomerTypes}</SelectItem>
                                <SelectItem
                                    value={CUSTOMER_TYPE.StandardCustomer}>{CUSTOMER_TYPE.StandardCustomer}</SelectItem>
                                <SelectItem
                                    value={CUSTOMER_TYPE.PremiumCustomer}>{CUSTOMER_TYPE.PremiumCustomer}</SelectItem>
                            </SelectContent>
                        </Select>
                        <form className="flex  gap-3" onSubmit={(e) => searchHandler(e)}>

                            <Input className="min-w-[15rem]" type="text" name="firstname" id="name" defaultValue=""
                                   placeholder="Ime"/>
                            <Input className="min-w-[15rem]" type="text" name="phone" id="phone" defaultValue=""
                                   placeholder="broj"/>

                            <Button type="submit">Pretrazi</Button>
                        </form>
                    </div>
                    <div className="grid w-full grid-cols-4 p-2 gap-3">
                        {customers &&
                            customers.map((customer) => {
                                return (
                                    <CustomerCard key={customer.customerId} customer={customer}/>
                                )
                            })}
                        <button type="submit" onClick={() => paginationHandler()}>
                            Load More
                        </button>
                    </div>
                </TabsContent>
            </Tabs>


        </section>
    );
}
