import CustomerAddForm from "../customer-add-form/customer-add-form";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CustomersPaginated from "./customers-paginated";

const enum TAB_TYPE {
  GET_CUSTOMERS = "getCustomers",
  FIND_CUSTOMER = "findCustomer",
  ADD_CUSTOMER = "addCustomer",
}

export default function CustomersTabs() {
  return (
    <Tabs
      defaultValue={TAB_TYPE.GET_CUSTOMERS}
      className="flex w-[80%] flex-col"
    >
      <TabsList className="bg-zinc-900/60">
        <TabsTrigger
          className="text-slate-200 w-full"
          value={TAB_TYPE.GET_CUSTOMERS}
        >
          Pregled musterija
        </TabsTrigger>
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
      <TabsContent
        value="getCustomers"
        className="flex flex-col mt-6 justify-center items-start"
      >
        <CustomersPaginated />
      </TabsContent>
      <TabsContent
        value="findCustomer"
        className="flex flex-col mt-6 justify-center items-center"
      >
        <div className="flex flex-col">
          {/* <CustomerSearchForm
            customerType={customerType}
            customerFirstName={customerFirstName}
            customerPhoneNumber={customerPhoneNumber}
            setCustomers={setCustomers}
          />
          <div className="grid w-full grid-cols-4 p-2 gap-3">
            {customers &&
              customers.map((customer) => {
                return (
                  <CustomerCard key={customer.customerId} customer={customer} />
                );
              })}
          </div> */}
        </div>
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
