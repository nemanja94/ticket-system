import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const enum TAB_TYPE {
  FIND_TICKET = "findTicket",
  ADD_TICKET = "addTicket",
}

export default function TicketsTabs() {
  return (
    <Tabs defaultValue={TAB_TYPE.FIND_TICKET} className="flex w-[95%] flex-col">
      {/* Tabs */}
      <TabsList className="bg-zinc-900/60">
        <TabsTrigger
          className="text-slate-200 w-full"
          value={TAB_TYPE.FIND_TICKET}
        >
          Pronadji tiket
        </TabsTrigger>
        <TabsTrigger
          className="text-slate-200 w-full"
          value={TAB_TYPE.ADD_TICKET}
        >
          Dodaj tiket
        </TabsTrigger>
      </TabsList>

      {/* Tabs content */}
      <TabsContent
        value="findTicket"
        className="flex flex-col mt-6 justify-center items-center"
      >
        {/* <CustomerSearchForm /> */}
      </TabsContent>
      <TabsContent
        value="addTicket"
        className="flex flex-col mt-6 justify-center items-center"
      >
        <div className="flex max-w-lg bg-zinc-500 p-6 rounded-lg min-w-[50%]">
          {/* <CustomerAddForm /> */}
        </div>
      </TabsContent>
    </Tabs>
  );
}
