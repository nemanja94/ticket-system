import { CUSTOMER_TYPE } from "@/Entities/Customer.model";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type CusotmerTypeSelectProps = {
  customerTypeHandler: (e: string) => void;
};

export default function CustomerTypeSelect({
  customerTypeHandler,
}: CusotmerTypeSelectProps) {
  return (
    <div className="flex flex-col w-[10rem] self-start my-4">
      <Select
        onValueChange={(e) => customerTypeHandler(e)}
        defaultValue={CUSTOMER_TYPE.AllCustomerTypes}
      >
        <SelectTrigger>
          <SelectValue placeholder="Tip musterije" />
        </SelectTrigger>
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
    </div>
  );
}
