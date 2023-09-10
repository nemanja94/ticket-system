import {FunctionComponent} from "react";
import {Customer, CUSTOMER_TYPE} from "@/Entities/Customer.model";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"

import "./customerCard.css";

type Props = {
    customer: Customer;
};

const CustomerCard: FunctionComponent<Props> = ({customer: Customer}) => {
    return (
        <Card className="overflow-hidden border-none">
            <CardHeader
                className={`${Customer.customerType === CUSTOMER_TYPE.PremiumCustomer ? "bg-amber-300" : "bg-slate-300"} overflow-hidden`}>
                <CardTitle>{Customer.customerFirstName} <br/> {Customer.customerLastName}</CardTitle>
                <CardDescription
                    // @ts-ignore
                    className="text-zinc-700 font-semibold">{Customer.customerDateCreated} </CardDescription>
            </CardHeader>
            <CardContent className="bg-zinc-200">
                <p className="pt-2 text-lg font-semibold">{Customer.customerType}</p>
                <p className="pt-2 text-2xl font-semibold">{Customer.customerNumber}</p>
            </CardContent>
            {/*<CardFooter className="bg-zinc-300 flex justify-center items-center">*/}
            {/*    <p>-{Math.floor(Math.random() * 1000)}</p>*/}
            {/*</CardFooter>*/}
        </Card>
    );
};

export default CustomerCard;
