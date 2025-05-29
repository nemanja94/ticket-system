import { db } from "@/config/firebase";
import { Ticket } from "@/Entities/Ticket.model";
import { Vehicle } from "@/Entities/Vehicle.model";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  QueryFieldFilterConstraint,
  QuerySnapshot,
  where,
} from "firebase/firestore";

export const searchTicket = async (
  _vehicleId?: string
): Promise<{
  tickets: Ticket[];
}> => {
  let constraints: QueryFieldFilterConstraint[] = [];

  if (_vehicleId && _vehicleId !== "")
    constraints.push(where("vehicleId", "==", _vehicleId));

  let firstBatch = query(
    collection(db, "tickets"),
    orderBy("ticketDateCreated", "desc"),
    ...constraints
  );

  const documentSnapshots: QuerySnapshot<DocumentData, DocumentData> =
    await getDocs(firstBatch);

  const ticketsColl: Ticket[] = [];
  let data: DocumentData;

  documentSnapshots.forEach((doc) => {
    if (doc.exists()) {
      data = doc.data();

      data.customerDateCreated = new Date(
        data.customerDateCreated.seconds * 1000
      )
        .toISOString()
        .split("T")[0];

      ticketsColl.push(
        new Ticket(
            doc.id,
            data.repairmanId,
            data.repairmanFirstName,
            data.repairmanLastName,
            data.vehicleId,
            data.ticketDesc,
            data.ticektPrice,
            data.ticketPriority,
            new Date(data.ticketDateCreated.seconds * 1000).toISOString(),
            data.ticketDateUpdated ? new Date(data.ticketDateUpdated.seconds * 1000).toISOString() : undefined,
            data.ticketDateDeleted ? new Date(data.ticketDateDeleted.seconds * 1000).toISOString() : undefined
        )
      );
    }
  });

  return { tickets: ticketsColl };
};
