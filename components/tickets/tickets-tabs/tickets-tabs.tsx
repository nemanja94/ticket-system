import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import TicketAddForm from "./ticket-add-form";
import TicketSearchForm from "./ticket-search-form";

const enum TAB_TYPE {
  FIND_TICKET = "findTicket",
  ADD_TICKET = "addTicket",
}

export default function TicketsTabs() {
  return (
    <Tabs defaultValue={TAB_TYPE.FIND_TICKET} className="flex w-[95%] flex-col">
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

      <TabsContent
        value="findTicket"
        className="flex flex-col mt-6 justify-center items-center"
      >
        <TicketSearchForm />
      </TabsContent>
      <TabsContent
        value="addTicket"
        className="flex flex-col justify-center items-center"
      >
        <TicketAddForm />
      </TabsContent>
    </Tabs>
  );
}
