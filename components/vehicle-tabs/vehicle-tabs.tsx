import VehicleAddForm from "./vehicle-add-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import VehicleSearchForm from "./vehicle-search-form";
import VehiclePaginated from "./vehicle-paginated";

const enum TAB_TYPE {
  GET_VEHICLES = "getVehicles",
  FIND_VEHICLE = "findVehicle",
  ADD_VEHICLES = "addVehicle",
}

export default function VehicleTabs() {
  return (
    <Tabs
      defaultValue={TAB_TYPE.GET_VEHICLES}
      className="flex w-[80%] flex-col"
    >
      <TabsList className="bg-zinc-900/60">
        <TabsTrigger
          className="text-slate-200 w-full"
          value={TAB_TYPE.GET_VEHICLES}
        >
          Pregled vozila
        </TabsTrigger>
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
        value="getVehicles"
        className="flex flex-col justify-center items-start"
      >
        <VehiclePaginated />
      </TabsContent>

      <TabsContent
        value="findVehicle"
        className="flex flex-col mt-6 justify-center items-center"
      >
        <VehicleSearchForm />
      </TabsContent>

      <TabsContent
        value="addVehicle"
        className="flex flex-col mt-6 justify-center items-center"
      >
        <div className="flex max-w-lg bg-zinc-500 p-6 rounded-lg min-w-[50%]">
          <VehicleAddForm />
        </div>
      </TabsContent>
    </Tabs>
  );
}
