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
    repairmanId: string,
    repairmanName: string,
    customerId: string,
    customerName: string,
    vehicleId: string,
    vehicleManufacturer: string,
    vehicleModel: string,
    vehicleIdNumber: string,
    ticketTitle: string,
    ticketDesc: string,
    ticketNote: string,
    ticketPrice: string,
    ticketPriority: TicketPriority,
    ticketStatus: TicketStatus,
    ticketDateCreated: Timestamp | string,
    ticketDateUpdated?: Timestamp | string,
    ticketDateDeleted?: Timestamp | string,
  ) {
    this.ticketId = ticketId;
    this.repairmanId = repairmanId;
    this.repairmanName = repairmanName;
    this.customerId = customerId;
    this.customerName = customerName;
    this.vehicleId = vehicleId;
    this.vehicleManufacturer = vehicleManufacturer;
    this.vehicleModel = vehicleModel;
    this.vehicleIdNumber = vehicleIdNumber;
    this.ticketTitle = ticketTitle;
    this.ticketDesc = ticketDesc;
    this.ticketNote = ticketNote;
    this.ticketPrice = ticketPrice;
    this.ticketPriority = ticketPriority;
    this.ticketStatus = ticketStatus;
    this.ticketDateCreated = ticketDateCreated;
    this.ticketDateUpdated = ticketDateUpdated;
    this.ticketDateDeleted = ticketDateDeleted;
  }

  ticketId: string;
  repairmanId: string;
  repairmanName: string;
  customerId: string;
  customerName: string;
  vehicleId: string;
  vehicleManufacturer: string;
  vehicleModel: string;
  vehicleIdNumber: string;
  ticketTitle: string;
  ticketDesc: string;
  ticketNote: string;
  ticketPrice: string;
  ticketPriority: TicketPriority;
  ticketStatus: TicketStatus;
  ticketDateCreated: Timestamp | string;
  ticketDateUpdated?: Timestamp | string;
  ticketDateDeleted?: Timestamp | string;
}
