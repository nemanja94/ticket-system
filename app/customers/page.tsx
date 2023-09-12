"use client";
import {DocumentData, QueryDocumentSnapshot} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {Customer, CUSTOMER_TYPE} from "@/Entities/Customer.model";
import {getFirstBatch, paginatedCustomers} from "@/firebase/firestore/customer-collection";
import CustomerCard from "@/components/customer-card/customer-card.component";
import "./customersPage.css";
import CustomerAddForm from "@/components/customer-add-form/customer-add-form";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Button} from "@/components/ui/button";
import CustomerSearchForm from "@/components/customer-serach-form/customer-search-form";

const enum TAB_TYPE {
    GET_CUSTOMERS = "getCustomers",
    FIND_CUSTOMER = "findCustomer",
    ADD_CUSTOMER = "addCustomer"
}

export default function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [last, setLast] =
        useState<QueryDocumentSnapshot<DocumentData, DocumentData> | undefined>(undefined);
    const [customerType, setCustomerType] = useState<CUSTOMER_TYPE>(
        CUSTOMER_TYPE.AllCustomerTypes
    );
    const [limit, setLimit] = useState<number>(5);
    const [customerFirstName, setCustomerFirstName] = useState<string>("")
    const [customerPhoneNumber, EsetCustomerPhoneNumber] = useState<string>("")

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
    }, [limit]);

    const paginationHandler = () => {
        const fetchCustomers = async () => {
            return await paginatedCustomers(limit, last);
        };

        fetchCustomers().then(res => {
            res.customers.length > 0 && c.push(...customers, ...res.customers);
            res.customers.length > 0 && setCustomers(c);
            res.last && setLast(res.last);
        });
    };

    // const customerTypeHandler = (e: any) => {
    //     setCustomerType(e === CUSTOMER_TYPE.AllCustomerTypes ? CUSTOMER_TYPE.AllCustomerTypes
    //         : e === CUSTOMER_TYPE.StandardCustomer ? CUSTOMER_TYPE.StandardCustomer
    //             : CUSTOMER_TYPE.PremiumCustomer);
    // }

    return (
        <section className="customerSection">
            <Tabs defaultValue={TAB_TYPE.GET_CUSTOMERS} className="flex w-[80%] flex-col">
                <TabsList className="bg-zinc-900/60">
                    <TabsTrigger
                        onClick={() => setLast(undefined)}
                        className="text-slate-200 w-full"
                        value={TAB_TYPE.GET_CUSTOMERS}>Pregled musterija</TabsTrigger>
                    <TabsTrigger
                        className="text-slate-200 w-full"
                        value={TAB_TYPE.FIND_CUSTOMER}>Pronadji musteriju</TabsTrigger>
                    <TabsTrigger
                        className="text-slate-200 w-full"
                        value={TAB_TYPE.ADD_CUSTOMER}>Dodaj musteriju</TabsTrigger>
                </TabsList>
                <TabsContent value="getCustomers" className="flex flex-col mt-6 justify-center items-start">
                    <div className="grid w-full grid-cols-4 p-2 gap-3">
                        {/*<Select onValueChange={(e) => customerTypeHandler(e)}*/}
                        {/*        defaultValue={CUSTOMER_TYPE.AllCustomerTypes}>*/}
                        {/*    <SelectTrigger>*/}
                        {/*        <SelectValue placeholder="Tip musterije"/>*/}
                        {/*    </SelectTrigger>*/}
                        {/*    <SelectContent>*/}
                        {/*        <SelectItem*/}
                        {/*            value={CUSTOMER_TYPE.AllCustomerTypes}>{CUSTOMER_TYPE.AllCustomerTypes}</SelectItem>*/}
                        {/*        <SelectItem*/}
                        {/*            value={CUSTOMER_TYPE.StandardCustomer}>{CUSTOMER_TYPE.StandardCustomer}</SelectItem>*/}
                        {/*        <SelectItem*/}
                        {/*            value={CUSTOMER_TYPE.PremiumCustomer}>{CUSTOMER_TYPE.PremiumCustomer}</SelectItem>*/}
                        {/*    </SelectContent>*/}
                        {/*</Select>*/}
                        {customers &&
                            customers.map((customer) => {
                                return (
                                    <CustomerCard key={customer.customerId} customer={customer}/>
                                )
                            })}
                    </div>
                    <Button className="self-center" type="submit" onClick={() => paginationHandler()}>
                        Load More
                    </Button>
                </TabsContent>
                <TabsContent value="findCustomer" className="flex flex-col mt-6 justify-center items-center">
                    <div className="flex flex-col">
                        <CustomerSearchForm customerType={customerType} customerFirstName={customerFirstName}
                                            customerPhoneNumber={customerPhoneNumber} setCustomers={setCustomers}/>
                        <div className="grid w-full grid-cols-4 p-2 gap-3">
                            {customers &&
                                customers.map((customer) => {
                                    return (
                                        <CustomerCard key={customer.customerId} customer={customer}/>
                                    )
                                })}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="addCustomer" className="flex flex-col mt-6 justify-center items-center">
                    <div className="flex max-w-lg bg-zinc-500 p-6 rounded-lg min-w-[50%]">
                        <CustomerAddForm/>
                    </div>
                </TabsContent>
            </Tabs>


        </section>
    );
}
