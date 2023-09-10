import {Timestamp} from "firebase/firestore";
import {Repairman} from "./Reapirman.model";
import {Vehicle} from "./Vehicle.model";

export enum TicketPriority {
    VisokPrioritet = "Visok prioritet",
    SrednjiPrioritet = "Srednji prioritet",
    NizakPrioritet = "Nizak prioritet",
}

export class Ticket {
    constructor(
        ticketId: number,
        repairmanId: Repairman["repairmanId"],
        repairmanFirstName: Repairman["repairmanFirstName"],
        repairmanLastName: Repairman["repairmanLastName"],
        vehicleId: Vehicle["vehicleId"],
        ticketDesc: string,
        ticektPrice: number,
        ticketPriority: TicketPriority,
        ticketDateCreated: Timestamp | string,
        ticketDateUpdated?: Timestamp,
        ticketDateDeleted?: Timestamp
    ) {
        this.ticketId = ticketId;
        this.repairmanId = repairmanId;
        this.repairmanFirstName = repairmanFirstName;
        this.repairmanLastName = repairmanLastName;
        this.vehicleId = vehicleId;
        this.ticketDesc = ticketDesc;
        this.ticektPrice = ticektPrice;
        this.ticketPriority = ticketPriority;
        this.ticketDateCreated = ticketDateCreated;
        this.ticketDateUpdated = ticketDateUpdated;
        this.ticketDateDeleted = ticketDateDeleted;
    }

    ticketId: number;
    repairmanId: Repairman["repairmanId"];
    repairmanFirstName: Repairman["repairmanFirstName"];
    repairmanLastName: Repairman["repairmanLastName"];
    vehicleId: Vehicle["vehicleId"];
    ticketDesc: string;
    ticektPrice: number;
    ticketPriority: TicketPriority;
    ticketDateCreated: Timestamp | string;
    ticketDateUpdated?: Timestamp;
    ticketDateDeleted?: Timestamp;
}
