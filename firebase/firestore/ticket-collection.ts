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
  _ticketPriority?: string
): Promise<{
  tickets: Ticket[];
}> => {
  let constraints: QueryFieldFilterConstraint[] = [];

  if (_ticketPriority && _ticketPriority !== "")
    constraints.push(where("ticketPriority", "==", _ticketPriority));

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
          data.repairmanFirstName,
          data.repairmanLastName,
          data.vehicleId,
          data.ticketTitle,
          data.ticketDesc,
          data.ticektPrice,
          data.ticketPriority,
          data.ticketStatus,
          data.ticketDateCreated,
          data.ticketDateUpdated ? data.ticketDateUpdated.seconds : undefined,
          data.ticketDateDeleted ? data.ticketDateDeleted.seconds : undefined
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
