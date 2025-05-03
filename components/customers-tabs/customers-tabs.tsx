import CustomerAddForm from "./customer-add-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CustomerSearchForm from "./customer-search-form";

const enum TAB_TYPE {
  FIND_CUSTOMER = "findCustomer",
  ADD_CUSTOMER = "addCustomer",
}

export default function CustomersTabs() {
  return (
    <Tabs
      defaultValue={TAB_TYPE.FIND_CUSTOMER}
      className="flex w-[95%] flex-col"
    >
      {/* Tabs */}
      <TabsList className="bg-zinc-900/60">
        <TabsTrigger
          className="text-slate-200 w-full"
          value={TAB_TYPE.FIND_CUSTOMER}
        >
          Pronadji musteriju
        </TabsTrigger>
        <TabsTrigger
          className="text-slate-200 w-full"
          value={TAB_TYPE.ADD_CUSTOMER}
        >
          Dodaj musteriju
        </TabsTrigger>
      </TabsList>

      {/* Tabs content */}
      <TabsContent
        value="findCustomer"
        className="flex flex-col mt-6 justify-center items-center"
      >
        <CustomerSearchForm />
      </TabsContent>
      <TabsContent
        value="addCustomer"
        className="flex flex-col mt-6 justify-center items-center"
      >
        <div className="flex max-w-lg bg-zinc-500 p-6 rounded-lg min-w-[50%]">
          <CustomerAddForm />
        </div>
      </TabsContent>
    </Tabs>
  );
}
