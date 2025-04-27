import {FunctionComponent} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"

import "./customerCard.css";
import Link from "next/link";
import { Customer, CUSTOMER_TYPE } from "@/Entities/Customer.model";

type Props = {
    customer: Customer;
    link?: boolean;
};

const CustomerCard: FunctionComponent<Props> = ({customer, link = true}: Props) => {
    return link ? (
        <Link href={`/customers/${customer.customerId}`}>
            <Card className="overflow-hidden border-none w-full">
                <CardHeader
                    className={`${customer.customerType === CUSTOMER_TYPE.PremiumCustomer ? "bg-amber-300" : "bg-slate-300"} overflow-hidden`}>
                    <CardTitle>{customer.customerFirstName} <br/> {customer.customerLastName}</CardTitle>
                    <CardDescription
                        // @ts-ignore
                        className="text-zinc-700 font-semibold">{customer.customerDateCreated} </CardDescription>
                </CardHeader>
                <CardContent className="bg-zinc-200">
                    <p className="pt-2 text-lg font-semibold">{customer.customerType}</p>
                    <p className="pt-2 text-xl font-semibold">{customer.customerNumber}</p>
                </CardContent>
                {/*<CardFooter className="bg-zinc-300 flex justify-center items-center">*/}
                {/*    <p>-{Math.floor(Math.random() * 1000)}</p>*/}
                {/*</CardFooter>*/}
            </Card>
        </Link>
    ) : (
        <div>
        <Card className="overflow-hidden border-none w-full">
            <CardHeader
                className={`${customer.customerType === CUSTOMER_TYPE.PremiumCustomer ? "bg-amber-300" : "bg-slate-300"} overflow-hidden`}>
                <CardTitle>{customer.customerFirstName} <br/> {customer.customerLastName}</CardTitle>
                <CardDescription
                    // @ts-ignore
                    className="text-zinc-700 font-semibold">{customer.customerDateCreated} </CardDescription>
            </CardHeader>
            <CardContent className="bg-zinc-200">
                <p className="pt-2 text-lg font-semibold">{customer.customerType}</p>
                <p className="pt-2 text-xl font-semibold">{customer.customerNumber}</p>
            </CardContent>
            {/*<CardFooter className="bg-zinc-300 flex justify-center items-center">*/}
            {/*    <p>-{Math.floor(Math.random() * 1000)}</p>*/}
            {/*</CardFooter>*/}
        </Card>
        </div>
    )
}

export default CustomerCard;
