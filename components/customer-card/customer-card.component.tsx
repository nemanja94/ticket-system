import { FunctionComponent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "./customerCard.css";
import { Customer, CUSTOMER_TYPE } from "@/Entities/Customer.model";

type Props = {
  customer: Customer;
};

const CustomerCard = ({ customer }: Props) => {
  console.log("CustomerCard", customer);
  return (
    <Card className="overflow-hidden border-none h-full">
      <CardHeader
        className={`${
          customer.customerType === CUSTOMER_TYPE.PremiumCustomer
            ? "bg-amber-300"
            : "bg-slate-300"
        } p-4 space-y-1`}
      >
        <CardTitle className="text-lg font-bold leading-tight">
          {customer.customerFirstName} {customer.customerLastName}
        </CardTitle>
        <CardDescription className="text-zinc-700 font-medium text-sm">
          Datum: {customer.customerDateCreated.toString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-zinc-200 p-4 space-y-3">
        <div className="grid gap-2">
          <div>
            <p className="text-zinc-500 text-sm">Kontakt:</p>
            <a
              href={`tel:${customer.customerNumber}`}
              className="font-bold text-lg"
            >
              {customer.customerNumber}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
