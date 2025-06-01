import { Timestamp } from "firebase/firestore";
import { Repairman } from "./Reapirman.model";
import { Vehicle } from "./Vehicle.model";

export enum TicketPriority {
  VisokPrioritet = "Visok prioritet",
  SrednjiPrioritet = "Srednji prioritet",
  NizakPrioritet = "Nizak prioritet",
}

export enum TicketStatus {
  Otvoren = "Otvoren",
  UProcesu = "U procesu",
  Zatvoren = "Zatvoren",
}

export const TICKET_PRIORITY_TYPES: readonly [
  TicketPriority.NizakPrioritet,
  TicketPriority.SrednjiPrioritet,
  TicketPriority.VisokPrioritet,
] = [
  TicketPriority.NizakPrioritet,
  TicketPriority.SrednjiPrioritet,
  TicketPriority.VisokPrioritet,
] as const;

export const TICKET_STATUS_TYPES: readonly [
  TicketStatus.Otvoren,
  TicketStatus.UProcesu,
  TicketStatus.Zatvoren,
] = [
  TicketStatus.Otvoren,
  TicketStatus.UProcesu,
  TicketStatus.Zatvoren,
] as const;

export class Ticket {
  constructor(
    ticketId: string,
    repairmanId: Repairman["repairmanId"],
    repairmanFirstName: Repairman["repairmanFirstName"],
    repairmanLastName: Repairman["repairmanLastName"],
    vehicleId: Vehicle["vehicleId"],
    ticketTitle: string,
    ticketDesc: string,
    ticektPrice: number,
    ticketPriority: TicketPriority,
    ticketStatus: TicketStatus,
    ticketDateCreated: Timestamp | string,
    ticketDateUpdated?: Timestamp | string,
    ticketDateDeleted?: Timestamp | string
  ) {
    this.ticketId = ticketId;
    this.repairmanId = repairmanId;
    this.repairmanFirstName = repairmanFirstName;
    this.repairmanLastName = repairmanLastName;
    this.vehicleId = vehicleId;
    this.ticketTitle = ticketTitle;
    this.ticketDesc = ticketDesc;
    this.ticektPrice = ticektPrice;
    this.ticketPriority = ticketPriority;
    this.ticketStatus = ticketStatus;
    this.ticketDateCreated = ticketDateCreated;
    this.ticketDateUpdated = ticketDateUpdated;
    this.ticketDateDeleted = ticketDateDeleted;
  }

  ticketId: string;
  repairmanId: Repairman["repairmanId"];
  repairmanFirstName: Repairman["repairmanFirstName"];
  repairmanLastName: Repairman["repairmanLastName"];
  vehicleId: Vehicle["vehicleId"];
  ticketTitle: string;
  ticketDesc: string;
  ticektPrice: number;
  ticketPriority: TicketPriority;
  ticketStatus: TicketStatus;
  ticketDateCreated: Timestamp | string;
  ticketDateUpdated?: Timestamp | string;
  ticketDateDeleted?: Timestamp | string;
}
