import { FunctionComponent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

import "./customerCard.css";
import { Customer, CUSTOMER_TYPE } from "@/Entities/Customer.model";
import { deleteCustomer } from "@/firebase/firestore/customer-collection";

type Props = {
  customer: Customer;
};

const CustomerCard = ({ customer }: Props) => {
  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log("Edit customer:", customer);
  };

  const handleDelete = async () => {
    try {
      // await deleteCustomer(customer.customerId!);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
    console.log("Delete customer:", customer);
  };

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
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="flex gap-2 items-center"
            >
              <Pencil className="h-4 w-4" /> Izmeni
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              className="flex gap-2 items-center"
            >
              <Trash2 className="h-4 w-4" /> Obriši
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
