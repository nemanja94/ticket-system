import { db } from "@/config/firebase";
import { Ticket } from "@/Entities/Ticket.model";
import { Vehicle } from "@/Entities/Vehicle.model";
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  QueryFieldFilterConstraint,
  QuerySnapshot,
  Timestamp,
  where,
} from "firebase/firestore";

export const searchTicket = async (
  _ticketPriority?: string,
  _ticketStatus?: string,
  _repairmanId?: string,
  _repairmanName?: string
): Promise<{
  tickets: Ticket[];
}> => {
  let constraints: QueryFieldFilterConstraint[] = [];

  if (_ticketPriority && _ticketPriority !== "")
    constraints.push(where("ticketPriority", "==", _ticketPriority));

  if (_ticketStatus && _ticketStatus !== "")
    constraints.push(where("ticketStatus", "==", _ticketStatus));

  if (_repairmanId && _repairmanId !== "")
    constraints.push(where("repairmanId", "==", _repairmanId));

  if (_repairmanName && _repairmanName !== "")
    constraints.push(where("repairmanName", "==", _repairmanName));

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

      data.ticketDateCreated = new Date(data.ticketDateCreated.seconds * 1000)
        .toISOString()
        .split("T")[0];

      ticketsColl.push(
        new Ticket(
          doc.id,
          data.repairmanId,
          data.repairmanName,
          data.vehicleId,
          data.ticketTitle,
          data.ticketDesc,
          data.ticektPrice,
          data.ticketPriority,
          data.ticketStatus,
          data.ticketDateCreated,
          data.ticketDateUpdated ? data.ticketDateUpdated.seconds : undefined,
          data.ticketDateDeleted ? data.ticketDateDeleted.seconds : undefined,
          data.customerId,
          data.customerFirstName,
          data.customerLastName,
          data.ticketDateUpdated, // Add the full ticketDateUpdated object or value
          data.ticketDateDeleted  // Add the full ticketDateDeleted object or value
        )
      );
    }
  });

  return { tickets: ticketsColl };
};

export const addTicket = async (ticket: Ticket): Promise<string | boolean> => {
  try {
    const docRef = await addDoc(collection(db, "tickets"), {
      ...ticket,
      ticketDateCreated: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding ticket: ", error);
    return false;
  }
};
