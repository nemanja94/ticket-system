// Firebase Config
import { db } from "@/config/firebase";

// Firebase Types & Functions
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
  type DocumentData,
  type QueryFieldFilterConstraint,
  type QuerySnapshot,
  Timestamp,
} from "firebase/firestore";

// Application Models
import { Ticket } from "@/Entities/Ticket.model";

export type SearchParams = {
  ticketPriority?: string;
  ticketStatus?: string;
  repairmanId?: string;
  repairmanName?: string;
  vehicleIdNumber?: string;
};

/**
 * Searches for tickets based on provided filters
 * @param searchParams Parameters for filtering tickets
 * @returns Promise containing array of matching tickets
 */
export const searchTicket = async (searchParams: SearchParams): Promise<{
  tickets: Ticket[];
}> => {

  try {
    const constraints = Object.entries(searchParams)
      .filter(([_, value]) => value?.trim())
      .map(([key, value]) => where(key, "==", value.trim()));

    const ticketsQuery = query(
      collection(db, "tickets"),
      orderBy("ticketDateCreated", "desc"),
      ...constraints,
    );

    const snapshots = await getDocs(ticketsQuery);

    const tickets = snapshots.docs
      .filter((doc) => doc.exists())
      .map((doc) => {
        const data = doc.data();
        return new Ticket(
          doc.id,
          data.repairmanId,
          data.repairmanName,
          data.customerId,
          data.customerName,
          data.vehicleId,
          data.vehicleManufacturer,
          data.vehicleModel,
          data.vehicleIdNumber,
          data.ticketTitle,
          data.ticketDesc,
          data.ticketNote,
          data.ticketPrice,
          data.ticketPriority,
          data.ticketStatus,
          new Date(data.ticketDateCreated.seconds * 1000).toISOString().split("T")[0],
          data.ticketDateUpdated,
          data.ticketDateDeleted,
        );
      });

    return { tickets };
  } catch (error) {
    console.error("Error searching tickets:", error);
    return { tickets: [] };
  }
};

type AddTicketResult = {
  success: boolean;
  ticketId?: string;
  error?: string;
};

/**
 * Adds a new ticket to the database
 * @param ticket The ticket to add
 * @returns Object containing success status and ticket ID or error message
 */
export const addTicket = async (ticket: Ticket): Promise<AddTicketResult> => {
  if (!ticket) {
    return { success: false, error: 'No ticket provided' };
  }

  console.log("Adding ticket:", ticket);

  try {
    const ticketData = {
      ...ticket,
      ticketDateCreated: Timestamp.now(),
      ticketDateUpdated: null,
      ticketDateDeleted: null,
    };

    const docRef = await addDoc(collection(db, "tickets"), ticketData);

    return {
      success: true,
      ticketId: docRef.id
    };
  } catch (error) {
    console.error("Error adding ticket:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
