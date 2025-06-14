import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VehicleAddForm from "./vehicle-add-form";
import VehiclePaginated from "./vehicle-paginated";
import VehicleSearchForm from "./vehicle-search-form";

const enum TAB_TYPE {
  FIND_VEHICLE = "findVehicle",
  ADD_VEHICLES = "addVehicle",
}

export default function VehicleTabs() {
  return (
    <Tabs
      defaultValue={TAB_TYPE.FIND_VEHICLE}
      className="flex w-[95%] flex-col"
    >
      <TabsList className="bg-zinc-900/60">
        <TabsTrigger
          className="text-slate-200 w-full"
          value={TAB_TYPE.FIND_VEHICLE}
        >
          Pronadji vozilo
        </TabsTrigger>
        <TabsTrigger
          className="text-slate-200 w-full"
          value={TAB_TYPE.ADD_VEHICLES}
        >
          Dodaj vozilo
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="findVehicle"
        className="flex flex-col mt-6 justify-center items-center"
      >
        <VehicleSearchForm />
      </TabsContent>

      <TabsContent
        value="addVehicle"
        className="flex flex-col justify-center items-center"
      >
        <VehicleAddForm />
      </TabsContent>
    </Tabs>
  );
}
